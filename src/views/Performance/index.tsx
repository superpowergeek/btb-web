import React from 'react'
import { Box, Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import StatCard from '../../components/StatCard'
import { PERFORMANCE_STATS } from './const'
import PerformanceHistoryChart from './PerformanceHistoryChart'
import PerformanceStrategyChart from './PerformanceStrategyChart'
import PerformanceCompanyChart from './PerformanceCompanyChart'

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

const Performance: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout contentClassName={classes.contentWrapper} title="Performance">
      <Box className={classes.root}>
        {/* Stats */}
        <Grid container className={classes.statContainer}>
          {PERFORMANCE_STATS.map((stat) => (
            <Grid item key={stat.title}>
              <StatCard stat={stat} />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          {/* Performance History */}
          <Grid item xs={12} md={8}>
            <PerformanceHistoryChart />
          </Grid>
          {/* Performance by Strategy */}
          <Grid item xs={12} md={4}>
            <PerformanceStrategyChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box className={classes.companySector}>
              <PerformanceCompanyChart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Performance
