import React from 'react'
import Router from 'next/router'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import { TextField, MoneyField } from '@onextech/gvs-kit/core'
import { Button, Divider, Grid, Typography, Theme } from '@material-ui/core'
import { CURRENCY_OPTIONS } from './const'

interface CashFormProps {
  record: CashFormValues
  onSuccess?: (values: CashFormValues) => void
}

export interface CashFormValues {
  currency: string
  amount: number
}

const cashFormSchema = yup.object().shape({
  amount: yup
    .number()
    .min(1, 'Amount must be higher than 0')
    .required('Amount is required'),
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
  input: {
    '& > .MuiOutlinedInput-input': {
      fontSize: theme.typography.pxToRem(16),
      minHeight: 22,
    },
  },
  errorText: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 400,
    color: theme.palette.error.main,
    alignSelf: 'flex-start',
  },
  divider: {
    margin: theme.spacing(1, 0, 3),
  },
  submitButton: {
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'uppercase',
    padding: theme.spacing(1, 0),
  },
}))

const CashForm: React.FC<CashFormProps> = (props) => {
  const { record, onSuccess } = props
  const classes = useStyles()

  const { control, handleSubmit, errors, reset } = useForm<CashFormValues>({
    defaultValues: record,
    validationSchema: cashFormSchema,
  })

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
      <Grid container spacing={1}>
        {/* Currency Options */}
        <Grid item xs={12} md={4}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            options={CURRENCY_OPTIONS}
            name="currency"
            label="Currency"
            InputProps={{ className: classes.input }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Controller
            as={MoneyField}
            control={control}
            variant="outlined"
            name="amount"
            label="Amount"
            inputProps={{ prefix: '' }}
          />
        </Grid>
        <ErrorMessage errors={errors} name="amount">
          {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
        </ErrorMessage>
      </Grid>

      <Divider className={classes.divider} />

      <Button className={classes.submitButton} variant="contained" color="primary" type="submit" fullWidth>
        Next
      </Button>
    </form>
  )
}

export default CashForm
