import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles, Theme } from "@material-ui/core";
import { ICapitalWeatherInfo } from "app/utils/interfaces/weather";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    margin: "10px auto",
  },
  loader: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  centerContent: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

interface WeatherInfoModalProps {
  open: boolean;
  capitalWeatherInfo: ICapitalWeatherInfo;
  handleClose: () => void;
}

const WeatherInfoModal: React.FC<WeatherInfoModalProps> = (
  props: WeatherInfoModalProps
) => {
  const { open, handleClose, capitalWeatherInfo } = props;
  const classes = useStyles();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle disableTypography id="customized-dialog-title">
        <Typography variant="h6">Weather Information</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        {/* <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent dividers className={classes.centerContent}>
        <Typography variant="h4">{capitalWeatherInfo.location.name}</Typography>
        {capitalWeatherInfo.current.weather_icons?.map(
          (weatherIconUrl: any) => {
            return (
              <Avatar
                variant="rounded"
                // className={classes.rounded}
                src={weatherIconUrl}
              />
              //   <img src={weatherIcon} key={weatherIcon} alt="weather_icons" />
            );
          }
        )}
        <Typography variant="body1" color="textSecondary">
          Temperature : {capitalWeatherInfo.current.temperature + "°"}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Wind Speed : {capitalWeatherInfo.current.wind_speed} km/h
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Precipitation : {capitalWeatherInfo.current.precip} %
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          // fullWidth
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
  );
};

export default WeatherInfoModal;
