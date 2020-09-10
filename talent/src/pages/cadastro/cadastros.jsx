import React, { useState } from "react";
import Hearder from "../../components/header/header";
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
    alert("capturou a imagem");
    if (!name || !company) {
      alert("Deve digitar um nome e uma descrição");
      return false;
    }

    faceClient.personGroupPerson
      .create(personGroupId, { name: name, userData: company })
      .then((person) => {
        faceClient.personGroupPerson
          .addFaceFromStream(personGroupId, person.personId, file)
          .then((response) => {
            console.log(response);

            faceClient.personGroup.train(personGroupId);

            alert(`Ola ${name} foi cadastrado com sucesso!`);
          })
          .catch((err) => {
            console.log("erro ao criar person face....", err);
            alert(
              "Erro ao reconhecer a imagem do rosto, por favor tente novamente!"
            );
          });
      })
      .catch((err) => {
        console.log("erro ao criar person....", err);
        alert("Erro ao cadastrar o usuario, por favor tente novamente!");
      });
  };

  return (
    <>
      <Hearder />

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
        labelButton="Tirar sua foto para acessar"
      />

      <Footer />
    </>
  );
};

export default Register;
