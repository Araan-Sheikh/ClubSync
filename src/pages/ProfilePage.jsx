import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, LayoutGrid } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-[70px] bg-[#260046]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Go back">
          <ArrowLeft size={28} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg border-2 border-white flex items-center justify-center bg-white/20">
            <LayoutGrid size={20} className="text-white" />
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-white/20">
            <UserIcon size={20} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

const GlassCard = ({ title, children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 ${className}`}
  >
    <div className="p-8">
      <h3 className="font-playfair text-2xl font-bold text-[#260046] mb-4 text-center">{title}</h3>
      {children}
    </div>
  </motion.div>
);

const ProfilePage = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-300 via-orange-200 to-pink-200 relative overflow-x-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-marble opacity-50"></div>
      <ProfileHeader />
      
      <main className="relative z-20 pt-[120px] pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-playfair text-4xl md:text-5xl font-bold text-[#260046] mb-12 text-center"
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}
            >
              WELCOME BACK, {userName.toUpperCase()}
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column */}
              <div className="space-y-8">
                <GlassCard title="Profile" className="min-h-[190px]" />
                <GlassCard title="Registered Clubs" className="min-h-[190px]" />
              </div>

              {/* Right Column */}
              <div className="relative">
                <GlassCard title="Events Participated" className="min-h-[412px]" />
                <motion.img
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  src="https://www.pngmart.com/files/15/White-Vase-PNG-Transparent-Image.png" 
                  alt="Vase with branches" 
                  className="absolute -bottom-16 right-0 lg:-right-12 w-auto h-[300px] sm:h-[400px] lg:h-[500px] object-contain pointer-events-none hidden md:block"
                />
                <motion.img
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  src="https://www.pngmart.com/files/15/White-Vase-PNG-Transparent-Image.png" 
                  alt="Vase with branches" 
                  className="mt-8 mx-auto w-auto h-[300px] object-contain pointer-events-none md:hidden"
                />
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
