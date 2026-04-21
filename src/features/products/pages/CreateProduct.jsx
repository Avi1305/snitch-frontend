import React, { useState, useRef } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const MAX_IMAGES = 7;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    addImages(files);
  };

  const addImages = (files) => {
    const remaining = MAX_IMAGES - images.length;
    const newFiles = files.slice(0, remaining);

    if (newFiles.length === 0) return;

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );
    addImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('priceAmount', formData.priceAmount);
      data.append('priceCurrency', formData.priceCurrency);
      images.forEach((img) => data.append('images', img));

      await handleCreateProduct(data);
      navigate('/');
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#131313] text-[#e5e2e1] font-['Inter',sans-serif] overflow-hidden flex flex-col">

      {/* Top Bar */}
      <div className="shrink-0 px-6 md:px-10 lg:px-16 pt-5 pb-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#a09f9e] hover:text-[#FFD700] transition-colors duration-300 cursor-pointer"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Back</span>
        </button>

        <h1 className="text-lg md:text-xl font-light tracking-tight text-white font-['Manrope',sans-serif]">
          Create Product
        </h1>

        {/* Submit Button — top right on desktop */}
        <button
          type="submit"
          form="create-product-form"
          disabled={isSubmitting}
          className="hidden md:flex items-center gap-2 bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold px-6 py-2.5 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-[0.15em] text-[11px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating...
            </>
          ) : (
            'Publish'
          )}
        </button>
      </div>

      {/* Main Content — two columns on desktop */}
      <form
        id="create-product-form"
        onSubmit={handleSubmit}
        className="flex-1 min-h-0 flex flex-col lg:flex-row gap-0 lg:gap-0 overflow-hidden"
      >

        {/* Left Column — Form Fields */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 md:px-10 lg:px-16 py-6 lg:py-8 lg:border-r lg:border-[#1c1b1b] scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

          <div className="max-w-xl space-y-6">

            {/* Title */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold block">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Premium Linen Overshirt"
                className="w-full bg-[#1c1b1b] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD700]/40 transition-all duration-300 placeholder:text-[#4a4a4a]"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold block">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product — materials, fit, story..."
                rows={3}
                className="w-full bg-[#1c1b1b] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD700]/40 transition-all duration-300 placeholder:text-[#4a4a4a] resize-none leading-relaxed"
                required
              />
            </div>

            {/* Price Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold block">
                  Price
                </label>
                <input
                  type="number"
                  name="priceAmount"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full bg-[#1c1b1b] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD700]/40 transition-all duration-300 placeholder:text-[#4a4a4a] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold block">
                  Currency
                </label>
                <select
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  className="w-full bg-[#1c1b1b] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD700]/40 transition-all duration-300 cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a09f9e' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="INR" className="bg-[#1c1b1b] text-white">INR</option>
                  <option value="USD" className="bg-[#1c1b1b] text-white">USD</option>
                  <option value="EUR" className="bg-[#1c1b1b] text-white">EUR</option>
                  <option value="GBP" className="bg-[#1c1b1b] text-white">GBP</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column — Images */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-[#0e0e0e] px-6 md:px-10 lg:px-10 py-6 lg:py-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="max-w-xl lg:max-w-none">

            <div className="flex items-baseline justify-between mb-4">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">
                Product Images
              </label>
              <span className="text-[11px] text-[#4d4732] font-light">
                {images.length} / {MAX_IMAGES}
              </span>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-2.5">

              {/* Existing Previews */}
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group bg-[#1c1b1b]"
                >
                  <img
                    src={src}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-7 h-7 rounded-full bg-[#131313]/80 backdrop-blur-sm flex items-center justify-center text-[#ffb4ab] hover:text-white hover:bg-red-900/60 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {index === 0 && (
                    <span className="absolute top-1.5 left-1.5 text-[8px] uppercase tracking-widest bg-[#FFD700] text-[#131313] px-1.5 py-0.5 rounded font-bold">
                      Cover
                    </span>
                  )}
                </div>
              ))}

              {/* Add Image Slot */}
              {images.length < MAX_IMAGES && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    aspect-square rounded-lg cursor-pointer
                    flex flex-col items-center justify-center gap-1.5
                    transition-all duration-300
                    ${dragOver
                      ? 'bg-[#FFD700]/10 border-[#FFD700]'
                      : 'bg-[#1c1b1b] hover:bg-[#2a2a2a] border-[#353534]'
                    }
                    border border-dashed
                  `}
                >
                  <svg
                    className={`w-5 h-5 transition-colors duration-300 ${dragOver ? 'text-[#FFD700]' : 'text-[#4d4732]'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-[9px] text-[#4d4732] uppercase tracking-wider">Add</span>
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />

            <p className="text-[10px] text-[#4d4732] font-light mt-3">
              Drag & drop or click to upload. JPG, PNG up to 5MB each.
            </p>
          </div>
        </div>

        {/* Mobile Submit Button */}
        <div className="shrink-0 md:hidden px-6 py-4 bg-[#131313] border-t border-[#1c1b1b]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold py-3.5 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] transition-all duration-300 uppercase tracking-[0.15em] text-[11px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating...
              </span>
            ) : (
              'Create Product'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateProduct;
