import { useState, useEffect } from "react";

export default function useUserProfile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "",
    last4: "",
    expiry: "",
  });
  const [newAddress, setNewAddress] = useState({
    type: "",
    doorNo: "",
    pincode: "",
    addressLine1: "",
    address: "",
  });
  const [user, setUser] = useState({
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2023",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b60cb18d?w=200&h=200&fit=crop&crop=faces",
    membership: "Gold",
    orders: 24,
    spent: 3280,
    satisfaction: 4.9,
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Elegance Street, Beverly Hills, CA 90210",
      default: true,
    },
    {
      id: 2,
      type: "Office",
      address: "456 Business Avenue, Los Angeles, CA 90028",
      default: false,
    },
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
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...address, [field]: value } : address
      )
    );
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id
          ? { ...address, default: true }
          : { ...address, default: false }
      )
    );
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

  const handleSubmitNewAddress = () => {
    const id =
      addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      { ...newAddress, id, default: false },
    ]);
    setShowAddAddressForm(false);
    setNewAddress({
      type: "",
      doorNo: "",
      pincode: "",
      addressLine1: "",
      address: "",
    });
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
  };
}
