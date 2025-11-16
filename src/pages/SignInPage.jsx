import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in data:', formData);
  };

  const handleGoogleSignIn = () => {
    console.log('Continue with Google');
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-8 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-inter text-sm font-medium text-navy/70 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-navy/20 focus:border-violet-soft focus:outline-none font-inter text-navy transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-inter text-sm font-medium text-navy/70 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-navy/20 focus:border-violet-soft focus:outline-none font-inter text-navy transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-navy/20 text-violet-soft focus:ring-violet-soft" />
                <span className="font-inter text-sm text-navy/70">Remember me</span>
              </label>
              <button type="button" className="font-inter text-sm text-violet-soft hover:text-violet-light transition-colors duration-300">
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-navy hover:bg-navy-light text-white font-inter font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SIGN IN
            </motion.button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white font-inter text-navy/60">or</span>
            </div>
          </div>

          <motion.button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border-2 border-navy/20 hover:border-violet-soft text-navy font-inter font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </motion.button>

          <p className="text-center mt-8 font-inter text-sm text-navy/70">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-violet-soft hover:text-violet-light font-semibold transition-colors duration-300"
            >
              Sign Up
            </button>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-violet-soft to-navy-light p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-white order-1 lg:order-2"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center">
            ClubSync
          </h1>
          <div 
            className="w-full max-w-md h-64 sm:h-80 rounded-2xl shadow-2xl"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <p className="font-inter text-base sm:text-lg mt-8 text-center max-w-md text-white/90">
            Continue your journey in campus community
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
