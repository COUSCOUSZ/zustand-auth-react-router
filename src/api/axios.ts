import axios from 'axios';
import useAuthStore from '../store/authStore';
import { getRefreshToken, } from '../utils/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
    baseURL: BASE_URL,
});

// *note - I'm using a separate instance for the refresh token request since using the same instance will create a loop in case of refresh token expiry (401)
// Original Request (401) -> Interceptor -> Refresh Request (401) -> Interceptor -> Refresh Request (401) -> ...
const refreshApi = axios.create({
    baseURL: BASE_URL,
});

/* -------------------------------------------------------------------------- */
/*                    // Authorization header interceptor                    */
/* -------------------------------------------------------------------------- */
api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
        config.headers['Authorization'] = `JWT ${accessToken}`;
    }
    return config;
});

/* -------------------------------------------------------------------------- */
/*           // Response interceptor to refresh the access token & logout if the refresh is expired          */
/* -------------------------------------------------------------------------- */
api.interceptors.response.use(
    (response) => { return response },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.warn("TRY")
                // Attempt to refresh the token
                const refreshToken = getRefreshToken();
                // console.warn(`getRefreshToken(${refreshToken})`)
                const response = await refreshApi.post(`/auth/jwt/refresh/`, { refresh: refreshToken });
                const { access } = response.data;
                // console.warn("new access token", access)
                // Save the new token & update the header
                useAuthStore.setState({ accessToken: access });
                originalRequest.headers['Authorization'] = `JWT ${access}`;
                // Retry the original request with the new token
                return api(originalRequest);
            } catch (refreshError) {
                // refreshToken failed -> logout
                console.warn("CATCH")
                //* refresh token has already been expired -> logout directly
                useAuthStore.getState().logout();
                window.location.reload();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;