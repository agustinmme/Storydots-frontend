

const TOKEN_KEY = "API_TOKEN";

export const setTokenLocal = (token) => localStorage.setItem(TOKEN_KEY,token);

export const getTokenLocal = () => localStorage.getItem(TOKEN_KEY);

export const deleteTokenLocal = () => localStorage.removeItem(TOKEN_KEY);

