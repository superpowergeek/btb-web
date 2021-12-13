import React, { useState } from 'react'
import Router from 'next/router'
import * as yup from 'yup'
import { DatePicker } from '@material-ui/pickers'
import { Box, Grid, Avatar, Typography, Theme, Divider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import { TextField } from '@onextech/gvs-kit/core'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import UserSummaryCard from '../../components/UserSummaryCard'
import { INVESTMENT_EXPERIENCE_OPTIONS, CURRENT_PLATFORM_OPTIONS, REFERRAL_METHOD_OPTIONS, CURRENCY_OPTIONS, OCCUPATION_TYPE_OPTIONS, BENCHMARK_OPTIONS } from '../../../src/components/OnboardingModal/const'
import UserSettingsForm from '../../components/Form/UserSettingsForm/UserSettingsForm'

interface UserDetailsFormProps {
  onSuccess?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  contentWrapper: {
    padding: theme.spacing(4),
  }
}))

const Settings: React.FC<UserDetailsFormProps> = (props) => {
  const classes = useStyles(props)
  const { onSuccess } = props

  return (
    <Layout contentClassName={classes.contentWrapper} title="Settings">
      <Box className={classes.root}> 
        <Grid container>
          <Grid item xs={12} md={3}>
            <UserSummaryCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <UserSettingsForm onSuccess={onSuccess}/>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Settings
