import React from 'react';
import Hearder from '../../components/header/header';
import WebcamCapture from '../../components/webcam/webcam';
import Footer from '../../components/footer/footer'
import BtnP from '../../components/button/button';

function Register() {
  return (
	  <>
      <Hearder/>
      <WebcamCapture>
	  <BtnP color="secondary" size="small"> Cadastrar </BtnP>
	  </WebcamCapture>
     
      <Footer/>
    </>
  );
}

export default Register;
