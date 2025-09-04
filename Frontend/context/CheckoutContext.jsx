// context/CheckoutContext.js
'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/components/ToastContext"; // Import useToast

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
    const { user, setUser, token, cartData } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const { setLoading } = useLoading();
    const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [currentStep, setCurrentStep] = useState(1);
    const [showAddressSelector, setShowAddressSelector] = useState(false);
    const [showCardSelector, setShowCardSelector] = useState(false);
    const { showSuccess, showError } = useToast();


    const [formData, setFormData] = useState({
        name: '',
        number: '',
        house: '',
        area: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
        shippingMethod: 'standard',
        saveAddress: false,
    });

    const [paymentData, setPaymentData] = useState({
        type: "",
        cardNumber: "",
        holderName: "",
        cvv: "",
        expiry: "",
        savePayment: false
    });

    // get default address/payment
    useEffect(() => {
        const defaultAddress = user?.addresses?.find(addr => addr.default);
        if (defaultAddress) {
            setFormData(prev => ({
                ...prev,
                ...defaultAddress,
                shippingMethod: 'standard',
                saveAddress: false,
            }));
        }
        const defaultPayment = user?.paymentMethods?.find(payment => payment.default)
        if (defaultPayment) {
            setPaymentData(prev => ({
                ...prev,
                ...defaultPayment,
                savePayment: false,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCardChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    };

    const selectAddress = (address) => {
        setFormData(prev => ({
            ...prev,
            ...address
        }));
        setShowAddressSelector(false);
    };

    // ✅ <--- Wrapped with global loading context
    const handleSubmitNewAddress = async (newAddress) => {
        if (!token) {
            showError("Please login to continue");
            router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
            return
        }
        try {
            setLoading(true);
            const response = await axios.post(`${dbUri}/api/user/address`, newAddress, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 401) {
                router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
            }
            if (response.data.success) {
                showSuccess(response.data.message)
                setUser(prev => ({
                    ...prev,
                    addresses: response.data.addresses,
                }));
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            if (formData.saveAddress) {
                handleSubmitNewAddress({
                    name: formData.name,
                    number: formData.number,
                    house: formData.house,
                    area: formData.area,
                    landmark: formData.landmark,
                    pincode: formData.pincode,
                    city: formData.city,
                    state: formData.state,
                });
            }
        }
    };

    const subtotal = useMemo(() => {
        return cartData?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    }, [cartData]);

    const shipping = formData.shippingMethod === "express" ? 45 : 0;
    const total = subtotal + shipping;

    const value = {
        user,
        formData,
        setFormData,
        showAddressSelector,
        setShowAddressSelector,
        selectAddress,
        handleChange,
        handleSubmit,
        currentStep,
        setCurrentStep,
        subtotal,
        shipping,
        total,
        paymentData,
        setPaymentData,
        showCardSelector,
        setShowCardSelector,
        selectCard: (card) => {
            setPaymentData(prev => ({ ...prev, ...card }));
            setShowCardSelector(false);
        },
        handleCardChange
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckoutContext = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error("useCheckoutContext must be used within a CheckoutProvider");
    }
    return context;
};
