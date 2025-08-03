import AddressForm from "./AddressForm";
import { AiOutlineDelete } from "react-icons/ai";

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
  handleSubmitEditAddress,
  setShowAddAddressForm,
  handleDeleteAddress,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Saved Addresses</h2>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Address</h3>
          <AddressForm
            addressData={newAddress}
            onChange={handleNewAddressChange}
            onSubmit={handleSubmitNewAddress}
            onCancel={() => setShowAddAddressForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white rounded-lg shadow-sm p-4 border transition-shadow duration-200 ${editAddressId === address._id
                ? "bg-rose-50"
                : "border-gray-100 hover:shadow-md"
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  {editAddressId === address._id ? (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Address</h3>
                      <AddressForm
                        addressData={address}
                        onChange={(field, value) =>
                          handleChangeAddress(address._id, field, value)
                        }
                        onSubmit={() => handleSubmitEditAddress(address)}
                        onCancel={handleSaveAddress}
                      />
                    </div>
                  ) : (
                    <>
                      {address.default && (
                        <span className="inline-block mb-1 bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded mt-1">
                          Default
                        </span>
                      )}
                      <h3 className="font-bold ml-1 text-gray-900 text-sm">{address.name}</h3>
                      <h3 className="font- ml-1 text-gray-900 text-sm">{address.number}</h3>
                      <p className="text-gray-600 text-sm ml-1">
                        {address.house} {address.area} {address.city} {address.state}{" "}
                        {address.pincode}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      editAddressId === address._id
                        ? handleSaveAddress(address._id)
                        : handleEditAddress(address._id)
                    }
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    {editAddressId !== address._id && (
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
                  <button onClick={() => handleDeleteAddress(address._id)}><AiOutlineDelete className="text-red-600" /></button>
                </div>
              </div>

              {!address.default && editAddressId === null && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleSetDefaultAddress(address._id)}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Set as Default
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-sm">No saved addresses found</div>
        )}
      </div>
    </div>
  );
}
