export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read the Blob as base64"));
      }
    };
    reader.readAsDataURL(blob);
  });
};

export function convertISOToCustomFormat(isoDateStr: string): string {
  const date = new Date(isoDateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const pad = (number: number) => (number < 10 ? `0${number}` : number);

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const year = date.getFullYear();

  let hours: any = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 hours)
  hours = pad(hours);

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}
