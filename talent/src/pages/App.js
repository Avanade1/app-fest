import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from 'laboratoria-ui';
import Typography from '@material-ui/core/Typography';
import './App.css';
import logo from './../img/logo.svg'; 
import WebcamCapture from './../components/webcam/webcam' 
import Footer from './../components/footer/footer'

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <header>
        <img alt='Logo Laboratoria' src={logo}></img>
      </header>
      <section>        
        <div className='space-big'>
          <Typography variant="h1" align="center">
            Talent Fest
          </Typography>
          <Typography variant="h2" align="center">
            2021
          </Typography>
        </div>
        <div className='space-small'>
          <Typography variant="h3" align="center">
            Olá! Bem-vinde!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Estamos te aguardando :D
          </Typography>
        </div>
        <WebcamCapture  />
      </section> 
    
    </MuiThemeProvider>
    
  );
}

export default App;
