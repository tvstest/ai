import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import { ICountryResponse } from 'app/utils/interfaces/country'
import Divider from '@mui/material/Divider'

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
  centered: {
    justifyContent: 'center',
  },
  customCard: {
    display: 'flex',
    height: 184,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

interface CountryCardProps {
  country: ICountryResponse
  onClickWeatherCapitalButton: React.MouseEventHandler<HTMLButtonElement>
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onClickWeatherCapitalButton,
}: CountryCardProps) => {
  debugger
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={country.flags.png}
          title={country.name.common}
        />
        <Divider />
        <CardContent className={classes.customCard}>
          <Typography gutterBottom variant="h6">
            {country.name.common}
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {country.capital}
            </Typography>
          </Typography>
          <Typography variant="body1" color="primary" component="p">
            Population :{' '}
            <Typography variant="body2" component="span" color="textSecondary">
              {country.population}
            </Typography>
          </Typography>
          <Typography variant="body1" color="primary" component="p">
            Latitude, Longitude :{' '}
            <Typography variant="body2" component="span" color="textSecondary">
              {`${country.latlng[0]}°  ${country.latlng[1]}°`}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.centered}>
        <Button
          onClick={onClickWeatherCapitalButton}
          variant="contained"
          color="primary"
          size="small"
          data-testid="capital-weather-button"
        >
          Capital Weather
        </Button>
      </CardActions>
    </Card>
  )
}

export default CountryCard
