"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "@/services/user";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getProductsData } from "@/services/products";
import { useLoading } from "./LoadingContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter();
    const { setLoading } = useLoading();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get("token"));
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState({});
    const [cartData, setCartData] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistData, setWishlistData] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);

    const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;
    const shipping = 25;

    // --- API FUNCTIONS ---------------------------------------------------

    const fetchUser = async () => {
        try {
            if (!token) {
                setUser(null);
                return;
            }
            const res = await userDetails(token);
            if (res.success) {
                setUser(res.user);
                await getUserCart();
            } else {
                Cookies.remove("token");
                setUser(null);
            }
        } catch (error) {
            setUser(null);
            console.log(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getProductsData(setLoading);
            setAllProducts(data || []);
        } catch (err) { }
    };

    const getUserCart = async () => {
        try {
            const response = await axios.post(
                `${dbUri}/api/cart/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                const cartData = response.data.cartData;
                setCartItems(cartData);
                return cartData;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    const getUserWishlist = async () => {
        if (!token) return;

        try {
            const response = await axios.post(
                `${dbUri}/api/wishlist/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setWishlist(response.data.wishlist);
                setWishlistCount(response.data.wishlist.length);
            } else throw new Error(response.data.message);
        } catch (error) {
            toast.error("Failed to load wishlist");
        }
    };

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);

        if (!token) {
            router.push("/auth");
            return;
        }

        try {
            await axios.post(
                `${dbUri}/api/cart/add`,
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Item added to cart");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        let temp = structuredClone(cartItems);
        temp[itemId] = quantity;
        setCartItems(temp);

        if (token) {
            try {
                await axios.post(
                    `${dbUri}/api/cart/update`,
                    { itemId, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const toggleWishlist = async (itemId) => {
        if (!token) return router.push("/auth");

        try {
            const response = await axios.post(
                `${dbUri}/api/wishlist/update`,
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setWishlist(response.data.wishList || []);
                setWishlistCount(response.data.wishList.length);
            }
        } catch (error) {
            toast.error("Could not update wishlist");
        }
    };

    const refreshUser = () => {
        setToken(Cookies.get("token"));
    };

    // --- CALCULATION FUNCTIONS ------------------------------------------

    const getCartAmount = () => {
        let total = 0;
        for (const productId in cartItems) {
            const prod = allProducts.find((p) => p._id === productId);
            if (prod && cartItems[productId] > 0) {
                total += prod.price * cartItems[productId];
            }
        }
        return total;
    };

    const getCartCount = (input = cartItems) => {
        const totalCount = Object.values(input).reduce((a, q) => a + q, 0);
        setCartCount(totalCount);
    };

    // --- USE EFFECTS -----------------------------------------------------

    // Wrapped loader for user + products + wishlist + addresses
    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            await fetchUser();
            await fetchProducts();
            await getUserWishlist();
            setLoading(false);
        };
        loadAll();
    }, [token]);

    useEffect(() => {
        getCartCount();
    }, [cartItems]);

    useEffect(() => {
        // prepare cartData from cartItems + allProducts
        if (allProducts.length > 0) {
            const temp = [];
            for (const id in cartItems) {
                const p = allProducts.find((pr) => pr._id === id);
                if (p && cartItems[id] > 0) {
                    temp.push({ ...p, quantity: cartItems[id] });
                }
            }
            setCartData(temp);
        }
    }, [cartItems, allProducts]);

    useEffect(() => {
        if (allProducts.length > 0 && wishlist.length > 0) {
            const temp = wishlist
                .map((id) => allProducts.find((p) => p._id === id))
                .filter(Boolean);
            setWishlistData(temp);
        } else {
            setWishlistData([]);
        }
    }, [wishlist, allProducts]);

    // ---------------------------------------------------------------------

    return (
        <UserContext.Provider
            value={{
                wishlistCount,
                wishlist,
                wishlistData,
                toggleWishlist,
                setCartCount,
                setCartData,
                cartData,
                shipping,
                getCartAmount,
                updateQuantity,
                addToCart,
                cartCount,
                token,
                user,
                setUser,
                cartItems,
                setCartItems,
                refreshUser,
                getUserCart,
                fetchProducts,
                fetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
