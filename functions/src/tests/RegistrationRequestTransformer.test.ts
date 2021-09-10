import {RegistrationRequest} from "../models/RegistrationRequest";
import {RegistrationRequestTransformer} from "../services/RegistrationRequestTransformer";
import {HttpsError} from "firebase-functions/lib/providers/https";

describe("The RegistrationRequestTransformer's transformToContact function", () => {
  it("Should throw an error if a required field is empty", () => {
    const request: RegistrationRequest = {
      ageConfirmation: "", cityVillage: "", flatNumber: "", street: "",
      givenName: "Robert", surname: "Marley", age: "20-30",
      country: "Australia", province: "", source: "google",
    };

    expect(() => {
      RegistrationRequestTransformer.transformToContact(request);
    }).toThrowError(HttpsError);
  });

  it("Should return a valid contact with a properly formatted address if cityVillage is empty", () => {
    const request: RegistrationRequest = {
      ageConfirmation: "", cityVillage: "", flatNumber: "", street: "56 Hope Road",
      givenName: "Robert", surname: "Marley", age: "20-30",
      country: "Jamaica", province: "Kingston", source: "google",
    };

    const contact = RegistrationRequestTransformer.transformToContact(request);
    expect(contact.name).toBe("Robert Marley");
    expect(contact.age).toBe("20-30");
    expect(contact.source).toBe("google");
    expect(contact.address).toBe("56 Hope Road, Kingston, Jamaica");
  });

  it("Should return a valid contact with a properly formatted address if cityVillage is provided", () => {
    const request: RegistrationRequest = {
      ageConfirmation: "", cityVillage: "St Andrew", flatNumber: "", street: "56 Hope Road",
      givenName: "Robert", surname: "Marley", age: "20-30",
      country: "Jamaica", province: "Kingston", source: "google",
    };

    const contact = RegistrationRequestTransformer.transformToContact(request);
    expect(contact.name).toBe("Robert Marley");
    expect(contact.age).toBe("20-30");
    expect(contact.source).toBe("google");
    expect(contact.address).toBe("56 Hope Road, St Andrew, Kingston, Jamaica");
  });
});
