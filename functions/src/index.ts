import * as functions from "firebase-functions";
import {TransferTokenGenerator} from "./services/TransferTokenGenerator";
import * as dayjs from "dayjs";
import {CallableContext} from "firebase-functions/lib/common/providers/https";
import {ContactService} from "./services/ContactService";
import {CaptchaVerificationService} from "./services/CaptchaVerificationService";
import {RegistrationRequestTransformer} from "./services/RegistrationRequestTransformer";
import {RegistrationRequest} from "./models/RegistrationRequest";

export const registerContact = functions.region("australia-southeast1")
    .https.onCall(async (data: RequestData, context) => {
      await verifyCallingApp(context, data);

      const transferTokenGenerator = initializeTransferTokenGenerator();
      const contactService = new ContactService(functions.config().dt.baseurl, transferTokenGenerator.getTransferToken());
      const contact = RegistrationRequestTransformer.transformToContact(data.registrationRequest);

      functions.logger.info(`Received request to create contact: ${JSON.stringify(contact)}`);
      const responseId = await contactService.createContact(contact, functions.config().dt.defaultassignment);
      functions.logger.info(`Successfully created contact with ID: ${responseId}`);

      return "success";
    });

async function verifyCallingApp(context: CallableContext, data: RequestData) {
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called from a verified app."
    );
  }

  if (data.captchaToken == undefined || data.registrationRequest == undefined) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "That's odd, there should be a captcha token as well as registration data."
    );
  }

  const captchaService = new CaptchaVerificationService(functions.config().captcha.secret);
  if (!await captchaService.isRequestVerified(data.captchaToken)) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "Captcha verification failed, you might be a robot."
    );
  }
}

function initializeTransferTokenGenerator(): TransferTokenGenerator {
  return new TransferTokenGenerator(functions.config().dt.token,
      functions.config().dt.site1, functions.config().dt.site2, dayjs.utc().format("YYYY-MM-DDHH"));
}

interface RequestData {
    captchaToken: string,
    registrationRequest: RegistrationRequest
}
