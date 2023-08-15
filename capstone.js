/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.






/** 
 * 
 * Please add these two lines in your package.json 


  "openai": "^3.3.0",
  "firebase-admin": "^8.9.2"
 * and create this json file
 * 
 * {
  "type": "service_account",
  "project_id": "voice-based-system",
  "private_key_id": "4edcb6b58dc4c6b5befc461fc85297d81f54d022",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0iDjakLxnvcyg\nKZxTe3LXJ/iciFc+f7wTc9JrTg9eYCkWknkgXbi717C+Gh2G03hbcQDTGOilcjuI\nAkSZearHokSlACdx+hOLVMwQnyNfdVwUWzMOV5exZ20mPXQGdBUMLAVGA9dxFX7u\nPuffkOkiGtMrj1kxqqBz1KaY/8HaU3c/YaGQSgRvcVFO5ONUrzDJtSdsrsI4wm3+\nLzcKLFWk/oEPBwMRHgN8PkYSsDd6i+NXOb0Tslyiqpnyv3QN5mtPrAhLqrk5k2Gj\nSMufV1ycISkGglvVBInWJNzCDyCjSYviigk91hS+9L9eq7fqJoDWyzvOc6W0PLcA\nREIkBtQxAgMBAAECggEAPTclxCMo56qJrNN/QSWOgtt4ZyeqIbSxgw0WkDE3b+J+\nfDttnCZ7giJ4uXVkhrfFS4htZadAF/28pvlR5pLFcI0a5rI/LdxE7U1zJr23gmJq\ntzJXhSj5dHvkHH/hDGEnU+nHXf7mel92G3Y0LPBXxStAaLhiX7+CSdSVKzMqOgva\nYL03y++Z+VTWNqFveK0X2VW0cVzidwX7u76EZjZtRZolhfNP/IOULc7amIuEOeRF\naK4/8/VWVqIzSyPWshYeU61uKVYlBVEpARJV05Clh8dUiFBw2+elXcSO99KtHei9\nsU7Mi+OPyw9CQFwZhlSL55pVgwcMBhBTULb9OMgtEwKBgQDhj0ETg0eNaOOL6xOC\n+R/3rdRV35muI7gKvRrPRlzgh/zXA6E+KeG4KsrxVaX6Jf0NXLrPOriIX5y9a3Zo\n6W5e3U0hdHkilQQ3+CPUKFn8OYFyY6iTVcrGyqJTjSqsDsgNDns1aDd+BfFBieXj\n/9sJiWFZzx+cfjZXOs3rtS0ewwKBgQDM5VYWVa8OdHMbmtouoYNXDjt4isq4QiuS\nzjlOusZqIPhjqbAha9WF+oP6cmyyWCQCPn1smR+uEu3zyHr9YIkdxOtF5MQuJYoJ\n2pFXQ9vzVtLJ9AmGdg/AaeYSEFmJw54wscH1CFKox1f/Y0lf1hCqfTlZLABoMOOH\nJsjEyMr5+wKBgBn8JOUYlJ+n2778v+ywwowIDJQwBEZZexRRoMsMMhrzz579ng/J\nR2WuGF8hHNPqmHJ3olXJUAT17tqrjKKdccef+wjFoEbpn+jKv2XrmCJEhbMl4//F\nPG0WXwj9FFNqCIXoiy0l6m6sRJTmTAOuMA+zMfHkuKGQsLXv4lUrNB19AoGBAIuM\n92Em4p/ZuDxo74krACVe0Cp9fSyaBMtsIaP5mgHWitZ2UDuzEi66PQFqxZWCaqQM\no6g/clBBHEgZl4rTIRBhekyUTvmPH8EuWCczVK8bx109FO+7oWbPuZ87+3/U9/z6\nVLvq+0Fw5AJRQTxAtAEqYNDXIz/TbGQ0ijFdAMHZAoGAfPSEUZA83hZ1OEfrZXyz\nxEsVY6uTxsxAmrhFyR7RWSoG20lT9YOr1LZfZKpSeWokll3NPwSyKT7iUyR7/UWR\nZJi3OA1g8wls3tTMPdad/hJfBW6cgwMu/fBJRBvYI4NGZX7kFeU6QgEu0KiwhYtS\nUXMR3ptekhdEAvHDuOQYdKw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-7kx4k@voice-based-system.iam.gserviceaccount.com",
  "client_id": "114843771144807375674",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7kx4k%40voice-based-system.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
 * 
 * 
 * 
*/

 
 * */
const Alexa = require("ask-sdk-core");
const { Configuration, OpenAIApi } = require("openai");

const admin = require("firebase-admin");
const serviceAccount = require("service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voice-based-system.firebaseio.com",
});

const DB = admin.firestore();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Welcome to voice based system";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const AskQuestionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AskQuestionIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope } = handlerInput;
    let speakOutput = "Hello World";

    const question = Alexa.getSlotValue(requestEnvelope, "question");

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "When user asks for side effect of medicine make it short",
        },
        { role: "user", content: question },
      ],
    });
    speakOutput = chatCompletion.data.choices[0].message.content;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("What do you want to do next ?")
      .getResponse();
  },
};
const PrescriptionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "PrescriptionIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope } = handlerInput;
    let speakOutput = "prescription";

    const medicine = Alexa.getSlotValue(requestEnvelope, "prescription");
    const time = Alexa.getSlotValue(requestEnvelope, "time");
    try {
      await DB.collection("Prescriptions").add({
        medicine: medicine,
        time: time,
      });
      speakOutput = "Prescription have been saved";
    } catch (e) {
      console.log(e);
      speakOutput = `There was a problem occurs`;
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};

const TellStoryIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "TellStoryIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope } = handlerInput;
    let speakOutput = "";

    const story = Alexa.getSlotValue(requestEnvelope, "story");
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "tell 50 words joke story" },

        { role: "user", content: story },
      ],
    });
    speakOutput = chatCompletion.data.choices[0].message.content;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "You can say hello to me! How can I help?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Goodbye!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AskQuestionIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    PrescriptionIntentHandler,
    TellStoryIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
