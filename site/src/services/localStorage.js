export const setLocalStorage = (key, value) => {
  if (key && value) localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => key && JSON.parse(localStorage.getItem(key));

export const removeLocalStorage = (key) => key && localStorage.removeItem(key);
