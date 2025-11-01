import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    loading: false,
    total: 0,
    subTotal: 0,
    isCouponApplied: false,

    // ➤ Fetch cart from server
    getCartItems: async () => {
        try {
            const res = await axiosInstance.get("/cart");
            set({
                cart: res.data.cart,
                subTotal: res.data.subTotal,
                total: res.data.total,
            });
            get().calculateTotal();
        } catch (error) {
            console.error("Error fetching cart:", error);
            set({ cart: [] });
            const message = error.response?.data?.message || "Failed to fetch cart.";
            toast.error(message);
        }
    },

    // ➤ Add product to cart
    addToCart: async (product) => {
        try {
            const res = await axiosInstance.post("/cart", { productId: product._id });
            toast.success(res.data.message || "Product added to cart");

            // ⚡ Directly update from server response
            set({ cart: res.data.cartItems });
            get().calculateTotal();
        } catch (error) {
            console.error("Add to cart error:", error);
            const message =
                error.response?.data?.message || "Failed to add product to cart.";
            toast.error(message);
        }
    },

    // Remove from the Cart
    removeFromCart: async (productId) => {

        await axiosInstance.delete(`/cart/`, { data: { productId } });
        set((prevState) => ({ cart: prevState.cart.filter(item => item._id !== productId) }));
        get().calculateTotal();

    },

    // Update Quantity
    updateQuantity: async (productId, quantity) => {
        try {
            if (quantity === 0) {
                get().removeFromCart(productId);
                return;
            }

            const res = await axiosInstance.put(`/cart/${productId}`, { quantity });

            set({
                cart: res.data.cartItems, // ✅ Sync with backend response
            });

            get().calculateTotal();
        } catch (error) {
            console.error("Error updating quantity:", error);
            const message =
                error.response?.data?.message || "Failed to update quantity.";
            toast.error(message);
        }
    },


    // ➤ Calculate totals
    calculateTotal: () => {
        const { cart, coupon } = get();
        const subTotal = cart.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
        let total = subTotal;

        if (coupon) {
            const discount = subTotal * (coupon.discount / 100);
            total = subTotal - discount;
        }

        set({ subTotal, total });
    },

    clearCart: async () => {
        try {
            // Clear cart on the server using the correct endpoint with empty body
            await axiosInstance.delete('/cart', { data: {} });
            // Reset local state
            set({ 
                cart: [], 
                coupon: null, 
                total: 0, 
                subTotal: 0,
                isCouponApplied: false 
            });
        } catch (error) {
            console.error("Error clearing cart:", error);
            const message = error.response?.data?.message || "Failed to clear cart.";
            toast.error(message);
        }
    },
}));



