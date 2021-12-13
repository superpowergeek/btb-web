import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Typography, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, MoneyField } from '@onextech/gvs-kit/core'
import nanoid from 'nanoid'
import { TradeTypeEnum, UpdatePortfolioInput } from '@onextech/btb-api'
import { omitTypename } from '@onextech/gvs-kit/utils'
import * as colors from '@material-ui/core/colors'
import AssetField from './AssetField'
import { PortfolioInterface } from '../../graphql/portfolio/typings'
import useUpdatePortfolio from '../../graphql/portfolio/mutations/useUpdatePortfolio'

interface AssetFormValues {
  [key: string]: string | number
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5.5, 3.625, 6.25),
  },
  textField: {
    '& > .MuiInputBase-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  listbox: {
    padding: 0,
    '& .MuiAutocomplete-option': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  buyButton: {
    backgroundColor: colors.green['A700'],
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: colors.green['A700'],
      opacity: 0.9,
    },
  },
  sellButton: {
    backgroundColor: colors.red[500],
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: colors.red[500],
      opacity: 0.9,
    },
  },
  fieldsWrapper: {
    marginTop: theme.spacing(5.25),
  },
  buttonWrapper: {
    marginTop: theme.spacing(5),
  },
}))

interface AssetFormProps {
  onSubmit: () => void
  portfolio: PortfolioInterface
}

const getParsedFormValues = (values) => ({
  ...values,
  price: Number(values.price),
  quantity: Number(values.quantity),
  tradedAt: new Date(values.tradedAt).toISOString(),
})

const AssetForm: React.FC<AssetFormProps> = (props) => {
  const classes = useStyles()
  const { onSubmit, portfolio } = props

  // Init form
  const form = useForm<AssetFormValues>()
  const { handleSubmit, control } = form

  // Hooks
  const { handleUpdatePortfolio } = useUpdatePortfolio()

  // Submit form
  const beforeSubmit = (onSubmit) => async (values) => {
    const parsedFormValues = getParsedFormValues(values)
    const { asset, ...rest } = parsedFormValues

    const assetIndex = portfolio?.assets?.findIndex(({ assetID }) => assetID === asset?.id)
    const isNewAsset = !portfolio?.assets || assetIndex < 0

    const currentTime = new Date().toISOString()

    // Create new Trade
    const nextTrade = {
      ...rest,
      id: nanoid(),
      createdAt: currentTime,
      updatedAt: currentTime,

      // For now, is hardcoded for buying only
      type: TradeTypeEnum.BUY,
    }

    if (isNewAsset) {
      const { id: assetID, title, ticker, sector, subSector } = asset

      // Create new asset
      const newAsset = {
        id: nanoid(),
        assetID,
        title,
        ticker,
        sector,
        subSector,
        netPrice: rest.price,
        netQuantity: rest.quantity,
        trades: [nextTrade],
      }

      // Update portfolio.assets
      const nextValues: UpdatePortfolioInput = omitTypename({
        id: portfolio.id,
        assets: (portfolio?.assets || []).concat(newAsset as any), // FIXME: Fix typing
      })

      await handleUpdatePortfolio(nextValues)

      return onSubmit(values)
    }

    // If already exist in the portfolio, find the asset
    const foundAsset = portfolio?.assets?.[assetIndex]
    const { netPrice, netQuantity, trades } = foundAsset || {}

    // Recalculate netQuantity and netPrice
    const tradeQuantity = rest.quantity
    const tradePrice = rest.price
    const newNetQuantity = netQuantity + tradeQuantity
    const newNetPrice = (netPrice * netQuantity + tradePrice * tradeQuantity) / newNetQuantity

    // Copy previous assets
    const nextAssets = [...portfolio?.assets]

    // Update the asset of the found index
    nextAssets[assetIndex] = {
      ...foundAsset,
      netPrice: Number(newNetPrice.toFixed(2)),
      netQuantity: newNetQuantity,
      trades: (trades || []).concat(nextTrade),
    }

    // Update portfolio.assets
    const nextValues: UpdatePortfolioInput = omitTypename({
      id: portfolio.id,
      assets: nextAssets,
    })

    await handleUpdatePortfolio(nextValues)

    return onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(beforeSubmit(onSubmit))} className={classes.root}>
      <Typography variant="h3">Add Trade Entry</Typography>
      <Typography variant="subtitle1">Add a new trade entry for an asset</Typography>
      <Grid container spacing={2} className={classes.fieldsWrapper}>
        <Grid item xs={12}>
          <Controller
            as={AssetField}
            control={control}
            name="asset"
            TextFieldProps={{
              name: 'asset',
              InputLabelProps: { shrink: true },
              className: classes.textField,
            }}
            ListboxProps={{ className: classes.listbox }}
            required
          />
        </Grid>
        <Grid item xs md={7}>
          <Controller as={MoneyField} control={control} name="price" required className={classes.textField} />
        </Grid>
        <Grid item xs md={5}>
          <Controller
            as={TextField}
            control={control}
            name="quantity"
            type="number"
            required
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            name="tradedAt"
            label="Trade Date & Time"
            type="datetime-local"
            required
            className={classes.textField}
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={6} className={classes.buttonWrapper}>
          <Button type="submit" size="large" fullWidth variant="contained" className={classes.sellButton} disabled>
            Sell
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.buttonWrapper}>
          <Button type="submit" size="large" fullWidth variant="contained" className={classes.buyButton}>
            Buy
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AssetForm
