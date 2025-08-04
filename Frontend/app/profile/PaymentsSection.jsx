import CardForm from './CardForm';
import { AiOutlineDelete } from "react-icons/ai";

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
  handleSubmitChangeCard,
  handleDeleteCard
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
        <CardForm
          card={newCard}
          onChange={handleNewCardChange}
          onSubmit={handleSubmitNewCard}
          onCancel={() => setShowAddCardForm(false)}
          submitLabel="Add"
        />
      )}

      <div className="space-y-4">
        {payments.length > 0 ? payments.map((payment) => (
          <div
            key={payment._id}
            className={`bg-white rounded-lg shadow-sm p-4 border transition-shadow duration-200 ${editPaymentId === payment._id
              ? "border-gray-100 bg-rose-50"
              : "border-gray-100 hover:shadow-md"
              }`}
          >
            <div className={`${editPaymentId !== payment._id ? "flex justify-between items-start" : ""}`}>
              <div className="flex items-center gap-3">
                {editPaymentId !== payment._id && (
                  <div className="w-10 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                    <span className="text-xs">
                      {payment.type === "Visa" ? "VISA" : "MC"}
                    </span>
                  </div>
                )}
                <div className="w-full">
                  {editPaymentId === payment._id ? (
                    <CardForm
                      card={payment}
                      onChange={(field, value) =>
                        handleChangePayment(payment._id, field, value)
                      }
                      onSubmit={() => handleSubmitChangeCard(payment)}
                      onCancel={() => handleSavePayment(payment._id)}
                      submitLabel="Update"
                    />
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

              {editPaymentId !== payment._id && (
                <div className="flex items-center justify-center gap-2 ml-2">
                  {!payment.default && (
                    <button
                      onClick={() => handleSetDefaultPayment(payment._id)}
                      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() =>
                      editPaymentId === payment._id
                        ? handleSavePayment(payment._id)
                        : handleEditPayment(payment._id)
                    }
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <svg
                      className="w-4 h-4"
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
                  </button>
                  <button
                    onClick={() => handleDeleteCard(payment``._id)}
                  >
                    <AiOutlineDelete className="text-red-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <p className="text-gray-600 ml-4">No Saved payment methods</p>
        )}
      </div>
    </div>
  );
}
