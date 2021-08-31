import axios from "axios";
import * as functions from "firebase-functions";
import {Contact} from "../models/Contact";

export class ContactService {
    private contactsPath = "/wp-json/dt-posts/v2/contacts/";

    constructor(public readonly baseUrl: string,
                public readonly transferToken: string) {
    }

    async createContact(contact: Contact): Promise<void> {
      try {
        await axios
            .post(`${this.baseUrl}${this.contactsPath}`,
                {
                  "title": contact.name,
                },
                {
                  headers: {"Authorization": `Bearer ${this.transferToken}`},
                }
            );
      } catch (error) {
        throw new functions.https.HttpsError("internal",
            `Problem creating contact with name ${contact.name}`,
            error);
      }
    }
}
