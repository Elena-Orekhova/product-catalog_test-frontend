export const localStorageHelper = {
  saving: <T>(key: string, data: T) =>
    localStorage.setItem(key, JSON.stringify(data)),
  loading: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  removing: (key: string) => localStorage.removeItem(key),
};
