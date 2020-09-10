import React from "react";
import Webcam from "react-webcam";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme, Button } from "laboratoria-ui";
import "./webcam.css";

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  // const [imgSrc, setImgSrc] = React.useState(null);

  const { callBack } = props;

  const capture = React.useCallback(() => {
    var imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    // setImgSrc(imageSrc);
    var buff = new Buffer(
      imageSrc.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
      "base64"
    );

    callBack(buff);
  }, [webcamRef, callBack]);

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
    facingMode: "user",
  };

  return (
    <MuiThemeProvider theme={Theme}>
      <div className="center-block">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          className="photo"
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
