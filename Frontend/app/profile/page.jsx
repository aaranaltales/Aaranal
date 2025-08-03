"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import AddressesSection from "./AddressesSection";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import OrdersSection from "./OrdersSection";
import PaymentsSection from "./PaymentsSection";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";
import UserProfileHeader from "./UserProfileHeader";
import useUserProfile from "./useUserProfile";


export default function UserProfile() {
  const {
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
  } = useUserProfile();

  if (!user) {
    return <Loading />
  }

  return (
    <div>
      <Header />
      <div className="bg-white pt-10 sm:pt-0">
        <style jsx global>{`
        @media (max-width: 767px) {
          .text-xl {
            font-size: 1.25rem !important;
          }
          .text-2xl {
            font-size: 1.5rem !important;
          }
          .text-3xl {
            font-size: 1.75rem !important;
          }
          .text-sm {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
        {/* Mobile Header */}
        {isMobile && (
          <div className="fixed top-16 left-0 w-full z-50">
            <UserProfileHeader
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar - Desktop */}
            {!isMobile && (
              <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
            )}
            {/* Sidebar - Mobile */}
            {isMobile && (
              <MobileNavbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            )}
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {activeSection === "profile" && (
                <ProfileSection
                  user={user}
                  editMode={editMode}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  handleChange={handleChange}
                />
              )}
              {activeSection === "addresses" && (
                <AddressesSection
                  addresses={user.addresses}
                  editAddressId={editAddressId}
                  showAddAddressForm={showAddAddressForm}
                  newAddress={newAddress}
                  handleEditAddress={handleEditAddress}
                  handleSaveAddress={handleSaveAddress}
                  handleChangeAddress={handleChangeAddress}
                  handleSetDefaultAddress={handleSetDefaultAddress}
                  handleAddAddress={handleAddAddress}
                  handleNewAddressChange={handleNewAddressChange}
                  handleSubmitNewAddress={handleSubmitNewAddress}
                  setShowAddAddressForm={setShowAddAddressForm}
                  handleSubmitEditAddress={handleSubmitEditAddress}
                  handleDeleteAddress={handleDeleteAddress}
                />
              )}
              {activeSection === "payments" && (
                <PaymentsSection
                  payments={payments}
                  editPaymentId={editPaymentId}
                  showAddCardForm={showAddCardForm}
                  newCard={newCard}
                  handleEditPayment={handleEditPayment}
                  handleSavePayment={handleSavePayment}
                  handleChangePayment={handleChangePayment}
                  handleSetDefaultPayment={handleSetDefaultPayment}
                  handleAddCard={handleAddCard}
                  handleNewCardChange={handleNewCardChange}
                  handleSubmitNewCard={handleSubmitNewCard}
                  setShowAddCardForm={setShowAddCardForm}
                />
              )}
              {activeSection === "orders" && <OrdersSection orders={orders} />}
              {activeSection === "settings" && <SettingsSection />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
