import React, { useState } from "react";
import Header from "../../components/header/header";
import WebcamCapture from "../../components/webcam/webcam";
import Footer from "../../components/footer/footer";
import BtnP from "../../components/button/button";

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

      <BtnP color="secondary" size="small" onClick={routeLogin}>
        Ir para login
      </BtnP>

      <section>
        <label>Digite seu nome</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />

        <label>Digite o nome da sua empresa</label>
        <input
          type="text"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          value={company}
        />
      </section>

      <WebcamCapture
        callBack={callBackCaptureImage}
        enableButton="true"
        labelButton="Cadastrar"
      />

      <Footer />
    </>
  );
};

export default Register;
