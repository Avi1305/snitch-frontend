import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Package, Image as ImageIcon, Trash2, X } from 'lucide-react';

const SellerProductDetails = () => {
    const navigate = useNavigate()
    const { handleGetProductById } = useProduct()
    const { productId } = useParams()
    
    // Core state
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    // Variant Management State
    const [variants, setVariants] = useState([])
    const [showVariantForm, setShowVariantForm] = useState(false)
    
    // New Variant Form State
    const [newVariant, setNewVariant] = useState({
        images: [],
        stock: 0,
        price: { amount: '', currency: 'INR' },
        attributes: [{ key: '', value: '' }]
    })

    const fetchProduct = async () => {
        setIsLoading(true)
        try {
            const fetchedProduct = await handleGetProductById(productId);
            const p = fetchedProduct?.product || fetchedProduct;
            setProduct(p);
            // Mock empty variants array if none exists
            setVariants(p?.variants || []);
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [productId])

    const handleStockChange = (index, delta) => {
        const updated = [...variants];
        updated[index].stock = Math.max(0, updated[index].stock + delta);
        setVariants(updated);
    }

    // Dynamic Attribute Handlers
    const handleAttributeChange = (index, field, value) => {
        const updatedAttrs = [...newVariant.attributes];
        updatedAttrs[index][field] = value;
        setNewVariant({...newVariant, attributes: updatedAttrs});
    }

    const addAttribute = () => {
        setNewVariant({...newVariant, attributes: [...newVariant.attributes, {key: '', value: ''}]});
    }

    const removeAttribute = (index) => {
        const updatedAttrs = newVariant.attributes.filter((_, i) => i !== index);
        setNewVariant({...newVariant, attributes: updatedAttrs});
    }

    // Dynamic Image Handlers
    const handleImageChange = (index, value) => {
        const updatedImages = [...newVariant.images];
        updatedImages[index] = {url: value};
        setNewVariant({...newVariant, images: updatedImages});
    }

    const addImage = () => {
        if (newVariant.images.length < 7) {
            setNewVariant({...newVariant, images: [...newVariant.images, {url: ''}]});
        }
    }

    const removeImage = (index) => {
        const updatedImages = newVariant.images.filter((_, i) => i !== index);
        setNewVariant({...newVariant, images: updatedImages});
    }

    const handleSaveNewVariant = () => {
        const validAttributes = newVariant.attributes.filter(a => a.key.trim() && a.value.trim());
        if (validAttributes.length === 0) return;

        const attributeMap = {};
        validAttributes.forEach(a => { attributeMap[a.key.trim()] = a.value.trim() });

        const validImages = newVariant.images.filter(img => img.url.trim());

        const finalVariant = {
            images: validImages,
            stock: newVariant.stock,
            price: newVariant.price.amount ? newVariant.price : null,
            attributes: attributeMap
        };

        setVariants([...variants, finalVariant]);
        setShowVariantForm(false);
        
        // Reset form
        setNewVariant({
            images: [],
            stock: 0,
            price: { amount: '', currency: 'INR' },
            attributes: [{ key: '', value: '' }]
        });
    }

    const formatPrice = (priceObj) => {
        if (!priceObj || !priceObj.amount) return '—';
        const symbol = { INR: '₹', USD: '$', EUR: '€' }[priceObj.currency] || priceObj.currency;
        return `${symbol}${Number(priceObj.amount).toLocaleString()}`;
    }

    const isFormValid = newVariant.attributes.some(a => a.key.trim() && a.value.trim());

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#131313] flex items-center justify-center text-white">
                <div className="w-12 h-12 border-t-2 border-[#FFD700] rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!product) return null;

    return (
        <div className="min-h-screen w-full bg-[#131313] text-[#e5e2e1] font-['Inter',sans-serif]">
            {/* Top Bar */}
            <div className="sticky top-0 z-30 bg-[#131313]/90 backdrop-blur-xl border-b border-[#1c1b1b]">
                <div className="px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/seller/dashboard')} className="p-2 -ml-2 rounded-lg hover:bg-[#1c1b1b] transition-colors text-[#a09f9e] hover:text-white">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-lg md:text-xl font-light tracking-tight text-white font-['Manrope',sans-serif]">
                            Manage Product
                        </h1>
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-10 lg:px-16 py-8 max-w-[1400px] mx-auto space-y-8">
                
                {/* Product Summary */}
                <div className="bg-[#1c1b1b] rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-32 h-40 bg-[#0e0e0e] rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-[#252525]">
                        {product.images && product.images.length > 0 ? (
                            <img src={product.images[0].url || product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon size={32} className="text-[#353534]" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#a09f9e] font-semibold mb-2">
                            {product.category || 'Base Product'}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-light text-white font-['Manrope',sans-serif] mb-3">
                            {product.title}
                        </h2>
                        <p className="text-sm text-[#a09f9e] line-clamp-2 leading-relaxed mb-4 max-w-3xl">
                            {product.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#252525] rounded-lg text-sm font-semibold text-[#FFD700]">
                            {formatPrice(product.price)}
                        </div>
                    </div>
                </div>

                {/* Variants Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-light text-white font-['Manrope',sans-serif]">Product Variants</h3>
                            <p className="text-xs text-[#a09f9e] mt-1">Manage stock and pricing for specific sizes/colors.</p>
                        </div>
                        {!showVariantForm && (
                            <button onClick={() => setShowVariantForm(true)} className="flex items-center gap-2 bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold px-5 py-2.5 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-[0.15em] text-[11px] cursor-pointer">
                                <Plus size={16} />
                                Add Variant
                            </button>
                        )}
                    </div>

                    {/* New Variant Form */}
                    {showVariantForm && (
                        <div className="bg-[#1c1b1b] rounded-2xl p-6 border border-[#353534] mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-lg font-light text-white">Create New Variant</h4>
                                <button onClick={() => setShowVariantForm(false)} className="text-[#a09f9e] hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    {/* Dynamic Attributes */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Variant Attributes <span className="text-[#ffb4ab]">*</span></label>
                                            <button onClick={addAttribute} className="text-[#FFD700] hover:text-white transition-colors text-xs flex items-center gap-1">
                                                <Plus size={12} /> Add Attribute
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {newVariant.attributes.map((attr, idx) => (
                                                <div key={idx} className="flex gap-2 items-center">
                                                    <input 
                                                        type="text" 
                                                        value={attr.key}
                                                        onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
                                                        placeholder="Key (e.g. Size)"
                                                        className="flex-1 bg-[#131313] border border-[#353534] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={attr.value}
                                                        onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                                                        placeholder="Value (e.g. XL)"
                                                        className="flex-1 bg-[#131313] border border-[#353534] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                                                    />
                                                    <button onClick={() => removeAttribute(idx)} className="p-2 text-[#a09f9e] hover:text-[#ffb4ab] transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            {newVariant.attributes.length === 0 && (
                                                <div className="text-xs text-[#ffb4ab] italic">At least one attribute is required.</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price and Stock */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#353534]">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Variant Price (Optional)</label>
                                            <input 
                                                type="number" 
                                                value={newVariant.price.amount}
                                                onChange={(e) => setNewVariant({...newVariant, price: {...newVariant.price, amount: e.target.value}})}
                                                placeholder={product.price?.amount || 'Base Price'}
                                                className="w-full bg-[#131313] border border-[#353534] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Initial Stock</label>
                                            <input 
                                                type="number" 
                                                value={newVariant.stock}
                                                onChange={(e) => setNewVariant({...newVariant, stock: Number(e.target.value)})}
                                                min="0"
                                                className="w-full bg-[#131313] border border-[#353534] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 flex flex-col justify-between">
                                    {/* Images (Up to 7) */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Variant Images (Max 7, Optional)</label>
                                            {newVariant.images.length < 7 && (
                                                <button onClick={addImage} className="text-[#FFD700] hover:text-white transition-colors text-xs flex items-center gap-1">
                                                    <Plus size={12} /> Add Image
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#353534] [&::-webkit-scrollbar-track]:bg-transparent">
                                            {newVariant.images.map((img, idx) => (
                                                <div key={idx} className="flex gap-4 items-center">
                                                    <div className="w-12 h-12 bg-[#131313] rounded-lg border border-[#353534] flex items-center justify-center shrink-0 overflow-hidden">
                                                        {img.url ? (
                                                            <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ImageIcon size={16} className="text-[#353534]" />
                                                        )}
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        value={img.url}
                                                        onChange={(e) => handleImageChange(idx, e.target.value)}
                                                        placeholder="Image URL"
                                                        className="flex-1 bg-[#131313] border border-[#353534] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                                                    />
                                                    <button onClick={() => removeImage(idx)} className="p-2 text-[#a09f9e] hover:text-[#ffb4ab] transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            {newVariant.images.length === 0 && (
                                                <div className="text-xs text-[#a09f9e] italic py-2">No images added. Click 'Add Image' to include variant photos.</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end pt-4 border-t border-[#353534]">
                                        <button 
                                            onClick={handleSaveNewVariant}
                                            disabled={!isFormValid}
                                            className="flex items-center gap-2 bg-[#FFD700] text-[#131313] font-bold px-6 py-3 rounded-lg hover:bg-[#e9c400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
                                        >
                                            <Save size={16} />
                                            Save Variant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Variants List */}
                    {variants.length > 0 ? (
                        <div className="bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#252525]">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#252525] bg-[#1c1b1b]/50">
                                <div className="col-span-5 text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Variant Attributes</div>
                                <div className="col-span-3 text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Price</div>
                                <div className="col-span-4 text-[10px] uppercase tracking-[0.15em] text-[#a09f9e] font-semibold">Stock Level</div>
                            </div>
                            
                            <div className="divide-y divide-[#252525]">
                                {variants.map((variant, idx) => (
                                    <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#252525]/30 transition-colors">
                                        {/* Attributes */}
                                        <div className="col-span-5 flex items-center gap-4">
                                            <div className="w-12 h-16 bg-[#131313] border border-[#252525] rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                                                {variant.images?.[0]?.url ? (
                                                    <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon size={20} className="text-[#353534]" />
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {variant.attributes && Object.entries(variant.attributes).map(([key, val]) => val && (
                                                    <span key={key} className="px-2.5 py-1 bg-[#252525] text-xs rounded border border-[#353534] text-[#e5e2e1]">
                                                        <span className="text-[#a09f9e] mr-1">{key}:</span>{val}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-3 text-sm font-medium text-white">
                                            {formatPrice(variant.price)}
                                        </div>

                                        {/* Stock Control */}
                                        <div className="col-span-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-[#131313] border border-[#353534] rounded-lg p-1">
                                                <button onClick={() => handleStockChange(idx, -1)} className="w-8 h-8 flex items-center justify-center rounded text-[#a09f9e] hover:text-white hover:bg-[#252525] transition-colors">
                                                    -
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium text-white">
                                                    {variant.stock || 0}
                                                </span>
                                                <button onClick={() => handleStockChange(idx, 1)} className="w-8 h-8 flex items-center justify-center rounded text-[#a09f9e] hover:text-white hover:bg-[#252525] transition-colors">
                                                    +
                                                </button>
                                            </div>
                                            <button onClick={() => {
                                                const v = [...variants];
                                                v.splice(idx, 1);
                                                setVariants(v);
                                            }} className="p-2 text-[#a09f9e] hover:text-[#ffb4ab] transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#1c1b1b] border border-dashed border-[#353534] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                            <Package size={48} className="text-[#353534] mb-4" />
                            <h4 className="text-lg text-white font-['Manrope',sans-serif] mb-2">No variants created yet</h4>
                            <p className="text-sm text-[#a09f9e] max-w-sm mb-6">Create variants for this product to manage inventory for different sizes, colors, or materials.</p>
                            <button onClick={() => setShowVariantForm(true)} className="flex items-center gap-2 border border-[#FFD700]/30 text-[#FFD700] font-semibold px-5 py-2.5 rounded hover:bg-[#FFD700]/10 transition-colors duration-300 uppercase tracking-[0.15em] text-[11px] cursor-pointer">
                                <Plus size={16} />
                                Add First Variant
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SellerProductDetails