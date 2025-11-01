import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    checkUser: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axiosInstance.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
            return true;
        } catch (error) {
            set({ checkingAuth: false, user: null });
            return false;
        }
    },

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            set({ loading: false });
            return false;
        }
        try {
            const response = await axiosInstance.post("/auth/signup", { name, email, password });
            set({ user: response.data.user, loading: false });
            toast.success(response.data.message || "Signup successful!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            set({ loading: false });
            return false;
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            set({ user: response.data.user, loading: false });
            toast.success(`Welcome ${response.data.user.name || "User"}!`);
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            set({ loading: false });
            return false;
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ user: null });
            toast.success("Logged out successfully.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    refreshToken: async () => {
        if (get().checkingAuth) return;
        set({ checkingAuth: true });
        try {
            const response = await axiosInstance.post("/auth/refresh-token");
            set({ checkingAuth: false });
            return response.data;
        } catch (error) {
            set({ user: null, checkingAuth: false });
            throw error;
        }
    },
}));

// ✅ Axios Interceptor
let refreshPromise = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (refreshPromise) {
                    await refreshPromise;
                    return axiosInstance(originalRequest);
                }

                refreshPromise = useUserStore.getState().refreshToken();
                await refreshPromise;
                refreshPromise = null;

                return axiosInstance(originalRequest);
            } catch (err) {
                useUserStore.getState().logout();
            }
        }

        return Promise.reject(error);
    }
);

