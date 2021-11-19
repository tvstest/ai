import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles'
import { useAsteroidContext } from 'app/context/AsteroidContext'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minHeight: 150,
    marginTop: 30,
  },
})

const AsteroidDetails: React.FC = () => {
  const { root } = useStyles()
  const { state } = useAsteroidContext()

  if (state.status) {
    return (
      <Card className={root}>
        <CardContent>
          <Typography gutterBottom variant="body1">
            {state.status}
          </Typography>
          <Skeleton
            variant="rectangular"
            height={20}
            width="50%"
            animation="wave"
          />
          <br />
          <Skeleton
            variant="rectangular"
            height={15}
            width="30%"
            animation="wave"
          />
          <br />
          <Skeleton
            variant="rectangular"
            height={15}
            width="80%"
            animation="wave"
          />
        </CardContent>
      </Card>
    )
  }

  if (state.errorMessage) {
    return (
      <Alert className={root} severity="error">
        <AlertTitle>Error</AlertTitle>
        {state.errorMessage}
      </Alert>
    )
  }

  return (
    <>
      {state.details && (
        <Card className={root}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {state.details.name}
            </Typography>
            <Typography gutterBottom>
              <Link
                target="_blank"
                rel="noopener"
                href={state.details.nasa_jpl_url}
                title={state.details.nasa_jpl_url}
              >
                Nasa URL
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.details.is_potentially_hazardous_asteroid
                ? 'Asteroid is potentially hazardous'
                : 'Asteroid is most probably harmless'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default AsteroidDetails
