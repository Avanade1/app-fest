const { FaceClient } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

const personGroupId = "facelaboratoria";
const faceClient = new FaceClient(
  new CognitiveServicesCredentials("64bc1a006e25491a9d0dfee37ac6ebd9"),
  "https://facelaboratoria.cognitiveservices.azure.com/"
);
export { personGroupId, faceClient };
