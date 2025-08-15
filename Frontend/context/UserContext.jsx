"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "@/services/user";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getProductsData } from "@/services/products";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
                await getUserCart();
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

    const updateQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(dbUri + '/api/cart/update', { itemId, quantity }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const productId in cartItems) {
            const itemInfo = allProducts.find((product) => product._id === productId);
            const quantity = cartItems[productId];

            if (itemInfo && quantity > 0) {
                totalAmount += itemInfo.price * quantity;
            }
        }

        return totalAmount;
    };

    const fetchProducts = async () => {
        setAllProducts(await getProductsData())
    }

    const refreshUser = () => {
        setToken(Cookies.get("token"))
        fetchUser();
    }

    const getUserAddresses = async () => {
        const response = await axios.get(`${dbUri}/api/user/addresses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setAddresses(response.data.addresses);
    }

    // Auto update cart count when cart changes
    useEffect(() => {
        getCartCount();
    }, [cartItems]);

    // On first load
    useEffect(() => {
        fetchUser();
        fetchProducts();
        getUserWishlist();
        getUserWishlist();
    }, []);

    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, [token])

    useEffect(() => {
        if (allProducts.length > 0) {
            const tempData = [];

            for (const productId in cartItems) {
                const product = allProducts.find(p => p._id === productId);
                if (product && cartItems[productId] > 0) {
                    tempData.push({
                        ...product,
                        quantity: cartItems[productId],
                    });
                }
            }

            setCartData(tempData);
        }
    }, [cartItems, allProducts]);

    const getUserWishlist = async () => {
        if (!token) return;

        try {
            const response = await axios.post(
                `${dbUri}/api/wishlist/get`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {

                setWishlistCount(response.data.wishlist.length)
                setWishlist(response.data.wishlist);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist");
        }
    };

    const toggleWishlist = async (itemId) => {
        if (!token) {
            router.push("/auth");
            return;
        }

        try {
            const response = await axios.post(
                `${dbUri}/api/wishlist/update`,
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setWishlistCount(response.data.wishList.length)
                setWishlist(response.data.wishList || []);
                // toast.success(`Item ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
            toast.error("Could not update wishlist");
        }
    };

    useEffect(() => {
        if (allProducts.length > 0 && wishlist.length > 0) {
            const tempData = wishlist
                .map((productId) => allProducts.find((p) => p._id === productId))
                .filter((p) => p); // Remove undefined in case product not found
            setWishlistCount(tempData.length)
            setWishlistData(tempData);
        } else {
            setWishlistData([]);
        }
    }, [wishlist, allProducts]);







    return (
        <UserContext.Provider
            value={{
                wishlistCount,
                wishlist,
                wishlistData,
                toggleWishlist,
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
                loading,
                cartItems,
                refreshUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
