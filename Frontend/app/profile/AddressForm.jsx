export default function AddressForm({ addressData, onChange, onSubmit, onCancel }) {
    const handleChange = (field) => (e) => {
        onChange(field, e.target.value);
    };

    const fields = [
        { label: "Address Type", field: "type" },
        { label: "Full Name", field: "name" },
        { label: "Mobile Number", field: "number", type: "number" },
        { label: "Flat, House no., Building, Company, Apartment", field: "house" },
        { label: "Area, Street, Sector, Village", field: "area" },
        { label: "Landmark", field: "landmark" },
        { label: "Town / City", field: "city" },
        { label: "Pincode", field: "pincode" },
        { label: "State", field: "state" },
    ];

    return (
        <div className="grid grid-cols-1 gap-4">
            {fields.map(({ label, field, type = "text" }) => (
                <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                    <input
                        type={type}
                        value={addressData[field] || ""}
                        onChange={handleChange(field)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    />
                </div>
            ))}

            <div className="flex gap-2 mt-4">
                <button
                    onClick={onSubmit}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Submit
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
