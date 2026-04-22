import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await handleGetSellerProducts();
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    if (!price) return '—';
    const symbol = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }[price.currency] || price.currency;
    return `${symbol}${Number(price.amount).toLocaleString()}`;
  };

  // Stats
  const totalProducts = sellerProducts?.length || 0;
  const totalValue = sellerProducts?.reduce((sum, p) => sum + (p.price?.amount || 0), 0) || 0;

  return (
    <div className="min-h-screen w-full bg-[#131313] text-[#e5e2e1] font-['Inter',sans-serif]">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-30 bg-[#131313]/90 backdrop-blur-xl border-b border-[#1c1b1b]">
        <div className="px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg md:text-xl font-light tracking-tight text-white font-['Manrope',sans-serif]">
              Dashboard
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#1c1b1b] text-[#a09f9e] text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
              Seller
            </span>
          </div>

          <button
            onClick={() => navigate('/seller/create-product')}
            className="group flex items-center gap-2 bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold px-5 py-2.5 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-[0.15em] text-[11px] cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden sm:inline">New Product</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      {!isLoading && sellerProducts?.length > 0 && (
        <div className="px-6 md:px-10 lg:px-16 py-5">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#a09f9e] font-semibold">Products</span>
              <span className="text-2xl font-light text-white font-['Manrope',sans-serif]">{totalProducts}</span>
            </div>
            <div className="w-px h-10 bg-[#1c1b1b]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#a09f9e] font-semibold">Total Value</span>
              <span className="text-2xl font-light text-white font-['Manrope',sans-serif]">
                ₹{totalValue.toLocaleString()}
              </span>
            </div>
            <div className="w-px h-10 bg-[#1c1b1b]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#a09f9e] font-semibold">Avg Price</span>
              <span className="text-2xl font-light text-white font-['Manrope',sans-serif]">
                ₹{totalProducts > 0 ? Math.round(totalValue / totalProducts).toLocaleString() : 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="px-6 md:px-10 lg:px-16 pb-16">

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="pt-6">
            <div className="flex items-center gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="h-2.5 w-16 bg-[#1c1b1b] rounded animate-pulse" />
                  <div className="h-7 w-20 bg-[#1c1b1b] rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#1c1b1b] rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/5] bg-[#252525]" />
                  <div className="p-4 space-y-3">
                    <div className="h-3.5 bg-[#252525] rounded w-3/4" />
                    <div className="h-3 bg-[#252525] rounded w-1/2" />
                    <div className="h-3 bg-[#252525] rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!sellerProducts || sellerProducts.length === 0) && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#1c1b1b] flex items-center justify-center mb-6">
              <svg className="w-9 h-9 text-[#4d4732]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h2 className="text-lg font-light text-white font-['Manrope',sans-serif] mb-2">
              No products yet
            </h2>
            <p className="text-sm text-[#a09f9e] font-light max-w-sm mb-8 leading-relaxed">
              Start building your catalog by creating your first product. It only takes a moment.
            </p>
            <button
              onClick={() => navigate('/seller/create-product')}
              className="flex items-center gap-2 bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold px-7 py-3 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-[0.15em] text-[11px] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create First Product
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && sellerProducts?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sellerProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/seller/product/${product._id}`)}
                className="group relative bg-[#1c1b1b] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0e0e0e]">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        src={
                          hoveredId === product._id && product.images.length > 1
                            ? product.images[1].url
                            : product.images[0].url
                        }
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#252525]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                      </svg>
                    </div>
                  )}

                  {/* Image count badge */}
                  {product.images && product.images.length > 1 && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-[#131313]/70 backdrop-blur-md text-[#e5e2e1] text-[10px] px-2 py-1 rounded-full font-medium">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                      </svg>
                      {product.images.length}
                    </span>
                  )}

                  {/* Quick actions on hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <button className="flex-1 bg-white/90 backdrop-blur-md text-[#131313] text-[10px] uppercase tracking-[0.12em] font-semibold py-2.5 rounded hover:bg-white transition-colors duration-200 cursor-pointer">
                      Edit
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center bg-[#131313]/70 backdrop-blur-md rounded hover:bg-red-900/60 transition-colors duration-200 cursor-pointer">
                      <svg className="w-3.5 h-3.5 text-[#ffb4ab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-white truncate leading-snug flex-1">
                      {product.title}
                    </h3>
                    <span className="shrink-0 text-sm font-semibold text-[#FFD700]">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-xs text-[#a09f9e] font-light line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Add Product Card */}
            <div
              onClick={() => navigate('/seller/create-product')}
              className="group bg-[#1c1b1b]/50 rounded-xl overflow-hidden cursor-pointer border border-dashed border-[#353534] hover:border-[#FFD700]/30 hover:bg-[#1c1b1b] transition-all duration-500 flex flex-col items-center justify-center min-h-[360px]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#252525] group-hover:bg-[#FFD700]/10 flex items-center justify-center mb-4 transition-all duration-500">
                <svg
                  className="w-6 h-6 text-[#4d4732] group-hover:text-[#FFD700] transition-all duration-500 group-hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#4d4732] group-hover:text-[#a09f9e] font-semibold transition-colors duration-500">
                Add Product
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── CSS for line-clamp ── */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;