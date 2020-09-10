import React from "react";
import Header from "../../components/header/header";
import WebcamCapture from "../../components/webcam/webcam";
import Footer from "../../components/footer/footer";
import Typography from "@material-ui/core/Typography";
import BtnP from "../../components/button/button";
//import Typography from '../../components/typography/typography'

// Import da lib azure
import { FaceClient } from "@azure/cognitiveservices-face";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

const personGroupId = "avanade1";

// configura a conexao com a api da azure
const client = new FaceClient(
  new CognitiveServicesCredentials("64bc1a006e25491a9d0dfee37ac6ebd9"),
  "https://facelaboratoria.cognitiveservices.azure.com/"
);

function Login() {
  // estou tentando criar uma funcao de callback
  /*const callBackCaptureImage = (file) => {
    alert("apos captura capturou");*/

    //  para treinar o grupo de imagens no azure
    // client.personGroup.train(personGroupId)

    // verifica se terminou o treino do grupo de imagens
    client.personGroup
      .getTrainingStatus(personGroupId)
      .then((trainStatus) => {
        if (trainStatus.status === "succeeded") {
          // chama o endpoint da azure para tentar detectar a face na imagem que foi capturada pela camera foto da foto
          client.face
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
                  const clientIdentify = await client.face.identify([faceId], {
                    personGroupId: personGroupId,
                  });
                  console.log("clientIdentify...", clientIdentify);
                } catch (erro) {
                  console.log("erro ao tentar identificar", erro);
                  alert("O usuario nao esta cadastrado na base de dados");
                }
              } catch (err) {
                //console.log(err)
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
            Olá! Bem-vinde!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Estamos te aguardando :D
          </Typography>
        </div>
        <WebcamCapture>
          <BtnP color="secondary" size="small" onClick={"captura"}>
            Tirar foto
          </BtnP>
        </WebcamCapture>
        <Footer/> 
      </section>
    </>
  );
}

export default Login;
