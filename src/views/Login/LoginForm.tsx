import React from 'react'
import Router from 'next/router'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import { Grid, Box, Button, IconButton, InputAdornment, Typography, Theme } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useAuth } from '../../auth'

interface LoginFormProps {
  onLoginSuccess?: () => void
}

interface LoginFormValues {
  email: string
  password: string
}

const defaultValues = { email: '', password: '' }

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(5, 7),
    '& > *': {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 7),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 7),
    },
  },
  textField: {
    width: '100%',
    '& > .MuiOutlinedInput-root': {
      marginBottom: theme.spacing(2.5),
      fontSize: theme.typography.pxToRem(16),
      height: 56,
    },
    '& > span': {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  input: {
    '& > .MuiOutlinedInput-input': {
      padding: theme.spacing(0.25, 2),
    },
  },
  errorText: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 400,
    color: theme.palette.error.main,
    alignSelf: 'flex-start',
    marginTop: theme.spacing(-2),
  },
  checkbox: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 0, 0, 1),
      marginRight: theme.spacing(1),
    },
  },
  link: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  button: {
    width: '100%',
    height: 42,
  },
  registerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  separator: {
    borderColor: theme.palette.border.secondary,
    borderTop: '2px solid',
    width: '100%',
    marginBottom: theme.spacing(5),
  },
  signInButton: {
    marginTop: theme.spacing(5),
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(-2),
  },
}))

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Required.'),
  password: yup.string().required('Required.'),
})

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onLoginSuccess } = props
  const classes = useStyles()

  const { control, handleSubmit, errors, reset } = useForm<LoginFormValues>({
    defaultValues,
    validationSchema: loginFormSchema,
  })

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById('password') as HTMLInputElement
    if (passwordField.type === 'password') {
      passwordField.type = 'text'
      setIsPasswordVisible(true)
    } else {
      passwordField.type = 'password'
      setIsPasswordVisible(false)
    }
  }

  const { signIn } = useAuth()

  const onSubmit = async (values) => {
    const { email, password } = values
    const { error } = await signIn({ username: email, password })
    if (!error) {
      if (onLoginSuccess) onLoginSuccess()
      else {
        Router.push('/')
      }
    }
    reset()
  }

  // TEMPORARY CLIENT DEMO FUNCTIONALITY
  const mockSubmit = () => {
    reset()
    Router.push('/')
  }

  return (
    <div className={classes.root}>
      <Grid item lg={4} md={6} sm={12}>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Typography variant="h3">Get Started</Typography>
            <Typography variant="subtitle2">BetaBlocks gives you more ways to make your money work harder.</Typography>
            <div className={classes.separator} />
            <Controller
              as={TextField}
              control={control}
              name="email"
              variant="outlined"
              placeholder="Email Address"
              error={Boolean(errors.email)}
              className={classes.textField}
            />
            <ErrorMessage errors={errors} name="email">
              {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
            </ErrorMessage>
            <Controller
              as={TextField}
              control={control}
              id="password"
              name="password"
              type="password"
              variant="outlined"
              placeholder="Password"
              error={Boolean(errors.password)}
              className={classes.textField}
            />
            <ErrorMessage errors={errors} name="password">
              {({ message }) => <Typography className={classes.errorText}>{message}</Typography>}
            </ErrorMessage>
            <Button className={classes.button} variant="contained" color="primary" type="submit">
              SIGN IN
            </Button>
            <Typography variant="subtitle1">
              Have an account? <a href="#">Sign Up</a>
            </Typography>
          </form>
        </Box>
      </Grid>
      <Grid item lg={8} xs={12}>
        <img className={classes.registerImage} src="others/register/register_image.png" alt="Register" />
      </Grid>
    </div>
  )
}

export default LoginForm
