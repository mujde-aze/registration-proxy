import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const registerContact = functions.region("australia-southeast1")
    .https.onCall((data, context) => {
      functions.logger.info("Received request to create contact");
    });
