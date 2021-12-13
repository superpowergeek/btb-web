import React from 'react'
import { Typography, Theme, Box, IconButton, Grid } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'
import { PORTFOLIO_STATS } from './const'
import OverviewListCard from '../../components/OverviewListCard'

const useStyles = makeStyles((theme: Theme) => ({
  menuIconButton: {
    marginLeft: theme.spacing(1),
  },
  menuIcon: {
    color: theme.palette.text.light,
    fontSize: theme.typography.pxToRem(12),
  },
  sectionTitle: {
    marginRight: theme.spacing(1),
    lineHeight: 1,
  },
}))

const PortfolioOverview = () => {
  const classes = useStyles()
  return (
    <Box py={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.sectionTitle} variant="h5">
          Overview
        </Typography>
        <IconButton className={classes.menuIconButton}>
          <MoreVertIcon className={classes.menuIcon} />
        </IconButton>
      </Box>
      <Box>
        {PORTFOLIO_STATS.map((stat) => (
          <Grid item key={stat.title}>
            <OverviewListCard stat={stat} />
          </Grid>
        ))}
      </Box>
    </Box>
  )
}

export default PortfolioOverview
