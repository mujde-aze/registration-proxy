import * as functions from "firebase-functions";

export interface RegistrationRequest {
    givenName: string;
    surname: string,
    age: string;
    street: string;
    phoneNumber: string;
    flatNumber: string;
    province: string;
    cityVillage: string;
    country: string;
    ageConfirmation: string;
    source: string;
}

export function areRequiredFieldsPresent(request: RegistrationRequest): boolean {
  const requiredFields = ["givenName", "age", "province", "phoneNumber", "ageConfirmation", "source"];

  for (const [key, value] of Object.entries(request)) {
    if (requiredFields.includes(key) && value == "") {
      functions.logger.error(`${key} is a required field, but it's missing.`);
      return false;
    }
  }

  return true;
}
