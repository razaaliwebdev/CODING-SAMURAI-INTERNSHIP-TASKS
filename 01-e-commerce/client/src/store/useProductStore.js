import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { toast } from 'react-hot-toast';


export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    loading: false,


    // Create Product
    createProduct: async (productData) => {
        set({ loading: true });

        try {
            const response = await axiosInstance.post("/products", productData);

            set((prevState) => ({
                products: [...prevState.products, response.data],
                loading: false
            }))

            toast.success(response.data.message);

        } catch (error) {
            const message = error.response?.data?.message;
            toast.error(message);
            set({ loading: false });
            return false;
        }

    },

    // Get All Products
    getAllProducts: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get("/products");
            set({ products: response.data, loading: false });
            return true;
        } catch (error) {
            const message = error.response?.data?.message;
            toast.error(message);
            set({ loading: false });
            return false;
        }
    },

    // Delete Product
    deleteProduct: async (id) => {
        try {
            const response = await axiosInstance.delete(`/products/${id}`);
            toast.success(response.data.message);
            return true;
        } catch (error) {
            const message = error.response?.data?.message;
            toast.error(message);
            return false;
        }
    },

    // Toggle Featured Product
    toggleFeaturedProduct: async (id) => {
        try {
            const response = await axiosInstance.patch(`/products/${id}`);
            toast.success(response.data.message);
            return true;
        } catch (error) {
            const message = error.response?.data?.message;
            toast.error(message);
            return false;
        }
    },

}))

