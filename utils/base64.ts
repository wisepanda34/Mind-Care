// utils/codeBase64.ts 

export function codeBase64(data: object): string {
  return btoa(JSON.stringify(data));
}

export function decodeBase64(str: string): any | null {
  try {
    return JSON.parse(atob(str));
  } catch (error) {
    console.error("Ошибка при декодировании Base64:", error);
    return null;
  }
}
