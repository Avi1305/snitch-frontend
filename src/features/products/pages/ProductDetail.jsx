import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { ArrowLeft, User, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'

const ProductDetail = () => {
    const {productId} = useParams()
    const navigate = useNavigate()
    const {handleGetProductById}  = useProduct()
    const [product,setProduct] = useState(null)
    const [mainImage, setMainImage] = useState('')

    const fetchProduct = async()=>{
        try {
            const fetchedProduct = await handleGetProductById(productId);
            setProduct(fetchedProduct);
            if (fetchedProduct?.images?.length > 0) {
                setMainImage(fetchedProduct.images[0].url || fetchedProduct.images[0]);
            }
        } catch (error) {
            console.error("Failed to fetch product", error);
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[productId])

    const handlePrevImage = () => {
        if (!product?.images?.length) return;
        const currentIndex = product.images.findIndex(img => (img.url || img) === mainImage);
        const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
        setMainImage(product.images[prevIndex].url || product.images[prevIndex]);
    }

    const handleNextImage = () => {
        if (!product?.images?.length) return;
        const currentIndex = product.images.findIndex(img => (img.url || img) === mainImage);
        const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
        setMainImage(product.images[nextIndex].url || product.images[nextIndex]);
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-on-surface">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-t-2 border-primary-container rounded-full animate-spin mb-4"></div>
                    <p className="font-body tracking-widest uppercase text-surface-tint">Loading Gallery...</p>
                </div>
            </div>
        )
    }

  return (
    <div className="h-screen overflow-hidden bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-fixed flex flex-col">
      {/* Navigation (The "Floating Gallery" Bar) */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center justify-between px-8 py-4 bg-surface-container-lowest/80 backdrop-blur-xl rounded-full w-[90%] max-w-[1400px] shadow-[0_40px_40px_rgba(229,226,225,0.08)]">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-label tracking-widest uppercase text-xs hidden sm:inline">Back</span>
          </button>
          
          <div className="text-xl font-bold tracking-widest text-primary-container font-headline uppercase absolute left-1/2 transform -translate-x-1/2">
            SNITCH
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/seller/dashboard" className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors">
              <User size={18} className="text-on-surface" />
            </Link>
          </div>
        </nav>
      </div>

      <main className="flex-1 pt-32 pb-12 px-6 md:px-16 max-w-[1400px] mx-auto w-full flex items-center justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full h-full max-h-[750px]">
            
            {/* Left Column: Images */}
            <div className="lg:col-span-7 flex flex-row gap-6 h-full overflow-hidden">
                {/* Thumbnails on the Left */}
                {product.images && product.images.length > 1 && (
                    <div className="flex flex-col gap-4 w-20 md:w-24 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden shrink-0">
                        {product.images.map((img, index) => {
                            const imgUrl = img.url || img;
                            const isActive = imgUrl === mainImage;
                            return (
                                <button 
                                    key={img._id || index} 
                                    onClick={() => setMainImage(imgUrl)}
                                    className={`w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low transition-all duration-300 shrink-0 ${isActive ? 'ring-2 ring-primary-container scale-95 opacity-100' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                                >
                                    <img src={imgUrl} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            )
                        })}
                    </div>
                )}
                
                {/* Main Image */}
                <div className="flex-1 h-full bg-surface-container-low rounded-3xl overflow-hidden relative group">
                    <img 
                        src={mainImage} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent pointer-events-none" />
                    
                    {/* Swipe Buttons */}
                    {product.images && product.images.length > 1 && (
                        <>
                            <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/60 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-container-highest hover:text-primary-container transition-colors opacity-0 group-hover:opacity-100 duration-300">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/60 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-container-highest hover:text-primary-container transition-colors opacity-0 group-hover:opacity-100 duration-300">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="lg:col-span-5 flex flex-col h-full py-4 overflow-hidden">
                <div className="flex-shrink-0">
                    <p className="text-sm font-label tracking-[0.2em] text-surface-tint uppercase mb-3">
                        {product.category || 'Apparel Collection'}
                    </p>
                    <h1 className="text-2xl md:text-4xl lg:text-2xl font-display tracking-tight text-on-surface leading-tight mb-4">
                        {product.title}
                    </h1>
                    
                    <div className="text-2xl font-body font-medium text-on-surface mb-6">
                        {product.price?.currency === 'INR' ? '₹' : '$'}{product.price?.amount || product.price || '0.00'}
                    </div>
                </div>

                {/* Description (Scrollable) */}
                <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden pr-4 flex-1 mb-6">
                    <p className="text-base text-on-surface-variant font-body leading-relaxed whitespace-pre-wrap">
                        {product.description}
                    </p>
                </div>

                {/* Action Buttons (Separated Vertically) */}
                <div className="flex flex-col gap-3 flex-shrink-0 pt-4 border-t border-surface-container-high">
                    {/* Secondary Button */}
                    <button className="w-full h-11 rounded-lg bg-transparent flex items-center justify-center gap-2 text-primary-fixed-dim font-label text-sm tracking-widest uppercase transition-colors hover:bg-surface-container-lowest" style={{ boxShadow: 'inset 0 0 0 1px rgba(77, 71, 50, 0.5)' }}>
                        <ShoppingBag size={18} />
                        Add to Cart
                    </button>
                    {/* Primary Button */}
                    <button className="w-full h-11 rounded-lg bg-gradient-to-br from-primary-fixed-dim to-primary-container text-on-primary font-label text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.15)]">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail