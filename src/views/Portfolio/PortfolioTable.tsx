import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Paper,
  Toolbar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@material-ui/core'
import { MoreButton } from '@onextech/gvs-kit/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import { sumBy, sortBy } from 'lodash'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import * as colors from '@material-ui/core/colors'
import { generateExcelDownload } from '@onextech/gvs-kit/utils'
import clsx from 'clsx'
import Loading from '../../components/Loading'
import AssetAddModal from '../Asset/AssetAddModal'
import { PortfolioInterface } from '../../graphql/portfolio/typings'
import { AssetInterface } from '../../graphql/asset/typing'
import printPercentage from '../../utils/printPercentage'
import printCurrency from '../../utils/printCurrency'
import config from '../../config'
import getExcelFormattedPortfolio from './getExcelFormattedPortfolio'

interface PortfolioTableStyles {
  isGrowthNegative?: boolean
}

const useStyles = makeStyles<Theme, PortfolioTableStyles>((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
  },
  tableHead: {
    '& > .MuiTableRow-root > .MuiTableCell-root': {
      borderBottom: 'none',
      padding: theme.spacing(1),
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.hint,
    },
  },
  tableRowWrapper: {
    '& > .MuiTableCell-root': {
      borderBottom: 'none',
      borderTop: `1px solid ${theme.palette.border.main}`,
      padding: theme.spacing(1),
      fontSize: theme.typography.pxToRem(14),
      fontWeight: 500,
      '& > :not(:first-child)': {
        fontWeight: 400,
      },
    },
  },
  lastRowWrapper: {
    '& > .MuiTableCell-root': {
      padding: theme.spacing(2, 1),
    },
  },
  currencyCell: {
    minWidth: 135,
  },
  moreButtonMenu: {
    '& .MuiListItem-root ': {
      maxWidth: 170,
      maxHeight: 41,
      '& > .MuiListItemIcon-root': {
        minWidth: 32,
        '& > .MuiSvgIcon-root': {
          fontSize: theme.typography.pxToRem(24),
        },
      },
      '& > .MuiListItemText-root > .MuiListItemText-primary': {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
  gainLossGrowthLabel: ({ isGrowthNegative }) => ({
    color: isGrowthNegative ? colors.red['A200'] : colors.green['A700'],
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
  }),
  gainLossGrowthWrapper: ({ isGrowthNegative }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: isGrowthNegative ? colors.red['A200'] : colors.green['A700'],
    '& > .MuiSvgIcon-root': {
      fontSize: theme.typography.pxToRem(20),
      marginRight: theme.spacing(0.5),
    },
  }),
}))

const GainLossTrend = ({ gainLossGrowth }) => {
  const classes = useStyles({ isGrowthNegative: gainLossGrowth < 0 })

  return (
    <div className={classes.gainLossGrowthWrapper}>
      {gainLossGrowth > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
      <Typography className={classes.gainLossGrowthLabel}>{printPercentage(gainLossGrowth)}</Typography>
    </div>
  )
}

interface PortfolioTableProps {
  loading: boolean
  portfolio: PortfolioInterface
  assets: AssetInterface[]
}

const PortfolioTable: React.FC<PortfolioTableProps> = (props) => {
  // Put {} since PortfolioTableProps doesn't have any of PortfolioFormValues properties
  const classes = useStyles({})
  const { loading, portfolio, assets } = props
  const { assets: portfolioAssets, baseCurrency } = portfolio || {}

  if (loading) return <Loading />

  const nextAssets = portfolioAssets?.map((portfolioAsset) => {
    const { assetID, netPrice, netQuantity } = portfolioAsset || {}
    const asset = assets?.find(({ id }) => id === assetID)

    // TODO: Confirm with backend whether can assume 'prices' is already sorted, if not might impact performance the longer the prices is
    const prices = sortBy(asset?.prices?.items, ({ createdAt }) => new Date(createdAt))
    const hasNoPrevLastPrice = prices.length < 2

    const lastPrice = prices.length === 0 ? 0 : prices[prices.length - 1].value
    const prevLastPrice = hasNoPrevLastPrice ? 0 : prices[prices.length - 2].value

    const tradedValue = netPrice * netQuantity

    const marketValue = lastPrice * netQuantity
    const prevMarketValue = prevLastPrice * netQuantity

    const gainLoss = marketValue - tradedValue
    const prevGainLoss = prevMarketValue - tradedValue

    const gainLossGrowth = !prevGainLoss ? 0 : ((gainLoss - prevGainLoss) * 100) / prevGainLoss

    return {
      ...portfolioAsset,
      prices,
      lastPrice,
      marketValue,
      tradedValue,
      gainLoss,
      gainLossGrowth,
      hasNoPrevLastPrice,
    }
  })

  const totalMarketValue = sumBy(nextAssets, 'marketValue')
  const totalGainLoss = sumBy(nextAssets, 'gainLoss')

  const nextNextAssets = nextAssets?.map((nextAsset) => {
    const { marketValue } = nextAsset || {}

    const weightage = (marketValue / totalMarketValue) * 100

    return {
      ...nextAsset,
      weightage,
    }
  })

  const handleDownload = () => {
    generateExcelDownload(getExcelFormattedPortfolio(nextNextAssets, baseCurrency), `${config.app.name} Portfolio.xlsx`)
  }

  return (
    <Paper elevation={0}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Typography variant="h5">Portfolio</Typography>
        <Box>
          <AssetAddModal portfolio={portfolio} />
          {/* TODO: Update <MoreButton /> gvs-kit to receive 'MenuProps' */}
          <MoreButton
            items={[{ title: 'Download Excel', icon: <GetAppIcon />, onClick: handleDownload }]}
            MenuProps={{ className: classes.moreButtonMenu }}
          />
        </Box>
      </Toolbar>
      <TableContainer>
        <Table>
          {/* Header */}
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Traded Price</TableCell>
              <TableCell align="right">LastPrice</TableCell>
              <TableCell align="right" className={classes.currencyCell}>
                Market Value
              </TableCell>
              <TableCell align="right" className={classes.currencyCell}>
                Gain/Loss
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {nextNextAssets?.map((asset) => {
              const {
                title,
                ticker,
                sector,
                subSector,
                netPrice,
                netQuantity,
                lastPrice,
                marketValue,
                weightage,
                gainLoss,
                gainLossGrowth,
                hasNoPrevLastPrice,
              } = asset || {}

              return (
                <TableRow className={classes.tableRowWrapper}>
                  <TableCell>
                    <div>{title}</div>
                    <div>{ticker}</div>
                  </TableCell>
                  <TableCell>
                    <div>{sector}</div>
                    <div>{subSector}</div>
                  </TableCell>
                  <TableCell align="right">{netQuantity}</TableCell>
                  <TableCell align="right">
                    <div>{netPrice}</div>
                    <div>{baseCurrency}</div>
                  </TableCell>
                  <TableCell align="right">
                    <div>{lastPrice}</div>
                    <div>{baseCurrency}</div>
                  </TableCell>
                  <TableCell align="right" className={classes.currencyCell}>
                    <div>{printCurrency({ amount: marketValue })}</div>
                    <div>{printPercentage(weightage)}</div>
                  </TableCell>
                  <TableCell align="right" className={classes.currencyCell}>
                    <div>{printCurrency({ amount: gainLoss, hasPlusSign: true })}</div>
                    {hasNoPrevLastPrice ? <div>-</div> : <GainLossTrend gainLossGrowth={gainLossGrowth} />}
                  </TableCell>
                </TableRow>
              )
            })}

            {/* Totals */}
            <TableRow className={clsx(classes.tableRowWrapper, classes.lastRowWrapper)}>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell align="right" className={classes.currencyCell}>
                {printCurrency({ amount: totalMarketValue })}
              </TableCell>
              <TableCell align="right" className={classes.currencyCell}>
                {printCurrency({ amount: totalGainLoss })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PortfolioTable
