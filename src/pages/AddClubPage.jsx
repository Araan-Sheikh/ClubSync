import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, LayoutGrid, CalendarPlus, Building2, Loader2, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-[70px] bg-[#260046]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex justify-between items-center">
        <button onClick={() => navigate('/dashboard')} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Go to Dashboard">
          <ArrowLeft size={28} />
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/calendar')} className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-white flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all" aria-label="Go to Calendar">
            <CalendarPlus size={20} className="text-white" />
          </button>
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-white flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all" aria-label="Go to Dashboard">
            <LayoutGrid size={20} className="text-white" />
          </button>
          <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-white/20">
            <UserIcon size={20} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

const GlassCard = ({ title, children, className, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 ${className}`}
  >
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        {Icon && <Icon className="text-[#260046]" />}
        <h3 className="font-playfair text-2xl font-bold text-[#260046] text-center">{title}</h3>
      </div>
      {children}
    </div>
  </motion.div>
);

// Available icons for clubs
const availableIcons = [
  'Code', 'HelpCircle', 'Mic', 'Drama', 'Music', 'BookOpen', 'Camera', 'Palette', 
  'Gamepad2', 'Trophy', 'Rocket', 'Heart', 'Star', 'Zap', 'Target', 'Compass',
  'Globe', 'Users', 'MessageCircle', 'Coffee', 'Plane', 'Briefcase', 'Lightbulb',
  'Film', 'Headphones', 'Dumbbell', 'Pizza', 'Cpu', 'TestTube', 'Newspaper'
];

const IconSelector = ({ selectedIcon, onSelectIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const SelectedIconComponent = LucideIcons[selectedIcon] || LucideIcons.HelpCircle;

  return (
    <div className="relative">
      <label className="font-inter text-sm font-medium text-[#260046]/80 mb-2 block">
        Club Icon
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg bg-white/50 border-2 border-transparent focus:border-violet-soft focus:bg-white hover:bg-white/70 transition-all flex items-center gap-3"
        data-testid="icon-selector-button"
      >
        <div className="w-10 h-10 rounded-full bg-[#260046]/10 flex items-center justify-center">
          <SelectedIconComponent className="w-6 h-6 text-[#260046]" />
        </div>
        <span className="font-inter text-[#260046] flex-grow text-left">{selectedIcon}</span>
        <svg className="w-5 h-5 text-[#260046]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border-2 border-violet-soft/30 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2 p-4">
            {availableIcons.map((iconName) => {
              const IconComponent = LucideIcons[iconName];
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => {
                    onSelectIcon(iconName);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-lg transition-all hover:bg-violet-soft/20 ${
                    selectedIcon === iconName ? 'bg-violet-soft/30 ring-2 ring-violet-soft' : 'bg-gray-50'
                  }`}
                  title={iconName}
                  data-testid={`icon-option-${iconName}`}
                >
                  <IconComponent className="w-6 h-6 text-[#260046] mx-auto" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const AddClubPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [clubName, setClubName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('HelpCircle');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const adminName = profile?.full_name || user?.email?.split('@')[0] || 'Admin';

  const showFeedback = (message, type) => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
  };

  const generateClubId = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const clubId = generateClubId(clubName);

      // Check if club already exists
      const { data: existingClub } = await supabase
        .from('clubs')
        .select('id')
        .eq('name', clubName)
        .single();

      if (existingClub) {
        showFeedback('A club with this name already exists!', 'error');
        setLoading(false);
        return;
      }

      // Insert new club
      const clubUuid = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('clubs')
        .insert({
          id: clubUuid,
          name: clubName,
          icon_name: selectedIcon
        })
        .select()
        .single();

      if (error) throw error;

      showFeedback('Club added successfully!', 'success');
      
      // Reset form
      setClubName('');
      setSelectedIcon('HelpCircle');

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error adding club:', error);
      showFeedback(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-300 via-orange-200 to-pink-200 relative overflow-x-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-marble opacity-50"></div>
      <AdminHeader />
      
      <main className="relative z-20 pt-[100px] pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-[#260046] mb-12 text-center"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}
          >
            ADD NEW CLUB
          </motion.h1>
          
          {feedback.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 mb-6 rounded-lg text-center font-inter font-medium flex items-center justify-center gap-2 ${
                feedback.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}
            >
              {feedback.type === 'success' && <Check size={20} />}
              {feedback.message}
            </motion.div>
          )}

          <GlassCard title="Club Information" icon={Building2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-inter text-sm font-medium text-[#260046]/80 mb-2 block">
                  Club Name *
                </label>
                <input
                  type="text"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="Enter club name..."
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border-2 border-transparent focus:border-violet-soft focus:bg-white focus:outline-none font-inter text-[#260046] transition-all"
                  data-testid="club-name-input"
                />
              </div>

              <IconSelector selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon} />

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-gray-400 text-white font-inter font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-500 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !clubName.trim()}
                  className="flex-1 bg-[#260046] text-white font-inter font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  data-testid="submit-club-button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Adding...
                    </>
                  ) : (
                    'Add Club'
                  )}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default AddClubPage;
