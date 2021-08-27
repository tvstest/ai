import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import countryService from "app/services/country-service";
import { ICountry } from "app/utils/interfaces/country";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CountryCard from "app/components/Country/CountryCard";
import { ERROR_FETCHING_COUNTRIES } from "app/utils/constants";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const CountryList: React.FC = () => {
  const classes = useStyles();
  const { countryName } = useParams<{ countryName: string }>();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<ICountry[]>([]);

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

  const getCountries = async () => {
    try {
      // setLoading(true);
      const result = await countryService.getByName(countryName);
      if (result.data) {
        setCountries(result.data);
      }
    } catch (e) {
      // alert(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4} justifyContent="center">
        {loading && <CircularProgress size={60} />}

        {countries.map((country: ICountry) => {
          return (
            <Grid item key={country.alpha2Code} xs={12} sm={6} md={4}>
              <CountryCard country={country} />
            </Grid>
          );
        })}
        {!loading && countries.length && (
          <Typography gutterBottom variant="h6">
            {ERROR_FETCHING_COUNTRIES}
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CountryList;
