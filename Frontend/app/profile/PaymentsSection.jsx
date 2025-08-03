export default function PaymentsSection({
  payments,
  editPaymentId,
  showAddCardForm,
  newCard,
  handleEditPayment,
  handleSavePayment,
  handleChangePayment,
  handleSetDefaultPayment,
  handleAddCard,
  handleNewCardChange,
  handleSubmitNewCard,
  setShowAddCardForm,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Payment Methods
            </h2>
            <p className="text-gray-600 text-sm">Secure and encrypted payments</p>
          </div>
          <button
            onClick={handleAddCard}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Add Card
          </button>
        </div>
      </div>
      {showAddCardForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Add New Card
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Type
              </label>
              <input
                type="text"
                value={newCard.type}
                onChange={(e) => handleNewCardChange("type", e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last 4 Digits
              </label>
              <input
                type="text"
                value={newCard.last4}
                onChange={(e) => handleNewCardChange("last4", e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={newCard.expiry}
                onChange={(e) => handleNewCardChange("expiry", e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSubmitNewCard}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
            <button
              onClick={() => setShowAddCardForm(false)}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className={`bg-white rounded-lg shadow-sm p-4 border transition-shadow duration-200 ${
              editPaymentId === payment.id
                ? "border-rose-500 bg-rose-50"
                : "border-gray-100 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                  <span className="text-xs">
                    {payment.type === "Visa" ? "VISA" : "MC"}
                  </span>
                </div>
                <div>
                  {editPaymentId === payment.id ? (
                    <>
                      <input
                        type="text"
                        value={payment.type}
                        onChange={(e) =>
                          handleChangePayment(
                            payment.id,
                            "type",
                            e.target.value
                          )
                        }
                        className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={payment.last4}
                        onChange={(e) =>
                          handleChangePayment(
                            payment.id,
                            "last4",
                            e.target.value
                          )
                        }
                        className="ml-1 font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={payment.expiry}
                        onChange={(e) =>
                          handleChangePayment(
                            payment.id,
                            "expiry",
                            e.target.value
                          )
                        }
                        className="ml-1 text-xs text-gray-500 bg-transparent border-b border-gray-300 focus:outline-none"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {payment.type} •••• {payment.last4}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Expires {payment.expiry}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {payment.default && (
                  <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
                <button
                  onClick={() =>
                    editPaymentId === payment.id
                      ? handleSavePayment(payment.id)
                      : handleEditPayment(payment.id)
                  }
                  className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  {editPaymentId === payment.id ? (
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
            {!payment.default && editPaymentId === null && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleSetDefaultPayment(payment.id)}
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
