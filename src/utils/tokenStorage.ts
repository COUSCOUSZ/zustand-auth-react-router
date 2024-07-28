import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const setAccessToken = (token: string) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = () => {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setRefreshToken = (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 1 });
};

export const getRefreshToken = () => {
    return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
    // sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
};
