import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await signUp(formData);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Success! Please check your email to verify your account.');
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300 z-10"
        aria-label="Go back to landing page"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-3"/>
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-inter text-sm font-medium text-navy/70 mb-2 block">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-navy/20 focus:border-violet-soft focus:outline-none font-inter text-navy transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="font-inter text-sm font-medium text-navy/70 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-navy/20 focus:border-violet-soft focus:outline-none font-inter text-navy transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="font-inter text-sm font-medium text-navy/70 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy/40" />
                <input
                  type="password" name="password" value={formData.password} onChange={handleChange}
                  placeholder="Create a password (min. 6 characters)"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-navy/20 focus:border-violet-soft focus:outline-none font-inter text-navy transition-all duration-300"
                  required
                />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading || message}
              className="w-full bg-navy hover:bg-navy-light text-white font-inter font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading && <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin mr-2"></div>}
              {loading ? 'Creating Account...' : 'SIGN UP'}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-navy/20"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white font-inter text-navy/60">or</span></div>
          </div>

          <motion.button
            onClick={handleGoogleSignUp}
            className="w-full bg-white border-2 border-navy/20 hover:border-violet-soft text-navy font-inter font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </motion.button>

          <p className="text-center mt-6 font-inter text-sm text-navy/70">
            Already have an account?{' '}
            <button onClick={() => navigate('/signin')} className="text-violet-soft hover:text-violet-light font-semibold transition-colors duration-300">
              Sign In
            </button>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-violet-soft to-navy-light p-8 sm:p-12 lg:p-16 flex-col items-center justify-center text-white order-1 lg:order-2 hidden lg:flex"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center">ClubSync</h1>
          <div 
            className="w-full max-w-md h-64 sm:h-80 rounded-2xl shadow-2xl"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <p className="font-inter text-base sm:text-lg mt-8 text-center max-w-md text-white/90">
            Join the community where campus life comes together
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
