import React from 'react'
import { Breadcrumbs as MUIBreadcrumbs, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

interface BreadcrumbsProps {
  routes: { [key: string]: string }
}

const useStyles = makeStyles((theme: Theme) => ({
  homeLink: {
    color: theme.palette.text.secondary,
  },
  baseLink: {
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  currentPage: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(0.25),
  },
}))

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ routes }) => {
  const classes = useStyles()
  const router = useRouter()

  const pathnames = router.pathname.split('/').filter((x) => x)

  const lastIndex = pathnames.length - 1

  const currentPage = pathnames[lastIndex]
  const formattedCurrentPage = currentPage.replace('-', ' ')

  return (
    <>
      <MUIBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link href="/" passHref>
          <Typography component="a" className={clsx(classes.baseLink, classes.homeLink)} variant="h5">
            Dashboard
          </Typography>
        </Link>
        {Boolean(pathnames?.length) &&
          pathnames?.map((pathname, index) => {
            const isCurrentPage = index === lastIndex
            const to = `/${pathnames.slice(0, index + 1).join('/')}`

            return isCurrentPage ? null : (
              <Link passHref href={to} key={to}>
                <Typography component="a" className={classes.baseLink} variant="h5">
                  {routes[to]}
                </Typography>
              </Link>
            )
          })}
      </MUIBreadcrumbs>
      <Typography variant="h3" className={classes.currentPage}>
        {formattedCurrentPage}
      </Typography>
    </>
  )
}

export default Breadcrumbs
