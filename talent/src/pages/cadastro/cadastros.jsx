import React, { useState } from "react";
import Header from "../../components/header/header";
import WebcamCapture from "../../components/webcam/webcam";
import BtnP from "../../components/button/button";
import Typography from '@material-ui/core/Typography';

import { faceClient, personGroupId } from "../../faceclient";

const Register = (props) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const routeLogin = () => {
    props.history.push("/");
  };

  const callBackCaptureImage = (file) => {
    alert("Capturou a imagem");
    if (!name || !company) {
      alert("Digite seu nome e sua empresa");
      return false;
    }

    faceClient.personGroupPerson
      .create(personGroupId, { name: name, userData: company })
      .then((person) => {
        faceClient.personGroupPerson
          .addFaceFromStream(personGroupId, person.personId, file)
          .then(() => {
            faceClient.personGroup.train(personGroupId);
            alert(`Olá ${name} seu cadastrado foi feito com sucesso!`);
          })
          .catch(() => {
            alert(`Erro ao reconhecer a imagem do rosto, tente novamente.`);
          });
      })
      .catch(() => {
        alert(`Erro ao cadastrar o usuário, tente novamente.`);
      });
  };

  return (
    <>
      <Header />

      <div className="float-left">
        <BtnP color="secondary" size="medium" onClick={routeLogin}>
          Fazer login
        </BtnP>
      </div>
      
      <div className="space-small">
        <Typography variant="h1" align="center">
          Talent Fest
        </Typography>
        <Typography variant="h2" align="center">
          2021
        </Typography>
      </div>
      <div className="space-small">
        <Typography variant="button" align="center">
          Agilize seu acesso, cadastre-se.
        </Typography>
      </div>


      <form>
        <fieldset>
          <label>
            Nome
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </label>
          
          <label>
            Empresa
            <input
              type="text"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              value={company}
            />
          </label>
        </fieldset>
      </form>

      <WebcamCapture
        callBack={callBackCaptureImage}
        enableButton="true"
        labelButton="Cadastrar"
      />

    </>
  );
};

export default Register;
