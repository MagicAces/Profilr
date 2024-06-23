import { Blob } from "buffer";

export const base64ToBuffer = (base64: string): Buffer => {
  const base64Str = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Str, "base64");
};

const bufferToBlob = (buffer: Buffer, mimeType: string): Blob => {
  return new Blob([buffer], { type: mimeType });
};

export default bufferToBlob;
