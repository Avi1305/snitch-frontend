import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Optional: Add some user feedback for login error here
    }
  };

  return (
    <div className="h-screen w-full bg-[#131313] text-[#e5e2e1] font-sans flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl bg-[#1c1b1b] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[850px]">
        
        {/* Image Section - Hidden on smaller screens */}
        <div className="md:w-1/2 relative hidden md:block group overflow-hidden h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent z-10 opacity-80" />
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="High Fashion Model" 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute bottom-10 left-10 lg:bottom-16 lg:left-16 z-20 text-white">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wide mb-2">SNITCH</h2>
            <p className="text-xs lg:text-sm font-light tracking-[0.2em] uppercase text-[#FFD700]">Premium Clothing Platform</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative h-full">
          
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-white tracking-tight">Welcome Back</h1>
            <p className="text-[#a09f9e] mb-4 lg:mb-6 font-light text-sm">Sign in to your account.</p>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              
              <div className="space-y-1 lg:space-y-2">
                <label className="text-[10px] lg:text-[11px] uppercase tracking-widest text-[#a09f9e] font-semibold">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-[#353534] pb-2 pt-1 text-white text-base focus:outline-none focus:border-[#FFD700] transition-colors placeholder:text-[#4a4a4a]"
                  required
                />
              </div>

              <div className="space-y-1 lg:space-y-2">
                <label className="text-[10px] lg:text-[11px] uppercase tracking-widest text-[#a09f9e] font-semibold">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-[#353534] pb-2 pt-1 text-white text-base focus:outline-none focus:border-[#FFD700] transition-colors placeholder:text-[#4a4a4a]"
                  required
                />
              </div>

              <div className="pt-4 lg:pt-6">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold py-3 lg:py-4 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest text-xs"
                >
                  Sign In
                </button>
              </div>

            </form>

            <div className="mt-6 lg:mt-8 text-center">
              <p className="text-xs lg:text-sm text-[#a09f9e] font-light">
                Don't have an account? <Link to="/register" className="text-[#FFD700] hover:text-[#fff6df] font-medium transition-colors ml-1 border-b border-transparent hover:border-[#fff6df] pb-0.5">Register</Link>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
