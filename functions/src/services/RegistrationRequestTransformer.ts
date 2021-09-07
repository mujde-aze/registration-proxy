import {Contact} from "../models/Contact";
import {areRequiredFieldsPresent, RegistrationRequest} from "../models/RegistrationRequest";
import * as functions from "firebase-functions";

export class RegistrationRequestTransformer {
  static transformToContact(request: RegistrationRequest): Contact {
    if (!areRequiredFieldsPresent(request)) {
      throw new functions.https.HttpsError("invalid-argument", "Required fields missing.");
    }
    functions.logger.debug(`Transforming ${JSON.stringify(request)}`);
    return {
      address: `${RegistrationRequestTransformer.transformToAddress(request)}`,
      age: `${request.age}`,
      source: request.source,
      name: `${request.givenName} ${request.surname}`,
    };
  }

  private static transformToAddress(request: RegistrationRequest): string {
    if (request.area !== "") {
      return `${request.street}, ${request.area}, ${request.city}, ${request.country}`;
    } else {
      return `${request.street}, ${request.city}, ${request.country}`;
    }
  }
}
