import { ThemeProvider } from "@material-ui/core";
import Navbar from "App/components/Navbar";
import Routes from "App/components/Routes";
import { Suspense } from "react";
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
