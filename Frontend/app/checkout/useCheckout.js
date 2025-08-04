import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

export default function useCheckout() {
    const { user, setUser, token, cartData } = useUser();
    const [currentStep, setCurrentStep] = useState(1);
    const [showAddressSelector, setShowAddressSelector] = useState(false);
    const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: user?.addresses?.find(addr => addr.default)?.name || '',
        number: user?.addresses?.find(addr => addr.default)?.number || '',
        house: user?.addresses?.find(addr => addr.default)?.house || '',
        area: user?.addresses?.find(addr => addr.default)?.area || '',
        landmark: user?.addresses?.find(addr => addr.default)?.landmark || '',
        pincode: user?.addresses?.find(addr => addr.default)?.pincode || '',
        city: user?.addresses?.find(addr => addr.default)?.city || '',
        state: user?.addresses?.find(addr => addr.default)?.state || '',
        shippingMethod: 'standard',
        saveAddress: false
    });

    // 🧮 CALCULATIONS
    const subtotal = useMemo(() => {
        return cartData?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    }, [cartData]);

    const shipping = formData.shippingMethod === "express" ? 45 : 25;
    const tax = Math.round(subtotal * 0.21);
    const total = subtotal + shipping + tax;

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            name: user?.addresses?.find(addr => addr.default)?.name || '',
            number: user?.addresses?.find(addr => addr.default)?.number || '',
            house: user?.addresses?.find(addr => addr.default)?.house || '',
            area: user?.addresses?.find(addr => addr.default)?.area || '',
            landmark: user?.addresses?.find(addr => addr.default)?.landmark || '',
            pincode: user?.addresses?.find(addr => addr.default)?.pincode || '',
            city: user?.addresses?.find(addr => addr.default)?.city || '',
            state: user?.addresses?.find(addr => addr.default)?.state || '',
            shippingMethod: 'standard',
            saveAddress: false
        }));
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const selectAddress = (address) => {
        setFormData(prev => ({
            ...prev,
            name: address.name,
            number: address.number,
            house: address.house,
            area: address.area,
            landmark: address.landmark,
            pincode: address.pincode,
            city: address.city,
            state: address.state
        }));
        setShowAddressSelector(false);
    };

    const handleSubmitNewAddress = async (newAddress) => {
        try {
            const response = await axios.post(
                `${dbUri}/api/user/address`,
                newAddress,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    addresses: response.data.addresses
                }));
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            console.log('Form submitted');
        }
    };

    return {
        formData,
        setFormData,
        showAddressSelector,
        setShowAddressSelector,
        selectAddress,
        handleChange,
        handleSubmit,
        user,
        currentStep,
        setCurrentStep,
        subtotal,
        shipping,
        tax,
        total,
    };
}
