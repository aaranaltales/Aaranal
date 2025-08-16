'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`);
      if (res.data.products) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editProduct = (product) => {
    // Store the product data in localStorage for the add-product page to use
    localStorage.setItem('editProduct', JSON.stringify(product));
    router.push('/add-product');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-light mb-8">Product List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4">Image</th>
              <th className="px-4">Name</th>
              <th className="px-4">Category</th>
              <th className="px-4">Price</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr
                key={item._id}
                className="bg-white shadow-sm rounded-xl text-sm text-gray-700"
              >
                <td className="px-4 py-3">
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">₹{item.price}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editProduct(item)}
                      className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-8">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}