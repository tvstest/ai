import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px auto',
  },
  loader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  centerContent: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))

interface INetworkCallErrorDialog {
  open: boolean
  handleClose: () => void
}

const NetworkCallErrorDialog: React.FC<INetworkCallErrorDialog> = ({
  open,
  handleClose,
}: INetworkCallErrorDialog) => {
  const classes = useStyles()
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="customized-dialog-title">
        <Typography>Error Information</Typography>
      </DialogTitle>
      <DialogContent dividers className={classes.centerContent}>
        <Typography>
          Getting CORS error from the third party,please try again.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          autoFocus
          onClick={handleClose}
          color="primary"
          className={classes.centerContent}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NetworkCallErrorDialog
