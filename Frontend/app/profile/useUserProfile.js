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
    last4: "",
    expiry: "",
  });
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "Sanket yelugotla",
    number: "9550572255",
    pincode: "530018",
    house: "38-30-208",
    area: "Green gardens, Marripalem",
    landmark: "Neat water tank",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
  });
  const { user, token, setUser } = useUser();
  const [addresses, setAddresses] = useState([

  ]);
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4567",
      expiry: "12/26",
      default: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8901",
      expiry: "08/25",
      default: false,
    },
  ]);
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

  const handleChangePayment = (id, field, value) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, [field]: value } : payment
      )
    );
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
        toast.success("Address changed successfullly");
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


  const handleSetDefaultPayment = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id
          ? { ...payment, default: true }
          : { ...payment, default: false }
      )
    );
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

  const handleSubmitNewCard = () => {
    const id =
      payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 1;
    setPayments((prevPayments) => [
      ...prevPayments,
      { ...newCard, id, default: false },
    ]);
    setShowAddCardForm(false);
    setNewCard({ type: "", last4: "", expiry: "" });
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
        toast.success(response.data.message);
        setUser((prevUser) => ({
          ...prevUser,
          addresses: response.data.addresses
        }));
      }

      setShowAddAddressForm(false);
      setNewAddress({
        type: "",
        doorNo: "",
        pincode: "",
        addressLine1: "",
        address: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    activeSection,
    setActiveSection,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    addresses,
    payments,
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
  };
}
