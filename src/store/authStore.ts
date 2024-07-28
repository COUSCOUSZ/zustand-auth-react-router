import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState, RegisterData, User } from '../types/auth';
import api from '../api/axios';
import { setRefreshToken, removeTokens, getRefreshToken } from '../utils/tokenStorage';

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            lastFetchTime: null,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/jwt/create/', { email, password });
                    const { access, refresh } = response.data;
                    set({ accessToken: access, isLoading: false, error: null });
                    setRefreshToken(refresh); // todo Store refresh token in HttpOnly cookie
                    await get().fetchUserProfile();
                } catch (error) {
                    set({ error: 'Login failed', isLoading: false });
                }
                console.log("authStore.ts login");
            },

            register: async (userData: RegisterData) => {
                set({ isLoading: true, error: null });
                try {
                    await api.post('/auth/users/', userData);
                    set({ isLoading: false, error: null });
                    // Optionally auto-login after registration
                    await get().login(userData.email, userData.password);
                } catch (error) {
                    set({ error: 'Registration failed', isLoading: false });
                }
                console.log("authStore.ts register");
            },

            logout: async () => {
                removeTokens();
                set({ user: null, accessToken: null, error: null, lastFetchTime: null });
                console.warn("authStore.ts LOGOUT");
            },
            logoutBlacklisToken: async () => {
                const refreshToken = getRefreshToken();
                try {
                    const response = await api.post('/api/logout/', { refresh: refreshToken })
                    if (response.status === 205) {
                        removeTokens();
                        set({ user: null, accessToken: null, error: null, lastFetchTime: null });
                        console.warn("authStore.ts LOGOUT");
                    }
                }
                catch (error) {
                    console.error("authStore.ts logout error", error);
                }
            },


            fetchUserProfile: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get<User>('/auth/users/me/');
                    set({ user: response.data, isLoading: false, lastFetchTime: Date.now(), error: null });
                } catch (error) {
                    set({ error: 'Failed to fetch user profile', isLoading: false });
                }
                // console.log("authStore.ts fetchUserProfile /auth/users/me/");
            },
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
        }
    )
);

export default useAuthStore;