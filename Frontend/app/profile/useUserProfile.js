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

  const [newCard, setNewCard] = useState({
    type: "",
    cardNumber: "",
    holderName: "",
    expiry: "",
  });

  const [newAddress, setNewAddress] = useState({
    type: "",
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

  const [orders] = useState([
    {
      id: "#ORD-2024-001",
      date: "Jan 15, 2024",
      items: 2,
      total: "$485.00",
      status: "Delivered",
    },
    {
      id: "#ORD-2024-002",
      date: "Jan 8, 2024",
      items: 1,
      total: "$185.00",
      status: "Shipped",
    },
  ]);

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

  const handleProfileUpdate = async (name, email) => {
    try {
      const response = await axios.put(
        `${dbUri}/api/user/update`,
        {
          name,
          email,
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
          eamil: response.data.user.email,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

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
      toast.error(error.message);
    }
  }

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
    } catch (error) {
      toast.error(error.message);
    }
  }

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
      toast.error(error.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`${dbUri}/api/user/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          addressId, // include the ID here
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
      toast.error(error.message);
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
  }

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
      setNewCard({ type: "", last4: "", expiry: "" });
    } catch (error) {
      toast.error(error.message);
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

      const token = localStorage.getItem("token");
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
    orders,
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
