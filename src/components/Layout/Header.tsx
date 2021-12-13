import React from 'react'
import Link from 'next/link'
import kebabCase from 'lodash/kebabCase'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Avatar, Box, Menu, MenuItem, Typography, Theme } from '@material-ui/core'
import NavLink from './NavLink'
import { useAuth } from '../../auth'
import { renderNavLink } from './Footer'

interface HeaderStyles {
  isHome: boolean
}

interface HeaderProps {
  isHome?: boolean
}

const useStyles = makeStyles<Theme, HeaderStyles>((theme) => ({
  root: {
    height: 64,
    padding: theme.spacing(2, 4),
    backgroundColor: theme.palette.background.dark,
    borderBottom: ({ isHome }) => (isHome ? `1px solid ${theme.palette.border.main}` : 'none'),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  logo: {
    maxWidth: 150,
    objectFit: 'contain',
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    height: 32,
    width: 32,
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: theme.palette.secondary.dark,
    marginRight: theme.spacing(1),
  },
  avatarName: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuWrapper: {
    '& .MuiPaper-root': {
      borderRadius: 4,
    },
    '& .MuiMenuItem-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  navBarLink: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    marginLeft: theme.spacing(4),
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const Header: React.FC<HeaderProps> = (props) => {
  const { isHome } = props
  const classes = useStyles({ isHome })

  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const navLinks = [
    {
      label: 'Get Started',
      render: (
        <Link href="/get-started" passHref>
          <Typography className={classes.navBarLink} variant="button" component="a">
            Get Started
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Learn',
      render: (
        <Link href="/learn" passHref>
          <Typography className={classes.navBarLink} variant="button" component="a">
            Learn
          </Typography>
        </Link>
      ),
    },
  ]

  return (
    <Box className={classes.root}>
      {/* Logo */}
      <Link href="/" passHref>
        <Box component="a" className={classes.logoWrapper}>
          <img src="/logo.png" alt="logo" className={classes.logo} />
        </Box>
      </Link>

      {isHome ? (
        // Home Header
        <Box className={classes.navBarLinksWrapper} display="flex">
          {navLinks.map((navLink, i) => {
            return <Box>{renderNavLink(navLink)}</Box>
          })}
        </Box>
      ) : (
        // Dashboard Header
        <Box onClick={handleOpenMenu} className={classes.avatarWrapper}>
          {/* TODO: Get user name and avatar */}
          <Avatar src="/user.jpg" className={classes.avatar} />
          <Typography className={classes.avatarName} variant="button">
            Adrian Stefan
          </Typography>
          <Menu
            id="user-icon-menu"
            className={classes.menuWrapper}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            transformOrigin={{
              vertical: -45,
              horizontal: 0,
            }}
          >
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  )
}

export default Header
