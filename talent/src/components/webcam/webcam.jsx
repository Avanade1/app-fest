import React from "react";
import Webcam from "react-webcam";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme } from "laboratoria-ui";
import "./webcam.css";
import BtnP from "../../components/button/button";

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);

  const { callBack } = props;

  const capture = React.useCallback(() => {
    let imageSrc = webcamRef.current.getScreenshot();
    let buff = new Buffer(
      imageSrc.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
      "base64"
    );

    callBack(buff);
  }, [webcamRef, callBack]);

  const videoConstraints = {
    width: 1200,
    height: 1600,
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
          width={1200}
          height={1600}
          videoConstraints={videoConstraints}
        />
        {props.enableButton && (
          <BtnP color="secondary" size="medium" onClick={capture}>
            {props.labelButton}
          </BtnP>
        )}
      </div>
    </MuiThemeProvider>
  );
};

export default WebcamCapture;
