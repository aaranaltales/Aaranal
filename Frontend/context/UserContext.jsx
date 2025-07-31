"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "@/services/user";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(Cookies.get("token"));
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState({});
    const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Get user info & cart
    const fetchUser = async () => {
        try {
            if (!token) {
                setUser(null);
                return;
            }

            const res = await userDetails(token);
            if (res.success === true) {
                setUser(res.user);
                await getUserCart(); // ✅ Call after setting user
            } else {
                setUser(null);
                Cookies.remove("token");
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Get cart from backend
    const getUserCart = async () => {
        try {
            const response = await axios.post(
                `${dbUri}/api/cart/get`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                const cartData = response.data.cartData;
                setCartItems(cartData); // ✅ Will trigger useEffect to update cartCount
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Add item to cart
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);

        // Flat cart: { itemId: quantity }
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData); // ✅ Triggers cart count effect

        if (token) {
            try {
                const response = await axios.post(
                    `${dbUri}/api/cart/add`,
                    { itemId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success(response.data.message || "Item added to cart");
            } catch (error) {
                toast.error(error.message || "Error adding to cart");
                console.log(error);
            }
        } else {
            router.push("/auth");
        }
    };

    // Count total cart items
    const getCartCount = (cartData = cartItems) => {
        const totalCount = Object.values(cartData).reduce(
            (acc, qty) => acc + qty,
            0
        );
        setCartCount(totalCount);
    };

    // Auto update cart count when cart changes
    useEffect(() => {
        getCartCount();
    }, [cartItems]);

    // On first load
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                addToCart,
                cartCount,
                token,
                user,
                setUser,
                loading,
                cartItems,
                refreshUser: fetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
