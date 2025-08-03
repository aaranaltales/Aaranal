export default function SettingsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Account Settings
        </h2>
        <p className="text-gray-600 text-sm">Customize your experience</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div>
              <p className="font-medium text-gray-900 text-sm">
                Email Updates
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Order updates and promotions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div>
              <p className="font-medium text-gray-900 text-sm">SMS Alerts</p>
              <p className="text-xs text-gray-600 mt-1">
                Shipping and delivery updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
