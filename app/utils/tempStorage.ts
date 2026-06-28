// lib/tempStorage.ts

export const tempStorage = {
  savePhoto: (key: string, base64: string) => {
    localStorage.setItem(key, base64);
  },

  getPhoto: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  clearPhoto: (key: string) => {
    localStorage.removeItem(key);
  },

  saveForm: <T>(keyForm: string, data: T) => {
    localStorage.setItem(keyForm, JSON.stringify(data));
  },

  getForm: <T>(keyForm: string): T | null => {
    const item = localStorage.getItem(keyForm);
    return item ? JSON.parse(item) : null;
  },

  clearForm: (keyForm: string) => {
    localStorage.removeItem(keyForm);
  },

  // clearAll: () => {
  //   Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  // },
};
