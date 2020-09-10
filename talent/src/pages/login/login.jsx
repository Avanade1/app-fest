import React from "react";
import Header from "../../components/header/header";
import WebcamCapture from "../../components/webcam/webcam";
import Footer from "../../components/footer/footer";
import Typography from "@material-ui/core/Typography";
import BtnP from "../../components/button/button";
//import Typography from '../../components/typography/typography'

import { faceClient, personGroupId } from "../../faceclient";

const Login = (props) => {
  const callBackCaptureImage = (file) => {
    // faceClient.personGroup.train(personGroupId)

    // verifica se terminou o treino do grupo de imagens
    faceClient.personGroup
      .getTrainingStatus(personGroupId)
      .then((trainStatus) => {
        if (trainStatus.status === "succeeded") {
          // chama o endpoint da azure para tentar detectar a face na imagem que foi capturada pela camera foto da foto
          faceClient.face
            .detectWithStream(file, { returnFaceId: true })
            .then(async (face) => {
              try {
                if (face.length === 0) {
                  alert(
                    "Não foi possivel encontrar uma face na imagem, tente novamente!"
                  );
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
                    alert("O usuario não está cadastrado na base de dados");
                    return false;
                  }

                  const personId = clientIdentify[0].candidates[0].personId;

                  // console.log('PERSONID...', personId, 'Faceid....', faceId)

                  const resultFaceVerify = await faceClient.face.verifyFaceToPerson(
                    faceId,
                    personId,
                    { personGroupId }
                  );
                  // console.log(result)

                  if (resultFaceVerify.isIdentical === true) {
                    const person = await faceClient.personGroupPerson.get(
                      personGroupId,
                      personId
                    );
                    console.log("PESSOA...", person);

                    // redireciona para pagina de

                    alert(
                      `Ola ${person.name} da empresa ${person.userData} seja muito bem vindo(a).`
                    );
                  } else {
                    alert("Não encontrou face equivalente");
                  }
                  console.log("clientIdentify...", clientIdentify);
                } catch (erro) {
                  console.log("erro ao tentar identificar", erro);
                  alert("O usuario nao esta cadastrado na base de dados");
                }
              } catch (err) {
                alert("Erro ao capturar imagem, tente novamente!");
              }
            });
        } else {
          alert("O grupo esta sendo treinado, aguarde para fazer a validação");
        }
      })
      .catch((err) => {
        alert(`erro ${err}`);
        console.log("train....", err);
      });
  };

  const routeRegister = () => {
    props.history.push("/register");
  };

  return (
    <>
      <Header />
      <section>
        <div className="space-big">
          <Typography variant="h2" align="center">
            Talent Fest
          </Typography>
          <Typography variant="h3" align="center">
            2021
          </Typography>
        </div>
        <div className="space-small">
          <Typography variant="h4" align="center">
            Olá! Bem-vindo!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Estamos te aguardando :D
          </Typography>
          <Typography variant="subtitle1" align="center">
            Faça seu cadastro
            <BtnP color="secondary" size="small" onClick={routeRegister}>
              Cadastro-se
            </BtnP>
          </Typography>
        </div>
        <WebcamCapture
          callBack={callBackCaptureImage}
          enableButton="true"
          labelButton="Tirar sua foto para acessar"
        />
        <Footer />
      </section>
    </>
  );
};

export default Login;
