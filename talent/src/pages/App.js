import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme } from "laboratoria-ui";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import logo from "./../img/logo.svg";
import WebcamCapture from "./../components/webcam/webcam";
import Footer from "./../components/footer/footer";

// Import da lib azure
import { FaceClient } from "@azure/cognitiveservices-face";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

const personGroupId = "facelaboratoria";

// configura / cria a conexao com a api da azure
const client = new FaceClient(
  new CognitiveServicesCredentials("64bc1a006e25491a9d0dfee37ac6ebd9"),
  "https://facelaboratoria.cognitiveservices.azure.com/"
);

const App = () => {
  const callBackCaptureImage = function (file) {
    //  para treinar o grupo de imagens no azure
    // client.personGroup.train(personGroupId);

    // verifica se terminou o treino do grupo de imagens
    client.personGroup
      .getTrainingStatus(personGroupId)
      .then((trainStatus) => {
        if (trainStatus.status === "succeeded") {
          // chama o endpoint da azure para tentar detectar a face na imagem que foi capturada pela camera
          // o azure cria um faceId temporario
          client.face
            .detectWithStream(file, { returnFaceId: true })
            .then(async (face) => {
              if (face.length === 0) {
                alert(
                  "Não foi possivel encontrar uma face na imagem, tente novamente!"
                );
                return false;
              }

              const faceId = face[0].faceId;
              try {
                // chama o endpoint da azure para identificar se o faceId
                const clientIdentify = await client.face.identify([faceId], {
                  personGroupId: personGroupId,
                });

                if (
                  clientIdentify.length === 0 ||
                  clientIdentify[0].candidates.length === 0
                ) {
                  alert("O usuario não está cadastrado na base de dados");
                  return false;
                }

                // pega o primeiro canditado encontrado com face parecida
                const personId = clientIdentify[0].candidates[0].personId;

                // verifica se o faceId gerado temporariamente é da personId do primeiro candidato
                const resultVerifyPerson = await client.face.verifyFaceToPerson(
                  faceId,
                  personId,
                  { personGroupId: personGroupId }
                );

                if (resultVerifyPerson.isIdentical === true) {
                  // Se o resultado for identico, ou seja se encontrou uma face e uma pessoa cadastrada no grupo
                  // Busca no azure a informação da pessoa que foi encontrada
                  const person = await client.personGroupPerson.get(
                    personGroupId,
                    personId
                  );

                  alert(`Ola ${person.name} seja muito bem vinda.... `);
                } else {
                  alert("Não encontrou face equivalente");
                }
              } catch (err) {
                console.log("erro ao tentar identificar", err);
                alert("O usuario nao esta cadastrado na base de dados");
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
    <MuiThemeProvider theme={Theme}>
      <header>
        <img alt="Logo Laboratoria" src={logo}></img>
      </header>
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
            Olá! Bem-vinde!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Estamos te aguardando :D
          </Typography>
        </div>
        <WebcamCapture callBack={callBackCaptureImage} />
      </section>
    </MuiThemeProvider>
  );
};

export default App;
