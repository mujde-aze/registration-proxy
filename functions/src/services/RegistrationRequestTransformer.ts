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
      phone: request.phoneNumber,
    };
  }

  private static transformToAddress(request: RegistrationRequest): string {
    let street: string;
    if (request.streetNumber !== "") {
      street = `${request.streetNumber} ${request.street}`;
    } else {
      street = `${request.street}`;
    }

    if (request.cityVillage !== "") {
      return `${street}, ${request.cityVillage}, ${request.province}, ${request.country}`;
    } else {
      return `${street}, ${request.province}, ${request.country}`;
    }
  }
}
