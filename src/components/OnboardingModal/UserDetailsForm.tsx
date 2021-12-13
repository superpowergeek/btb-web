import React from 'react'
import Router from 'next/router'
import * as yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import { Box, Button, Divider, Typography, Theme } from '@material-ui/core'
import { INVESTMENT_EXPERIENCE_OPTIONS, CURRENT_PLATFORM_OPTIONS, REFERRAL_METHOD_OPTIONS } from './const'

interface UserDetailsFormProps {
  record: UserDetailsFormValues
  onSuccess?: (values: UserDetailsFormValues) => void
}

export interface UserDetailsFormValues {
  fullName: string
  investmentExperience: string
  currentPlatform: string
  dateOfBirth: Date
  referralMethod: string
}

const userDetailsFormSchema = yup.object().shape({
  fullName: yup.string().required('This field is required'),
  investmentExperience: yup.string(),
  currentPlatform: yup.string(),
  dateOfBirth: yup.date().max(new Date(), 'Invalid date'),
  referralMethod: yup.string(),
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
    marginTop: theme.spacing(-2),
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

const UserDetailsForm: React.FC<UserDetailsFormProps> = (props) => {
  const { record, onSuccess } = props
  const classes = useStyles()

  const { control, handleSubmit, errors, reset } = useForm<UserDetailsFormValues>({
    defaultValues: record,
    validationSchema: userDetailsFormSchema,
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
      {/* Full Name */}
      <Controller
        as={TextField}
        control={control}
        name="fullName"
        variant="outlined"
        placeholder="Full Name"
        error={Boolean(errors.fullName)}
        InputProps={{ className: classes.input }}
      />
      <ErrorMessage errors={errors} name="fullName">
        {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
      </ErrorMessage>

      {/* TODO: Placeholder? */}
      {/* Investment Experience */}
      <Controller
        as={TextField}
        control={control}
        variant="outlined"
        options={INVESTMENT_EXPERIENCE_OPTIONS}
        name="investmentExperience"
        label="Investment Experience"
        InputProps={{ className: classes.input }}
      />
      <ErrorMessage errors={errors} name="investmentExperience">
        {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
      </ErrorMessage>

      {/* Current Platform */}
      <Controller
        as={TextField}
        control={control}
        variant="outlined"
        options={CURRENT_PLATFORM_OPTIONS}
        name="currentPlatform"
        label="Current Broker/Trading Platform"
        InputProps={{ className: classes.input }}
      />
      <ErrorMessage errors={errors} name="currentPlatform">
        {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
      </ErrorMessage>

      {/* Date of Birth */}
      <Box>
        <Typography variant="caption">Date of Birth</Typography>
        <Controller
          as={
            <DatePicker
              autoOk
              value=""
              onChange={() => null}
              openTo="year"
              views={['year', 'month', 'date']}
              fullWidth
              inputVariant="outlined"
              format="DD/MM/YY"
              InputProps={{ className: classes.input }}
            />
          }
          defaultValue={new Date()}
          control={control}
          name="dateOfBirth"
        />
      </Box>
      <ErrorMessage errors={errors} name="dateOfBirth">
        {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
      </ErrorMessage>

      {/* Referral Method */}
      <Controller
        as={TextField}
        control={control}
        variant="outlined"
        options={REFERRAL_METHOD_OPTIONS}
        name="referralMethod"
        label="How did you hear about BetaBlocks?"
        InputProps={{ className: classes.input }}
      />
      <ErrorMessage errors={errors} name="referralMethod">
        {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
      </ErrorMessage>

      <Divider className={classes.divider} />

      <Button className={classes.submitButton} variant="contained" color="primary" type="submit" fullWidth>
        Next
      </Button>
    </form>
  )
}

export default UserDetailsForm
