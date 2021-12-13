import React from 'react'
import Router from 'next/router'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { ArrayField, TextField, MoneyField } from '@onextech/gvs-kit/core'
import { Button, Divider, Grid, Typography, Theme } from '@material-ui/core'
import { BENCHMARK_OPTIONS, ASSET_TYPE_OPTIONS } from './const'

interface PortfolioFormProps {
  record: PortfolioFormValues
  onSuccess?: (values: PortfolioFormValues) => void
}

interface Asset {
  type: string
  price?: number
  quantity?: string
}

export interface PortfolioFormValues {
  portfolioBenchmark: string
  assets: Asset[]
}

const PortfolioFormSchema = yup.object().shape({
  portfolioBenchmark: yup.string(),
  assets: yup.array().of(
    yup.object().shape({
      type: yup.string(),
      price: yup.number().required('Price is required'),
      quantity: yup.string().required('Quantity is required'),
    })
  ),
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2.5),
    },
  },
  arrayField: {
    '& li:not(:only-child):not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  input: {
    '& > .MuiOutlinedInput-input': {
      fontSize: theme.typography.pxToRem(16),
      minHeight: 22,
    },
  },
  divider: {
    margin: theme.spacing(1, 0, 3),
  },
  submitButton: {
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'uppercase',
    padding: theme.spacing(1, 0),
  },
  errorText: {
    color: theme.palette.error.main,
  },
}))

const PortfolioForm: React.FC<PortfolioFormProps> = (props) => {
  const { record, onSuccess } = props
  const classes = useStyles()

  const { control, handleSubmit, errors, reset } = useForm<PortfolioFormValues>({
    defaultValues: record,
    validationSchema: PortfolioFormSchema,
  })

  const assetsFieldArray = useFieldArray({ name: 'assets', control })

  const onSubmit = async (values) => {
    // TODO: Form submit functionality
    if (onSuccess) onSuccess(values)
    else {
      Router.push('/')
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      {/* Portfolio Benchmark */}
      <Controller
        as={TextField}
        control={control}
        variant="outlined"
        options={BENCHMARK_OPTIONS}
        name="portfolioBenchmark"
        label="Portfolio Benchmark"
        InputProps={{ className: classes.input }}
      />

      <ArrayField className={classes.arrayField} hideLabel name="assets" fieldArray={assetsFieldArray}>
        {({ index, name }) => {
          return (
            <Grid container spacing={1}>
              <Grid item xs={4} md={6}>
                <Controller
                  as={TextField}
                  control={control}
                  name={`${name}[${index}].type`}
                  type="string"
                  options={ASSET_TYPE_OPTIONS}
                  InputProps={{ className: classes.input }}
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <Controller
                  as={MoneyField}
                  control={control}
                  name={`${name}[${index}].price`}
                  inputProps={{ prefix: '' }}
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <Controller
                  as={TextField}
                  control={control}
                  name={`${name}[${index}].quantity`}
                  type="number"
                  InputProps={{ className: classes.input }}
                />
              </Grid>
            </Grid>
          )
        }}
      </ArrayField>
      {Boolean(errors.assets) && (
        <Typography className={classes.errorText} variant="subtitle1">
          Fill in all fields
        </Typography>
      )}

      <Divider className={classes.divider} />

      <Button className={classes.submitButton} variant="contained" color="primary" type="submit" fullWidth>
        Next
      </Button>
    </form>
  )
}

export default PortfolioForm
