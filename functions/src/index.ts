import * as functions from "firebase-functions";
import {TransferTokenGenerator} from "./services/TransferTokenGenerator";
import * as dayjs from "dayjs";
import {CallableContext} from "firebase-functions/lib/common/providers/https";
import {ContactService} from "./services/ContactService";
import {Contact} from "./models/Contact";

export const registerContact = functions.region("australia-southeast1")
    .https.onCall((data, context) => {
      verifyCallingApp(context);
      functions.logger.info("Received request to create contact");

      const transferTokenGenerator = initializeTransferTokenGenerator();
      const contactService = new ContactService(functions.config().dt.baseurl, transferTokenGenerator.getTransferToken());
      const contact = data as Contact;
      return contactService.createContact(contact, functions.config().dt.defaultassignment);
    });

function verifyCallingApp(context: CallableContext) {
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called from a verified app."
    );
  }
}

function initializeTransferTokenGenerator(): TransferTokenGenerator {
  return new TransferTokenGenerator(functions.config().dt.token,
      functions.config().dt.site1, functions.config().dt.site2, dayjs.utc().format("YYYY-MM-DDHH"));
}
