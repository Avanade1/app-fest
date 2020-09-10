import React from 'react';
import Webcam from 'react-webcam';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme, Button } from 'laboratoria-ui';
import './webcam.css';

// Import da lib azure
import { FaceClient } from '@azure/cognitiveservices-face';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';

const personGroupId = "avanade1";

// configura a conexao com a api da azure
const client = new FaceClient(
  new CognitiveServicesCredentials("64bc1a006e25491a9d0dfee37ac6ebd9"),
  "https://facelaboratoria.cognitiveservices.azure.com/"
);


const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    var imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImgSrc(imageSrc);
    var buff = new Buffer(
      imageSrc.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
      "base64"
    );

    //  para treinar o grupo de imagens no azure
    // client.personGroup.train(personGroupId)

    // verifica se terminou o treino do grupo de imagens
    client.personGroup.getTrainingStatus(personGroupId)
        .then(trainStatus => {
            if (trainStatus.status === 'succeeded') {
              // chama o endpoint da azure para tentar detectar a face na imagem que foi capturada pela camera foto da foto
              client.face.detectWithStream(buff, {returnFaceId:true}).then(async face => {
                try {
                  if (face.length === 0) {
                      alert('Não foi possivel encontrar uma face na imagem, tente novamente!')
                      return false;
                  }

                  const faceId = face[0].faceId
                  console.log("faceId...", faceId);
                  try {
                    const clientIdentify = await client.face.identify([faceId], {personGroupId: personGroupId})
                    console.log("clientIdentify...", clientIdentify);


                  } catch(erro) {
                    console.log('erro ao tentar identificar', erro)
                    alert('O usuario nao esta cadastrado na base de dados')
                  }
                } catch(err) {
                    //console.log(err)
                    alert('Erro ao capturar imagem, tente novamente!')
                }
              })
            } else {
                alert('O grupo esta sendo treinado, aguarde para fazer a validação')
            }
        }).catch(err => {
          alert(`erro ${err}`);
          console.log("train....", err)
        })            


  }, [webcamRef, setImgSrc]);

  //   var options = {
  //     method: 'POST',
  //     url: 'https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect',
  //     qs: { returnFaceId: 'true', recognitionModel: 'recognition_02' },
  //     headers:
  //     {
  //         // 'Postman-Token': 'de6cd04f-30da-483d-ad6a-fad5a4aaf4bb',
  //         // 'cache-control': 'no-cache',
  //         'Content-Type': 'application/octet-stream',
  //         'Ocp-Apim-Subscription-Key': '8048147a92dc4690bea5e4cc82532804'
  //     },
  //     body: buff
  // };
  // https://facelaboratoria.cognitiveservices.azure.com/face/v1.0/detect[?returnFaceId]
  // [&returnFaceLandmarks]
  // [&returnFaceAttributes]
  // [&recognitionModel]
  // [&returnRecognitionModel]
  // [&detectionModel]

  // const registerImg = () => {
  //   // fetch ("https://facelaboratoria.cognitiveservices.azure.com/")
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(resp => console.log(resp.json()))
  //     .catch(err => console.log(err))
  // }

  const videoConstraints = {
    width: 800,
    height: 800,
    facingMode: "user"
  };

  return (
    <MuiThemeProvider theme={Theme}>
      <div className='center-block'>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          className='photo'
          width={800}
          height={800}
          videoConstraints={videoConstraints}
        />
        <Button color="secondary" size="small" onClick={capture}>
          Tirar foto
        </Button>
        {/* <Button color='primary' size='small' onClick={registerImg}>
          Teste
        </Button>
        {imgSrc && (
          <img src={imgSrc}/>
          
        )} */}
      </div>
    </MuiThemeProvider>
  );
};

export default WebcamCapture;
