import { RiVipCrownFill } from "react-icons/ri";

export default function ProfileSection({
  user,
  editMode,
  handleEdit,
  handleSave,
  handleChange,
}) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full p-2 shadow-lg">
              <RiVipCrownFill className="w-5 h-5" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {user.name}
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-rose-700 shadow-sm">
                {user.membership} Member
              </span>
              <span className="text-sm text-gray-600">
                Member since {user.joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h3>
          <button
            onClick={editMode ? handleSave : handleEdit}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg whitespace-nowrap"
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
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name
            </label>
            <div
              className={`bg-gray-50 border rounded-xl px-4 py-4 transition-colors ${
                editMode
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="text-gray-900 font-medium">{user.name}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <div
              className={`bg-gray-50 border rounded-xl px-4 py-4 transition-colors ${
                editMode
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="text-gray-900 font-medium">{user.email}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Phone Number
            </label>
            <div
              className={`bg-gray-50 border rounded-xl px-4 py-4 transition-colors ${
                editMode
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="text-gray-900 font-medium">{user.phone}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Member Since
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 hover:border-gray-300 transition-colors">
              <p className="text-gray-900 font-medium">{user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
