import { Buffer } from "buffer";
import {
  randomBytes,
  scryptSync,
  createCipheriv,
  createDecipheriv,
} from "crypto";

class EncoderDecoder {
  private static key: Buffer | null = null;
  private static salt = "some cool salt for a cool group of programmers";
  private static passphrase =
    "what a cool passphrase, never would have guessed it";

  public static initialize(): void {
    if (this.key) {
      return;
    }

    // Derive the key
    const keyMaterial = scryptSync(this.passphrase, this.salt, 32);
    this.key = keyMaterial;
  }

  private static getKey(): Buffer {
    if (!this.key) {
      this.initialize();
    }
    return this.key!;
  }

  public static encode(item: unknown): string {
    const key = this.getKey();
    const val = (() => {
      switch (typeof item) {
        case "boolean":
        case "number":
        case "string":
          return item.toString();
        case "object":
          return JSON.stringify(item);
        default:
          return "undefined";
      }
    })();

    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const encryptedBuffer = Buffer.concat([
      cipher.update(val, "utf8"),
      cipher.final(),
      cipher.getAuthTag(),
    ]);

    const combinedBuffer = Buffer.concat([iv, encryptedBuffer]);
    return combinedBuffer.toString("base64");
  }

  public static decode(str: string): string {
    const key = this.getKey();
    const combinedBuffer = Buffer.from(str, "base64");

    // Extract IV and encrypted data
    const iv = combinedBuffer.slice(0, 12);
    const encryptedData = combinedBuffer.slice(12);

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(encryptedData.slice(-16)); // Authentication tag is the last 16 bytes

    const decryptedBuffer = Buffer.concat([
      decipher.update(encryptedData.slice(0, -16)),
      decipher.final(),
    ]);

    return decryptedBuffer.toString("utf8");
  }
}

export default EncoderDecoder;
