import React, { useState } from 'react'
import { Box, Grid, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import ReturnsAnalysisChart from './ReturnsAnalysisChart'
import TopFiveAssetsChart from './TopFiveAssetsChart'
import RiskBetaLandscapeChart from './RiskBetaLandscapeChart'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  contentWrapper: {
    padding: theme.spacing(4),
  },
  statContainer: {
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > *': {
        padding: theme.spacing(2, 0),
        borderBottom: `1px solid ${theme.palette.border.secondary}`,
      },
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      '& > *': {
        padding: theme.spacing(2, 0, 2, 2),
      },
      '& > :not(:first-child)': {
        borderLeft: `1px solid ${theme.palette.border.secondary}`,
      },
    },
  },
  companySector: {
    height: 500,
    maxHeight: 500,
  },
}))

const RiskManager: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout contentClassName={classes.contentWrapper} title="RiskManager">
      <Box className={classes.root}>
        <Grid container>
          {/* RiskManager History */}
          <Grid item xs={12} md={8}>
            <ReturnsAnalysisChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <TopFiveAssetsChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box className={classes.companySector}>
              <RiskBetaLandscapeChart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default RiskManager
