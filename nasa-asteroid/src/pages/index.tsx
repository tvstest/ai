import { Container, makeStyles } from "@material-ui/core";
import AsteroidDetails from "../components/AsteroidDetails";
import AsteroidForm from "../components/AsteroidForm";
import AsteroidContextWrapper from "../context/AsteroidContext";

const useStyles = makeStyles({
  topMargin: {
    marginTop: 30,
  },
});

const Home = () => {
  const { topMargin } = useStyles();

  return (
    <Container className={topMargin}>
      <AsteroidContextWrapper>
        <AsteroidForm />
        <AsteroidDetails />
      </AsteroidContextWrapper>
    </Container>
  );
};

export default Home;
