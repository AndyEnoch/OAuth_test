import { sha256 } from "js-sha256";

const generateRandomString = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const base64UrlEncode = (input: string) => {
  return input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const generateCodeVerifier = () => {
  return generateRandomString(128);
};

export const generateCodeChallenge = async (verifier: string) => {
  const hashed = sha256.arrayBuffer(verifier);

  let binary = "";
  const bytes = new Uint8Array(hashed);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  const base64Encoded = btoa(binary);
  return base64UrlEncode(base64Encoded);
};
