import React from "react";
import Header from "../../components/header/header";
import WebcamCapture from "../../components/webcam/webcam";
import Footer from "../../components/footer/footer";
import BtnP from "../../components/button/button";
import Typography from '@material-ui/core/Typography';


import { faceClient, personGroupId } from "../../faceclient";

const Login = (props) => {
  const callBackCaptureImage = (file) => {

    faceClient.personGroup
      .getTrainingStatus(personGroupId)
      .then((trainStatus) => {
        if (trainStatus.status === "succeeded") {
          faceClient.face
            .detectWithStream(file, { returnFaceId: true })
            .then(async (face) => {
              try {
                if (face.length === 0) {
                  alert(`Não foi possível validar a imagem, tente novamente.`);
                  return false;
                }

                const faceId = face[0].faceId;
                console.log("faceId...", faceId);
                try {
                  const clientIdentify = await faceClient.face.identify(
                    [faceId],
                    {
                      personGroupId: personGroupId,
                    }
                  );

                  if (
                    clientIdentify.length === 0 ||
                    clientIdentify[0].candidates.length === 0
                  ) {
                    alert(`Usuário não está cadastrado.`);
                    return false;
                  }

                  const personId = clientIdentify[0].candidates[0].personId;

                  const resultFaceVerify = await faceClient.face.verifyFaceToPerson(
                    faceId,
                    personId,
                    { personGroupId }
                  );

                  if (resultFaceVerify.isIdentical === true) {
                    const person = await faceClient.personGroupPerson.get(
                      personGroupId,
                      personId
                    );

                    alert(`Olá ${person.name} da ${person.userData} seja muito bem vinde.`);
                  } else {
                    alert(`Usuário não encontrado, tente novamente.`);
                  }
                } catch (err) {
                  alert(`Usuário não cadastrado.`);
                }
              } catch (err) {
                alert(`Erro ao capturar a imagem, tente novamente.`);
              }
            });
          } else {
            alert(`Aguarde para fazer a validação.`);
        }
      })
      .catch(() => {
        alert(`Ocorreu um erro, tente novamente.`);
      });
  };

  const routeRegister = () => {
    props.history.push("/register");
  };

  return (
    <>
      <Header/>
      <section>
        <div className="space-big">
          <Typography variant="h1" align="center">
            Talent Fest
          </Typography>
          <Typography variant="h2" align="center">
            2021
          </Typography>
        </div>
        <div className="space-small">
          <Typography variant="h3" align="center">
            Olá! Bem vinde!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Estamos te aguardando :D
          </Typography>
        </div>
        <WebcamCapture
          callBack={callBackCaptureImage}
          enableButton="true"
          labelButton="Login"
        />
        <div className="float-top">
          <BtnP color="secondary" size="medium" onClick={routeRegister}>
            Cadastre-se
          </BtnP>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;
