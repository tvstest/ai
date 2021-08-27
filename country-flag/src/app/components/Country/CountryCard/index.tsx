import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardMedia } from "@material-ui/core";
import WeatherInfoModal from "app/components/WeatherInfoModal";
import { ERROR_FETCHING_WEATHER } from "app/utils/constants";
import { ICountry } from "app/utils/interfaces/country";
import { ICapitalWeatherInfo } from "app/utils/interfaces/weather";
import weatherService from "app/services/weather-service";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 140,
  },
});

interface CountryCardProps {
  country: ICountry;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [capitalWeatherInfo, setCapitalWeatherInfo] =
    useState<ICapitalWeatherInfo>({} as ICapitalWeatherInfo);

  const handleGetCapitalWeatherInfo = async (currentCountry: ICountry) => {
    try {
      const result = await weatherService.getWeatherByCity(
        currentCountry.capital
      );
      if (result.data) {
        setCapitalWeatherInfo(result.data);
        setOpenModal(true);
      }
    } catch (e) {
      alert(ERROR_FETCHING_WEATHER);
    } finally {
    }
  };

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={country.flag}
            title={country.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {country.name}
              <Typography
                variant="subtitle1"
                component="p"
                color="textSecondary"
              >
                {country.capital}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Population : {country.population}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Latitude, Longitude :{" "}
              {country.latlng[0] + "°  " + country.latlng[1] + "°"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => handleGetCapitalWeatherInfo(country)}
            variant="contained"
            color="primary"
            size="small"
          >
            Capital Weather
          </Button>
        </CardActions>
      </Card>
      {/* review this thing */}
      {openModal && (
        <WeatherInfoModal
          open={openModal}
          handleClose={handleClose}
          capitalWeatherInfo={capitalWeatherInfo}
        />
      )}
    </>
  );
};

export default CountryCard;
