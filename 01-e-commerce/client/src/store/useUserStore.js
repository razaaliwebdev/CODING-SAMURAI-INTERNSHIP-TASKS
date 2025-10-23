import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { toast } from 'react-hot-toast';


export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,


    checkUser: async () => {
        set({ checkingAuth: true })
        try {
            const response = await axiosInstance.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
            return true;
        } catch (error) {
            set({ checkingAuth: false, user: null });
            return false;
        }
    },

    // Signup
    signup: async ({ name, email, password, confirmPassword }) => {

        set({ loading: true });

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            set({ loading: false });
            return false;
        };

        try {
            const response = await axiosInstance.post("/auth/signup", { name, email, password });
            set({ user: response.data.user, loading: false });
            toast.success(`${response.data.message || 'Signup successful'}!`);
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Network error or unknown failure.";
            toast.error(message);
            set({ loading: false });
            return false;
        }
    },

    // Login
    login: async ({ email, password }) => {

        set({ loading: true });
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            set({ user: response.data.user, loading: false });
            toast.success(`Welcome ${response.data.user.name || 'User'}! You have logged in successfully.`);
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Network error or unknown failure.";
            toast.error(message);
            set({ loading: false });
            return false;
        }
    },

    // Logout
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ user: null });
            toast.success("You have logged out successfully.");
        } catch (error) {
            const message = error.response?.data?.message || "Network error or unknown failure.";
            toast.error(message);
        }
    },
}));
