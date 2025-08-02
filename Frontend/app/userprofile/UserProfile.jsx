"use client"
import { useState, useEffect } from 'react';
import { FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiSettings } from 'react-icons/fi';
import { RiVipCrownFill } from 'react-icons/ri';

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User data
  const [user, setUser] = useState({
    name: 'Sophia Williams',
    email: 'sophia.williams@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'March 2023',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60cb18d?w=200&h=200&fit=crop&crop=faces',
    membership: 'Gold',
    orders: 24,
    spent: 3280,
    satisfaction: 4.9
  });

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Elegance Street, Beverly Hills, CA 90210',
      default: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Avenue, Los Angeles, CA 90028',
      default: false
    }
  ]);

  const [payments] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4567',
      expiry: '12/26',
      default: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8901',
      expiry: '08/25',
      default: false
    }
  ]);

  const [orders] = useState([
    {
      id: '#ORD-2024-001',
      date: 'Jan 15, 2024',
      items: 2,
      total: '$485.00',
      status: 'Delivered'
    },
    {
      id: '#ORD-2024-002',
      date: 'Jan 8, 2024',
      items: 1,
      total: '$185.00',
      status: 'Shipped'
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingBag /> },
    { id: 'addresses', label: 'Addresses', icon: <FiMapPin /> },
    { id: 'payments', label: 'Payments', icon: <FiCreditCard /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

    return (
    <div className="bg-white">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-20 bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-medium text-rose-900">My Account</h1>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-rose-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-10">
                     {/* Sidebar - Desktop */}
           {!isMobile && (
             <div className="w-80 flex-shrink-0">
               <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50 h-fit">
                 <h2 className="text-xl font-semibold text-gray-900 mb-8">My Account</h2>
                 <nav className="space-y-2">
                   {navItems.map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setActiveSection(item.id)}
                       className={`w-full flex items-center px-6 py-5 rounded-xl transition-all duration-200 font-medium text-left ${
                         activeSection === item.id
                           ? 'bg-rose-100 text-rose-700 shadow-sm'
                           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                       }`}
                     >
                       <span className="mr-4 text-xl">{item.icon}</span>
                       <span className="text-base">{item.label}</span>
                     </button>
                   ))}
                 </nav>
               </div>
             </div>
           )}

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
              <div className="bg-white h-full w-4/5 max-w-sm p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-rose-900">Menu</h2>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-lg ${
                        activeSection === item.id
                          ? 'bg-rose-100 text-rose-700'
                          : 'text-gray-600 hover:bg-rose-50'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

                     {/* Main Content */}
           <div className="flex-1 space-y-8">
             {activeSection === 'profile' && (
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
                       <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
                       <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                         <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-rose-700 shadow-sm">
                           {user.membership} Member
                         </span>
                         <span className="text-sm text-gray-600">Member since {user.joinDate}</span>
                       </div>
                     </div>
                   </div>
                 </div>

                                 {/* Profile Details */}
                                   <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                      <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                      </button>
                    </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                              <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                       <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 hover:border-gray-300 transition-colors">
                         <p className="text-gray-900 font-medium">{user.name}</p>
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                       <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 hover:border-gray-300 transition-colors">
                         <p className="text-gray-900 font-medium">{user.email}</p>
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                       <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 hover:border-gray-300 transition-colors">
                         <p className="text-gray-900 font-medium">{user.phone}</p>
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-3">Member Since</label>
                       <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 hover:border-gray-300 transition-colors">
                         <p className="text-gray-900 font-medium">{user.joinDate}</p>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            )}

                         {activeSection === 'orders' && (
               <div className="space-y-8">
                 <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Order History</h2>
                   <p className="text-gray-600">Track and manage your purchases</p>
                 </div>

                                 <div className="space-y-6">
                   {orders.map((order) => (
                                           <div key={order.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{order.total}</p>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

                         {activeSection === 'addresses' && (
               <div className="space-y-8">
                 <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
                   <div className="flex justify-between items-center">
                     <div>
                       <h2 className="text-2xl font-bold text-gray-900 mb-2">Saved Addresses</h2>
                       <p className="text-gray-600">Manage your delivery locations</p>
                     </div>
                     <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                       Add New
                     </button>
                   </div>
                 </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {addresses.map((address) => (
                                           <div key={address.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{address.type}</h3>
                          {address.default && (
                            <span className="inline-block bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded mt-2">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600">{address.address}</p>
                                             {!address.default && (
                         <button className="mt-6 w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                           Set as Default
                         </button>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            )}

                         {activeSection === 'payments' && (
               <div className="space-y-8">
                 <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
                   <div className="flex justify-between items-center">
                     <div>
                       <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h2>
                       <p className="text-gray-600">Secure and encrypted payments</p>
                     </div>
                     <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                       Add Card
                     </button>
                   </div>
                 </div>

                                 <div className="space-y-6">
                   {payments.map((payment) => (
                                           <div key={payment.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                       <div className="flex justify-between items-center">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                             {payment.type === 'Visa' ? 'VISA' : 'MC'}
                           </div>
                           <div>
                             <h3 className="font-medium text-gray-900">
                               {payment.type} •••• {payment.last4}
                             </h3>
                             <p className="text-sm text-gray-500">Expires {payment.expiry}</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-2">
                           {payment.default && (
                             <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                               Default
                             </span>
                           )}
                           <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                             </svg>
                           </button>
                           <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                             </svg>
                           </button>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

                         {activeSection === 'settings' && (
               <div className="space-y-8">
                 <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
                   <p className="text-gray-600">Customize your experience</p>
                 </div>

                                                   <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                       <div>
                         <p className="font-medium text-gray-900">Email Updates</p>
                         <p className="text-sm text-gray-600 mt-1">Order updates and promotions</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" defaultChecked />
                         <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                       </label>
                     </div>
                                           <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                       <div>
                         <p className="font-medium text-gray-900">SMS Alerts</p>
                         <p className="text-sm text-gray-600 mt-1">Shipping and delivery updates</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" />
                         <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                       </label>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );  
}