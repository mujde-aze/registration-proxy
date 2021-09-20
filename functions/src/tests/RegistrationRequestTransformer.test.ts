import {RegistrationRequest} from "../models/RegistrationRequest";
import {RegistrationRequestTransformer} from "../services/RegistrationRequestTransformer";
import {HttpsError} from "firebase-functions/lib/providers/https";

describe("The RegistrationRequestTransformer's transformToContact function", () => {
  it("Should throw an error if a required field is empty", () => {
    const request: RegistrationRequest = {
      phoneNumber: "", streetNumber: "",
      ageConfirmation: "yes", cityVillage: "", flatNumber: "", street: "",
      givenName: "Robert", surname: "Marley", age: "20-30",
      country: "Australia", province: "Kingston", source: "google",
    };

    expect(() => {
      RegistrationRequestTransformer.transformToContact(request);
    }).toThrowError(HttpsError);
  });

  it("Should return a valid contact with a properly formatted address if cityVillage is empty", () => {
    const request: RegistrationRequest = {
      phoneNumber: "123456789", streetNumber: "",
      ageConfirmation: "yes", cityVillage: "", flatNumber: "", street: "Hope Road",
      givenName: "Robert", surname: "Marley", age: "20-30",
      country: "Jamaica", province: "Kingston", source: "google",
    };

    const contact = RegistrationRequestTransformer.transformToContact(request);
    expect(contact.name).toBe("Robert Marley");
    expect(contact.age).toBe("20-30");
    expect(contact.source).toBe("google");
    expect(contact.address).toBe("Hope Road, Kingston, Jamaica");
  });

  it("Should return a valid contact with a properly formatted address if cityVillage is provided", () => {
    const request: RegistrationRequest = {
      phoneNumber: "123456789", streetNumber: "56",
      ageConfirmation: "no", cityVillage: "St Andrew", flatNumber: "", street: "Hope Road",
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
