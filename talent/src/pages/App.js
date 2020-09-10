import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from 'laboratoria-ui';
import './App.css';
import Register from './cadastro/cadastros'
import Login from './login/login'



function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      {/*<Register/>*/}
    <Login/>
    </MuiThemeProvider>
    
  );
}

export default App;
