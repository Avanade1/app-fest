import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme } from "laboratoria-ui";
import "./App.css";
import Routes from "../routes";

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <Routes />
    </MuiThemeProvider>
  );
}

export default App;
