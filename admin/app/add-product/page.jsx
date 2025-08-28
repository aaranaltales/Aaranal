'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Tote Bag',
    bestseller: false,
    features: [''],
    specs: {
      dimensions: '',
      weight: '',
      material: '',
      lining: '',
      origin: '',
    },
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [existingImages, setExistingImages] = useState([null, null, null, null]);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if we're editing a product
    const editData = localStorage.getItem('editProduct');
    if (editData) {
      const product = JSON.parse(editData);
      setIsEditing(true);
      setProductId(product._id);
      
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'Tote Bag',
        bestseller: product.bestseller || false,
        features: Array.isArray(product.features) && product.features.length > 0 ? product.features : [''],
        specs: {
          dimensions: product.specs?.dimensions || '',
          weight: product.specs?.weight || '',
          material: product.specs?.material || '',
          lining: product.specs?.lining || '',
          origin: product.specs?.origin || '',
        },
      });

      // Set existing images
      if (product.image && Array.isArray(product.image)) {
        const imageUrls = [...product.image];
        while (imageUrls.length < 4) {
          imageUrls.push(null);
        }
        setExistingImages(imageUrls);
      }

      // Clear the edit data from localStorage after loading
      localStorage.removeItem('editProduct');
    }
  }, []);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
    
    // Clear the existing image at this index when a new one is selected
    const newExistingImages = [...existingImages];
    newExistingImages[index] = null;
    setExistingImages(newExistingImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'features' || key === 'specs') {
          formData.append(key, JSON.stringify(val));
        } else {
          formData.append(key, val);
        }
      });

      // Add product ID if editing
      if (isEditing) {
        formData.append('id', productId);
      }

      // Add new images
      images.forEach((file, i) => {
        if (file) formData.append(`image${i + 1}`, file);
      });

      // Add existing images that weren't replaced
      existingImages.forEach((imageUrl, i) => {
        if (imageUrl && !images[i]) {
          formData.append(`existingImage${i + 1}`, imageUrl);
        }
      });

      const endpoint = isEditing ? '/api/product/update' : '/api/product/add';
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        
        if (!isEditing) {
          // Reset form for new product
          setForm({
            name: '',
            description: '',
            price: '',
            category: 'Tote Bag',
            bestseller: false,
            features: [''],
            specs: {
              dimensions: '',
              weight: '',
              material: '',
              lining: '',
              origin: '',
            },
          });
          setImages([null, null, null, null]);
          setExistingImages([null, null, null, null]);
        } else {
          // Navigate back to products page after edit
          setTimeout(() => {
            router.push('/products');
          }, 1500);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...form.features];
    newFeatures.splice(index, 1);
    setForm({ ...form, features: newFeatures });
  };

  const handleCancel = () => {
    if (isEditing) {
      router.push('/products');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-gray-200">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
        {isEditing && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <label key={i} className="aspect-square rounded-xl bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
                {img ? (
                  <img src={URL.createObjectURL(img)} alt={`preview-${i}`} className="object-cover w-full h-full" />
                ) : existingImages[i] ? (
                  <img src={existingImages[i]} alt={`existing-${i}`} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-sm text-gray-400">+ Upload</span>
                )}
                <input type="file" hidden onChange={(e) => handleImageChange(i, e.target.files[0])} />
              </label>
            ))}
          </div>
          {isEditing && (
            <p className="text-xs text-gray-500 mt-2">
              Click on existing images to replace them, or leave as is to keep current images.
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Type here"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            placeholder="Write content here"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            >
              <option>Tote Bag</option>
              <option>Pouch and Purse</option>
              <option>Crochet</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="25"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        {/* Product Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Features</label>
          {form.features.map((feature, i) => (
            <div key={i} className="flex items-center mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...form.features];
                  newFeatures[i] = e.target.value;
                  setForm({ ...form, features: newFeatures });
                }}
                placeholder={`Feature ${i + 1}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              {form.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(i)}
                  className="ml-2 text-sm text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFeature}
            className="text-sm text-rose-600 cursor-pointer"
          >
            + Add Feature
          </button>
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
          {['dimensions', 'weight', 'material', 'lining', 'origin'].map((key) => (
            <div key={key} className="mb-2">
              <input
                type="text"
                placeholder={key[0].toUpperCase() + key.slice(1)}
                value={form.specs[key]}
                onChange={(e) =>
                  setForm({ ...form, specs: { ...form.specs, [key]: e.target.value } })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestseller"
            checked={form.bestseller}
            onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
            className="accent-rose-600"
          />
          <label htmlFor="bestseller" className="text-sm text-gray-700">
            Add to Bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white text-lg font-medium hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}