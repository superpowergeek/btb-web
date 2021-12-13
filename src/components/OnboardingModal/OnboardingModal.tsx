import React, { useState } from 'react'
import Router from 'next/router'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Box, Button, Typography } from '@material-ui/core'
import PortalModal from '../PortalModal'
import UserDetailsForm, { UserDetailsFormValues } from './UserDetailsForm'
import CashForm, { CashFormValues } from './CashForm'
import PortfolioForm, { PortfolioFormValues } from './PortfolioForm'
import {
  ONBOARDING_STEPS,
  INVESTMENT_EXPERIENCE_OPTIONS,
  CURRENT_PLATFORM_OPTIONS,
  REFERRAL_METHOD_OPTIONS,
  CURRENCY_OPTIONS,
  BENCHMARK_OPTIONS,
} from './const'

type OnboardingModalProps = React.ComponentProps<typeof PortalModal>

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
  },
  header: {
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: theme.spacing(1.25),
  },
  subHeader: {
    color: theme.palette.text.hint,
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  backButton: {
    padding: theme.spacing(1.5),
    color: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.secondary.main,
    },
  },
}))

const defaultUserDefails = {
  fullName: '',
  investmentExperience: INVESTMENT_EXPERIENCE_OPTIONS[0],
  currentPlatform: CURRENT_PLATFORM_OPTIONS[0],
  dateOfBirth: new Date(new Date().setHours(0, 0, 0, 0)),
  referralMethod: REFERRAL_METHOD_OPTIONS[0],
}

const defaultCashForm = {
  currency: CURRENCY_OPTIONS[0],
  amount: null,
}

const defaultPorfolioForm = {
  portfolioBenchmark: BENCHMARK_OPTIONS[0],
  assets: [],
}

const OnboardingModal: React.FC<OnboardingModalProps> = (props) => {
  const classes = useStyles()

  const [step, setStep] = useState(ONBOARDING_STEPS.GET_STARTED)
  const [formValues, setFormValues] = useState({
    userDetails: defaultUserDefails,
    cashForm: defaultCashForm,
    portfolioForm: defaultPorfolioForm,
  })

  const onUserDetailsSuccess = (values: UserDetailsFormValues) => {
    setFormValues({
      ...formValues,
      userDetails: values,
    })
    setStep(ONBOARDING_STEPS.CASH)
  }
  const onCashSuccess = (values: CashFormValues) => {
    setFormValues({
      ...formValues,
      cashForm: values,
    })
    setStep(ONBOARDING_STEPS.PORTFOLIO)
  }
  // Temp demo functionality
  const onPortfolioSuccess = (values: PortfolioFormValues) => {
    setFormValues({
      ...formValues,
      portfolioForm: values,
    })
    Router.push('/management/performance')
  }

  const renderStep = (step) => {
    switch (step) {
      case ONBOARDING_STEPS.GET_STARTED:
        return <UserDetailsForm onSuccess={onUserDetailsSuccess} record={formValues.userDetails} />
      case ONBOARDING_STEPS.CASH:
        return <CashForm onSuccess={onCashSuccess} record={formValues.cashForm} />
      case ONBOARDING_STEPS.PORTFOLIO:
        return <PortfolioForm onSuccess={onPortfolioSuccess} record={formValues.portfolioForm} />
      default:
        return <UserDetailsForm onSuccess={onUserDetailsSuccess} record={formValues.userDetails} />
    }
  }

  const isShowBackButton = step === ONBOARDING_STEPS.CASH || step === ONBOARDING_STEPS.PORTFOLIO

  const handleClickBack = (step) => {
    switch (step) {
      case ONBOARDING_STEPS.CASH:
        return setStep(ONBOARDING_STEPS.GET_STARTED)
      case ONBOARDING_STEPS.PORTFOLIO:
        return setStep(ONBOARDING_STEPS.CASH)
      default:
        setStep(step)
    }
  }

  return (
    <PortalModal width={step === ONBOARDING_STEPS.PORTFOLIO ? 555 : 430} hasCloseBtn={false} {...props}>
      {isShowBackButton && (
        <Button
          className={classes.backButton}
          startIcon={<ChevronLeftIcon />}
          onClick={() => {
            handleClickBack(step)
          }}
        >
          Back
        </Button>
      )}
      <Box className={classes.content}>
        <Typography className={classes.header} variant="h3">
          {step}
        </Typography>
        <Typography className={classes.subHeader} variant="subtitle1">
          {step === ONBOARDING_STEPS.PORTFOLIO
            ? 'Set your portfolio Benchmark'
            : 'BetaBlocks gives you more ways to make your money work harder.'}
        </Typography>
        {renderStep(step)}
      </Box>
    </PortalModal>
  )
}

export default OnboardingModal
