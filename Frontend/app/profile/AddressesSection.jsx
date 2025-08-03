export default function AddressesSection({
  addresses,
  editAddressId,
  showAddAddressForm,
  newAddress,
  handleEditAddress,
  handleSaveAddress,
  handleChangeAddress,
  handleSetDefaultAddress,
  handleAddAddress,
  handleNewAddressChange,
  handleSubmitNewAddress,
  setShowAddAddressForm,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Saved Addresses
            </h2>
            <p className="text-gray-600 text-sm">Manage your delivery locations</p>
          </div>
          <button
            onClick={handleAddAddress}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Add New
          </button>
        </div>
      </div>
      {showAddAddressForm && (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Address
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Type
              </label>
              <input
                type="text"
                value={newAddress.type}
                onChange={(e) => handleNewAddressChange("type", e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Door Number
              </label>
              <input
                type="text"
                value={newAddress.doorNo || ""}
                onChange={(e) =>
                  handleNewAddressChange("doorNo", e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={newAddress.pincode || ""}
                onChange={(e) =>
                  handleNewAddressChange("pincode", e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                value={newAddress.addressLine1 || ""}
                onChange={(e) =>
                  handleNewAddressChange("addressLine1", e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={newAddress.address}
                onChange={(e) =>
                  handleNewAddressChange("address", e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmitNewAddress}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
            <button
              onClick={() => setShowAddAddressForm(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-white rounded-lg shadow-sm p-4 border transition-shadow duration-200 ${
              editAddressId === address.id
                ? "border-rose-500 bg-rose-50"
                : "border-gray-100 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                {editAddressId === address.id ? (
                  <>
                    <input
                      type="text"
                      value={address.type}
                      onChange={(e) =>
                        handleChangeAddress(
                          address.id,
                          "type",
                          e.target.value
                        )
                      }
                      className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                    />
                    <textarea
                      value={address.address}
                      onChange={(e) =>
                        handleChangeAddress(
                          address.id,
                          "address",
                          e.target.value
                        )
                      }
                      className="mt-2 text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {address.type}
                    </h3>
                    {address.default && (
                      <span className="inline-block bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded mt-1">
                        Default
                      </span>
                    )}
                    <p className="mt-2 text-gray-600 text-sm">
                      {address.address}
                    </p>
                  </>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    editAddressId === address.id
                      ? handleSaveAddress(address.id)
                      : handleEditAddress(address.id)
                  }
                  className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  {editAddressId === address.id ? (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {!address.default && editAddressId === null && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleSetDefaultAddress(address.id)}
                  className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Set as Default
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
