import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Theme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { countryService } from 'app/services/country-service'
import { ICountry } from 'app/utils/interfaces/country'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CountryCard from 'app/components/Country/CountryCard'
import { ERROR_FETCHING_COUNTRIES } from 'app/utils/constants'
import WeatherInfoModal from 'app/components/Weather/WeatherInfoModal'
import weatherService from 'app/services/weather-service'
import { ICapitalWeatherInfo } from 'app/utils/interfaces/weather'
import NetworkCallErrorDialog from 'app/components/NetworkCallErrorDialog'

const useStyles = makeStyles((theme: Theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}))

const CountryList: React.FC = () => {
  const classes = useStyles()
  const { countryName } = useParams<{ countryName: string }>()
  const [loading, setLoading] = useState(true)
  const [showWeatherInfoModal, setShowWeatherInfoModal] = useState(false)
  const [countries, setCountries] = useState<ICountry[]>([])
  const [capitalWeatherInfo, setCapitalWeatherInfo] =
    useState<ICapitalWeatherInfo>({} as ICapitalWeatherInfo)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const handleGetCapitalWeatherInfo = async (currentCountry: ICountry) => {
    try {
      const result = await weatherService.getWeatherByCity(
        currentCountry.capital
      )
      if (result.data) {
        setCapitalWeatherInfo(result.data)
        setShowWeatherInfoModal(true)
      }
    } catch (e) {
      setShowErrorDialog(true)
    }
  }

  const handleClose = () => setShowWeatherInfoModal(false)

  const handleCloseErrorDialog = () => setShowErrorDialog(false)

  const getCountries = async () => {
    try {
      const result = await countryService.getByName(countryName)
      if (result.data) {
        setCountries([...result.data])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4} justifyContent="center">
        {loading && <CircularProgress size={60} />}
        {!loading && countries.length === 0 && (
          <Typography gutterBottom variant="h6">
            {ERROR_FETCHING_COUNTRIES}
          </Typography>
        )}
        {countries.map((country: ICountry) => {
          return (
            <Grid item key={country.alpha2Code} xs={12} sm={6} md={4}>
              <CountryCard
                country={country}
                onClickWeatherCapitalButton={() =>
                  handleGetCapitalWeatherInfo(country)
                }
              />
            </Grid>
          )
        })}
        <WeatherInfoModal
          open={showWeatherInfoModal}
          handleClose={handleClose}
          capitalWeatherInfo={capitalWeatherInfo}
        />
        <NetworkCallErrorDialog
          open={showErrorDialog}
          handleClose={handleCloseErrorDialog}
        />
      </Grid>
    </Container>
  )
}

export default CountryList
