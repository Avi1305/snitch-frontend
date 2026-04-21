import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const {handleRegister} = useAuth()
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contactNumber: '',
    password: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleRegister({
      email:formData.email,
      password:formData.password,
      contact:formData.contactNumber,
      name:formData.fullname,
      isSeller:formData.isSeller
    })
    navigate('/')
    // Add registration logic here
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-white tracking-tight">Create Account</h1>
            <p className="text-[#a09f9e] mb-4 lg:mb-6 font-light text-sm">Join the exclusive collective.</p>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              
              <div className="space-y-1 lg:space-y-2">
                <label className="text-[10px] lg:text-[11px] uppercase tracking-widest text-[#a09f9e] font-semibold">Full Name</label>
                <input 
                  type="text" 
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-[#353534] pb-2 pt-1 text-white text-base focus:outline-none focus:border-[#FFD700] transition-colors placeholder:text-[#4a4a4a]"
                  required
                />
              </div>

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
                <label className="text-[10px] lg:text-[11px] uppercase tracking-widest text-[#a09f9e] font-semibold">Contact Number</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
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

              <div className="flex items-center pt-1 lg:pt-2">
                <label className="relative flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="isSeller"
                    checked={formData.isSeller}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-sm border border-[#4d4732] peer-checked:bg-[#FFD700] peer-checked:border-[#FFD700] transition-all flex items-center justify-center">
                    <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#131313] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 lg:ml-4 text-xs lg:text-sm text-[#e5e2e1] font-light group-hover:text-white transition-colors">I wish to register as a Seller</span>
                </label>
              </div>
              
             
    
              

              <div className="pt-4 lg:pt-6">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-br from-[#FFD700] to-[#e9c400] text-[#131313] font-semibold py-3 lg:py-4 rounded hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest text-xs"
                >
                  Create Account
                </button>
              </div>

            </form>

            <div className="mt-6 lg:mt-8 text-center">
              <p className="text-xs lg:text-sm text-[#a09f9e] font-light">
                Already have an account? <Link to="/login" className="text-[#FFD700] hover:text-[#fff6df] font-medium transition-colors ml-1 border-b border-transparent hover:border-[#fff6df] pb-0.5">Log In</Link>
              </p>
            </div>
             <a href="/api/auth/google">
              <button className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:scale-102 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
        <span>Continue with Google</span>
    </button>
              </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
