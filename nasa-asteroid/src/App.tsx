import { ThemeProvider } from "@material-ui/core";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <Suspense fallback="Loading ...">
      <Navbar />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
