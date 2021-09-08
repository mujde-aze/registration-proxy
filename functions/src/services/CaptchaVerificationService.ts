import axios from "axios";
import * as functions from "firebase-functions";
import {VerificationResponse} from "../models/VerificationResponse";

const CAPTCHA_THRESHOLD = 0.5;

export class CaptchaVerificationService {
  constructor(public readonly secret: string) {
  }

  async isRequestVerified(token: string | undefined): Promise<boolean> {
    if (token) {
      const response = await this.verifyToken(token);
      if (response.success) {
        return response.score > CAPTCHA_THRESHOLD;
      }
    }

    return false;
  }

  private async verifyToken(token: string): Promise<VerificationResponse> {
    try {
      const {data} = await axios
          .post(`https://www.google.com/recaptcha/api/siteverify?secret=${this.secret}&response=${token}`);

      functions.logger.info(`Received the following response from g-recaptcha verification: ${JSON.stringify(data)}`);
      return data as VerificationResponse;
    } catch (error) {
      throw new functions.https.HttpsError("internal", `Error calling recaptcha verification API.: ${error}`);
    }
  }
}
