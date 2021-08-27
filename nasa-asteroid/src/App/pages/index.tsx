import { Container, makeStyles } from "@material-ui/core";
import AsteroidDetails from "App/components/AsteroidDetails";
import AsteroidForm from "App/components/AsteroidForm";
import AsteroidContextWrapper from "App/context/AsteroidContext";

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
