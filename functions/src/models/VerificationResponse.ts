export interface VerificationResponse {
    success: boolean;
    score: number;
    // eslint-disable-next-line camelcase
    challenge_ts: string;
    hostname: string;
    "error-codes": string[];
}
