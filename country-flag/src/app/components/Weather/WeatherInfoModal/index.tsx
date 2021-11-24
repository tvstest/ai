import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { makeStyles } from '@mui/styles'
import { ICapitalWeatherInfo } from 'app/utils/interfaces/weather'
import Avatar from '@mui/material/Avatar'
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

interface IWeatherInfoModalProps {
  open: boolean
  capitalWeatherInfo: ICapitalWeatherInfo
  handleClose: () => void
}

const WeatherInfoModal: React.FC<IWeatherInfoModalProps> = ({
  open,
  handleClose,
  capitalWeatherInfo,
}: IWeatherInfoModalProps) => {
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
        <Typography>Weather Information</Typography>
      </DialogTitle>
      <DialogContent dividers className={classes.centerContent}>
        <Typography variant="h4">
          {capitalWeatherInfo?.location?.name}
        </Typography>
        {capitalWeatherInfo?.current?.weather_icons?.map(
          (weatherIconUrl: string) => (
            <Avatar
              key={weatherIconUrl}
              variant="rounded"
              src={weatherIconUrl}
            />
          )
        )}
        <Typography variant="body1" color="textSecondary">
          Temperature : {`${capitalWeatherInfo?.current?.temperature}°`}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Wind Speed : {capitalWeatherInfo?.current?.wind_speed} km/h
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Precipitation : {capitalWeatherInfo?.current?.precip} %
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

export default WeatherInfoModal
