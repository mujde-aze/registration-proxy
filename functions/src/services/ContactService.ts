import axios from "axios";
import * as functions from "firebase-functions";
import {Contact} from "../models/Contact";

export class ContactService {
    private contactsPath = "/wp-json/dt-posts/v2/contacts/";

    constructor(public readonly baseUrl: string,
                public readonly transferToken: string) {
    }

    async createContact(contact: Contact, assignedTo: string): Promise<string> {
      try {
        const {data} = await axios
            .post(`${this.baseUrl}${this.contactsPath}`,
                {
                  "name": contact.name,
                  "age": contact.age,
                  "type": "access",
                  "assigned_to": assignedTo,
                  "nt_postman_keyselect": "needs_nt",
                  "contact_address": {
                    "values": [
                      {"value": contact.address},
                    ],
                  },
                  "sources": {
                    "values": [
                      {"value": contact.source},
                    ],
                  },
                },
                {
                  headers: {"Authorization": `Bearer ${this.transferToken}`},
                }
            );
        return data.ID;
      } catch (error) {
        throw new functions.https.HttpsError("internal",
            `Problem creating contact with name ${contact.name}: ${error}`);
      }
    }
}
