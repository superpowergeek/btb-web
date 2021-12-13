import React from 'react'
import Router from 'next/router'
import { FormContext, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { Box, Grid, Typography, Theme, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@onextech/gvs-kit/core'
import Form from '../index'
import { INVESTMENT_EXPERIENCE_OPTIONS, CURRENT_PLATFORM_OPTIONS, REFERRAL_METHOD_OPTIONS, CURRENCY_OPTIONS, OCCUPATION_TYPE_OPTIONS, BENCHMARK_OPTIONS } from '../../OnboardingModal/const'

interface UserSettingsFormProps extends React.ComponentProps<typeof Form> {
  onFormSubmitted?: (isSubmitted) => void
  onSuccess?: () => void
}

interface UserSettingsFormValues {
  name: string
  email: string
  investmentExperience: string
  currentPlatform: string
  dateOfBirth: Date
  referralMethod: string
  baseCurrency: string
  benchMark: string
  occupation: string
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(3, 0),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
    },
    boxShadow: '0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 0 1px rgba(63, 63, 68, 0.05)',
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
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.success.contrastText,
    alignSelf: 'flex-start',
    display: 'flex'
  },
  contentContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2.5),
    },
  },
  headerContainer: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    display: 'flex',
    flexDirection: 'row',
  },
  twoContainer: {
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        paddingRight: 0,
      },
      '& > :not(:first-child)': {
        marginTop: theme.spacing(3)
      }
    },
    [theme.breakpoints.up('md')]: {
      '& > :first-child': {
        paddingRight: theme.spacing(3),
      },
      '& > :not(:first-child)': {
        marginTop: 0
      }
    }
  },
  emailContainer: {
    margin: theme.spacing(2.875, 0, 0)
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
  },
  desc: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(0.125, 0, 0, 1),
    color: theme.palette.text.secondary
  }
}))

const UserSettingsFormSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('This field is required.'),
  investmentExperience: yup.string(),
  occupation: yup.string(),
  currentPlatform: yup.string(),
  dateOfBirth: yup.date().max(new Date(), 'Invalid date'),
  referralMethod: yup.string(),
  baseCurrency: yup.string(),
  benchMark: yup.string()
})

const UserSettingsForm: React.FC<UserSettingsFormProps> = (props) => {
  const classes = useStyles(props)
  const { onSuccess, onFormSubmitted, ...rest } = props
  const methods = useForm()

  const defaultValues = {
    name: '',
    email: '',
    investmentExperience: INVESTMENT_EXPERIENCE_OPTIONS[0],
    currentPlatform: CURRENT_PLATFORM_OPTIONS[0],
    dateOfBirth: new Date(),
    referralMethod: REFERRAL_METHOD_OPTIONS[0],
    baseCurrency: CURRENCY_OPTIONS[0],
    benchMark: BENCHMARK_OPTIONS[0]
  }

  const { control, handleSubmit, errors, reset } = useForm<UserSettingsFormValues>({
    defaultValues,
    validationSchema: UserSettingsFormSchema,
  })
  
  const onSubmit = async () => {
    // TODO: Form submit functionality
    if (onSuccess) onSuccess()
    else {
      Router.push('/')
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.title}>Profile</Typography>
        <Typography className={classes.desc}>Manage your profile settings</Typography>
      </Box>
      <Box className={classes.contentContainer}>
        <Controller
          as={TextField}
          control={control}
          name="name"
          placeholder="Full Name"
          error={Boolean(errors.name)}
          InputProps={{ className: classes.input }}
          helperText={errors.name ? errors.name.message : null}
        />
        <Grid container className={classes.twoContainer}>
          <Grid item xs={12} md={6} className={classes.emailContainer}>
            <Controller
              as={TextField}
              control={control}
              name="email"
              placeholder="Email"
              error={Boolean(errors.email)}
              InputProps={{ className: classes.input }}
              helperText={errors.email ? errors.email.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
              helperText={errors.dateOfBirth ? errors.dateOfBirth.message : null}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.twoContainer}>
          <Grid item xs={12} md={6}>
            <Controller
              as={TextField}
              control={control}
              options={INVESTMENT_EXPERIENCE_OPTIONS}
              name="investmentExperience"
              label="Investment Experience*"
              InputProps={{ className: classes.input }}
              helperText={errors.investmentExperience ? errors.investmentExperience.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              as={TextField}
              control={control}
              options={OCCUPATION_TYPE_OPTIONS}
              name="occupation"
              label="Occupation*"
              InputProps={{ className: classes.input }}
              helperText={errors.occupation ? errors.occupation.message : null}
            />
          </Grid>
        </Grid>

        <Controller
          as={TextField}
          control={control}
          options={CURRENT_PLATFORM_OPTIONS}
          name="currentPlatform"
          label="Current Broker/Trading Platform"
          InputProps={{ className: classes.input }}
          helperText={errors.currentPlatform ? errors.currentPlatform.message : null}
        />
        
        <Controller
          as={TextField}
          control={control}
          options={REFERRAL_METHOD_OPTIONS}
          name="referralMethod"
          label="How did you hear about BetaBlocks?"
          InputProps={{ className: classes.input }}
          helperText={errors.referralMethod ? errors.referralMethod.message : null}
        />
      </Box>
      <Box className={classes.headerContainer}>
        <Typography className={classes.title}>Portfolio</Typography>
        <Typography className={classes.desc}>Manage your portfolio settings</Typography>
      </Box>
      <Box className={classes.contentContainer}>
        <Controller
          as={TextField}
          control={control}
          options={CURRENCY_OPTIONS}
          name="investmentExperience"
          label="Base Currency*"
          InputProps={{ className: classes.input }}
          helperText={errors.investmentExperience ? errors.investmentExperience.message : null}
        />
        <Controller
          as={TextField}
          control={control}
          options={BENCHMARK_OPTIONS}
          name="portfolioBenchmark"
          label="Portfolio Benchmark*"
          InputProps={{ className: classes.input }}
          helperText={errors.benchMark ? errors.benchMark.message : null}
        />
        <Button className={classes.submitButton} variant="contained" type="submit">
          Save Changes
        </Button>
      </Box>
    </form>
  )
}

export default UserSettingsForm
