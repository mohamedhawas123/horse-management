import CryptoJS from "crypto-js";

const TOKEN_KEY = "token";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const saveEncryptedToken = (token: string) => {
  if (!SECRET_KEY) throw new Error("SECRET_KEY is not defined");
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  localStorage.setItem(TOKEN_KEY, encrypted);
};

export const getDecryptedToken = (): string | null => {
  const encrypted = localStorage.getItem(TOKEN_KEY);
  if (!encrypted || !SECRET_KEY) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Failed to decrypt token", error);
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
