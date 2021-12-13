import React from 'react'
import { Box, Grid, Theme, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { getGraphQLFilter } from '@onextech/gvs-kit/utils'
import Layout from '../../components/Layout/Layout'
import routes from '../../routes'
import Breadcrumbs from '../../components/Layout/Breadcrumbs'
import PortfolioOverview from './PortfolioOverview'
import PortfolioCompanyChart from './PortfolioCompanyChart'
import PortfolioStrategyChart from './PortfolioStrategyChart'
import PortfolioTable from './PortfolioTable'
import { useGetPortfolio } from '../../graphql/portfolio/queries'
import { useListAssets } from '../../graphql/asset/queries'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  contentWrapper: {
    padding: theme.spacing(4),
  },
  builderButton: {
    padding: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.secondary.main,
    },
  },
  overviewContainer: {
    paddingRight: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.border.main}`,
    borderRight: `1px solid ${theme.palette.border.main}`,
  },
  companySector: {
    borderTop: `1px solid ${theme.palette.border.main}`,
    height: '100%',
    padding: theme.spacing(0, 2),
  },
  widgetSector: {
    marginTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.border.main}`,
    height: 300,
    padding: theme.spacing(1),
  },
  portfolioTableWrapper: {
    borderTop: `1px solid ${theme.palette.border.main}`,
    borderBottom: `1px solid ${theme.palette.border.main}`,
    margin: theme.spacing(3.25, 0, 2.5),
  },
}))

const assetFilterFields = {
  assets: { op: 'eq', key: 'id' },
}

const Performance: React.FC = (props) => {
  const classes = useStyles(props)

  // TODO: Once the authentication flow is working, get portfolioID from user using useSelector
  const portfolioID = '7oh6LScXAkjPyZsy2xiXd'
  const { loading: portfolioLoading, portfolio } = useGetPortfolio({ variables: { id: portfolioID } })

  const filters = { assets: portfolio?.assets?.map(({ assetID }) => assetID) }
  const filter = getGraphQLFilter(assetFilterFields)(filters)
  const { loading: assetsLoading, assets } = useListAssets({ variables: { filter }, skip: !portfolio })

  return (
    <Layout contentClassName={classes.contentWrapper} title="Portfolio" hideNav>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Breadcrumbs routes={routes} />
        </Box>
        <Button className={classes.builderButton} endIcon={<ArrowRightAltIcon />}>
          Portfolio Builder
        </Button>
      </Box>
      <Box className={classes.root}>
        <Grid container>
          {/* Overview */}
          <Grid item xs={12} md={3}>
            <Box className={classes.overviewContainer}>
              <PortfolioOverview />
            </Box>
          </Grid>

          {/* Company Sector Weights */}
          <Grid item xs={12} md={9}>
            <Box className={classes.companySector}>
              <PortfolioCompanyChart />
            </Box>
          </Grid>

          {/* Portfolio Table */}
          <Grid item xs={12}>
            <Box className={classes.portfolioTableWrapper}>
              <PortfolioTable loading={portfolioLoading || assetsLoading} portfolio={portfolio} assets={assets} />
            </Box>
          </Grid>

          {/* Strategy Charts */}
          <Grid item xs={12} container>
            <Grid item xs={6}>
              <Box className={classes.widgetSector}>
                <PortfolioStrategyChart title="Strategy Level 1 Weights" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.widgetSector}>
                <PortfolioStrategyChart title="Strategy Level 2 Weights" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Performance
