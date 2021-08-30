import { Container, makeStyles } from '@material-ui/core'
import AsteroidDetails from 'app/components/Asteroid/AsteroidDetails'
import AsteroidForm from 'app/components/Asteroid/AsteroidForm'
import AsteroidContextWrapper from 'app/context/AsteroidContext'

const useStyles = makeStyles({
  topMargin: {
    marginTop: 30,
  },
})

const Home = () => {
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
