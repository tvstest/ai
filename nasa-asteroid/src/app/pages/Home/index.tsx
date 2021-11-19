import Container from '@mui/material/Container'
import makeStyles from '@mui/styles/makeStyles'
import AsteroidDetails from 'app/components/Asteroid/AsteroidDetails'
import AsteroidForm from 'app/components/Asteroid/AsteroidForm'
import AsteroidContextWrapper from 'app/context/AsteroidContext'

const useStyles = makeStyles({
  topMargin: {
    marginTop: 30,
  },
})

const Home: React.FC = () => {
  const { topMargin } = useStyles()

  return (
    <Container className={topMargin}>
      <AsteroidContextWrapper>
        <AsteroidForm />
        <AsteroidDetails />
      </AsteroidContextWrapper>
    </Container>
  )
}

export default Home
