import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Avatar, Typography, Button } from '@material-ui/core' 

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 0 1px rgba(63, 63, 68, 0.05)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    alignItems: 'center'
  },
  avatar: {
    width: 52,
    height: 52
  },
  address: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
  },
  time: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
  },
  btnRemove: {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    marginTop: theme.spacing(2)
  },
  btnChangePassword: {
    fontSize: theme.typography.pxToRem(13),
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.background.btnChangePwdRed}`,
    color: theme.palette.background.btnChangePwdRed
  }
}))

function UserSummaryCard() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Avatar src='/user.jpg' className={classes.avatar} />
      <Typography>Adrian Stefan</Typography>
      <Typography className={classes.address}>Singapore, Singapore</Typography>
      <Typography className={classes.time}>4:32PM (GMT+3)</Typography>
      <Button className={classes.btnRemove}>REMOVE PICTURE</Button>
      <Button className={classes.btnChangePassword} variant='outlined'>CHANGE PASSWORD</Button>
    </Box>
  )
}

export default UserSummaryCard
