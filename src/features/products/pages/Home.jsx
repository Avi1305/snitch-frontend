import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const products = useSelector((state)=>state.product.products)
    const {handleGetAllProducts} = useProduct()
    const navigate = useNavigate();

    useEffect(()=>{
        handleGetAllProducts()
    },[])

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-fixed">
      {/* Navigation (The "Floating Gallery" Bar) */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center justify-between px-8 py-4 bg-surface-container-lowest/80 backdrop-blur-xl rounded-full w-[90%] max-w-[1400px] shadow-[0_40px_40px_rgba(229,226,225,0.08)]">
          <div className="text-xl font-bold tracking-widest text-primary-container font-headline uppercase">
            SNITCH
          </div>
          <div className="flex items-center gap-6">
            <Link to="/seller/dashboard" className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-on-surface">person</span>
            </Link>
          </div>
        </nav>
      </div>

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        {/* Asymmetrical Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-end">
          <div className="md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl md:text-5xl font-display tracking-tight text-on-surface leading-tight">
              The Nocturnal <br />
              <span className="text-primary-container">Gallery.</span>
            </h1>
          </div>
          <div className="md:col-span-5 lg:col-span-5 lg:col-start-8 pb-1">
            <p className="text-base text-on-surface-variant font-body leading-relaxed">
              Curated garments for the modern minimalist. Explore our latest arrivals designed with intention, structure, and tonal depth.
            </p>
          </div>
        </section>
        
        {/* Simple Product Grid - No Borders, Tonal Layering */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => {
              const imageUrl = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/400x500';

              
              return (
                <article onClick={()=>{navigate(`/product/${product._id}`)}} key={product._id} className="bg-surface-container-low rounded-2xl overflow-hidden group flex flex-col transition-colors duration-500 hover:bg-surface-container-highest cursor-pointer">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-surface relative">
                    <img 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      src={imageUrl} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-grow">
                    <div>
                      <p className="text-[10px] font-label tracking-widest text-surface-tint uppercase mb-1.5">{product.category || 'Archive'}</p>
                      <h2 className="text-lg font-headline text-on-surface leading-snug group-hover:text-primary-container transition-colors line-clamp-1" title={product.title}>
                        {product.title}
                      </h2>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-2 font-body leading-relaxed flex-grow">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-body text-lg font-medium text-on-surface">
                        ${product.price?.amount || product.price || '0.00'}
                      </span>
                      {/* Gradient Button */}
                      <button className="h-8 px-4 rounded-md bg-gradient-to-br from-primary-fixed-dim to-primary-container text-on-primary font-label text-xs tracking-widest uppercase shadow-none hover:brightness-110 transition-all">
                        View
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full py-40 flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-3xl" style={{ boxShadow: 'inset 0 0 0 1px rgba(77, 71, 50, 0.15)' }}>
              <h3 className="text-3xl font-headline mb-6 text-on-surface">The gallery is empty</h3>
              <p className="text-xl text-on-surface-variant font-body max-w-md">Our curators are preparing the next collection. Please return later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home