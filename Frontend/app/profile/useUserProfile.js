import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export default function useUserProfile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;
  const cloudinaryUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const [newCard, setNewCard] = useState({
    type: "",
    cardNumber: "",
    holderName: "",
    expiry: "",
  });

  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    number: "",
    pincode: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });

  const { user, token, setUser } = useUser();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditPayment = (id) => {
    setEditPaymentId(id);
  };

  const handleSavePayment = (id) => {
    setEditPaymentId(null);
  };

  // Upload avatar to Cloudinary
  const handleUploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryUploadPreset);
      formData.append('folder', 'user-avatars');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      toast.error('Failed to upload avatar');
      throw error;
    }
  };

  const handleProfileUpdate = async (name, email, avatar) => {
    try {
      const response = await axios.put(
        `${dbUri}/api/user/update`,
        {
          name,
          email,
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleChangePayment = (id, field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      paymentMethods: prevUser.paymentMethods.map((payment) =>
        payment._id === id ? { ...payment, [field]: value } : payment
      ),
    }));
  };

  const handleSubmitChangeCard = async (paymentMethod) => {
    try {
      const paymentMethodId = paymentMethod._id;
      const response = await axios.put(
        `${dbUri}/api/user/payment`,
        {
          paymentMethodId,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          paymentMethods: response.data.paymentMethods
        }));
      }
      handleSavePayment(paymentMethodId);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleEditAddress = (id) => {
    setEditAddressId(id);
  };

  const handleSaveAddress = (id) => {
    setEditAddressId(null);
  };

  const handleChangeAddress = (id, field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.map((address) =>
        address._id === id ? { ...address, [field]: value } : address
      ),
    }));
  };

  const handleSubmitEditAddress = async (address) => {
    try {
      const addressId = address._id;
      const response = await axios.put(
        `${dbUri}/api/user/address`,
        {
          addressId,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          addresses: response.data.addresses
        }));
      }
      handleSaveAddress();
      setEditAddressId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const response = await axios.put(
        `${dbUri}/api/user/address/set-default`,
        { addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          addresses: response.data.addresses
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`${dbUri}/api/user/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          addressId,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          addresses: response.data.addresses,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSetDefaultPayment = async (paymentMethodId) => {
    try {
      const response = await axios.put(
        `${dbUri}/api/user/payment/set-default`,
        { paymentMethodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          paymentMethods: response.data.paymentMethods
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteCard = async (paymentMethodId) => {
    try {
      const response = await axios.delete(`${dbUri}/api/user/payment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          paymentMethodId,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          paymentMethods: response.data.paymentMethods,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleAddCard = () => {
    setShowAddCardForm(true);
  };

  const handleNewCardChange = (field, value) => {
    setNewCard((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmitNewCard = async () => {
    try {
      const response = await axios.post(
        `${dbUri}/api/user/payment`,
        newCard,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          paymentMethods: response.data.paymentMethods
        }));
      }
      setShowAddCardForm(false);
      setNewCard({ type: "", cardNumber: "", holderName: "", expiry: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleAddAddress = () => {
    setShowAddAddressForm(true);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmitNewAddress = async () => {
    if (!newAddress.house || !newAddress.city || !newAddress.pincode) {
      toast.error("Please fill in required fields (House, City, Pincode)");
      return;
    }

    try {
      const addressToSubmit = {
        ...newAddress,
        type: newAddress.type || "Home",
      };

      const response = await axios.post(
        `${dbUri}/api/user/address`,
        addressToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          addresses: response.data.addresses,
        }));
      }
      setShowAddAddressForm(false);
      setNewAddress({
        type: "Home",
        name: "",
        number: "",
        pincode: "",
        house: "",
        area: "",
        city: "",
        state: "",
        landmark: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return {
    activeSection,
    setActiveSection,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    editMode,
    setEditMode,
    editPaymentId,
    setEditPaymentId,
    editAddressId,
    setEditAddressId,
    showAddCardForm,
    setShowAddCardForm,
    showAddAddressForm,
    setShowAddAddressForm,
    newCard,
    setNewCard,
    newAddress,
    setNewAddress,
    handleEdit,
    handleSave,
    handleChange,
    handleProfileUpdate,
    handleUploadAvatar,
    handleEditPayment,
    handleSavePayment,
    handleChangePayment,
    handleEditAddress,
    handleSaveAddress,
    handleChangeAddress,
    handleSetDefaultAddress,
    handleSetDefaultPayment,
    handleAddCard,
    handleNewCardChange,
    handleSubmitNewCard,
    handleAddAddress,
    handleNewAddressChange,
    handleSubmitNewAddress,
    handleSubmitEditAddress,
    handleDeleteAddress,
    handleSubmitChangeCard,
    handleDeleteCard
  };
}