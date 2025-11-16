import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CalendarDays, LayoutGrid, User, ArrowLeft } from 'lucide-react';
import { clubs, eventsByClub } from '../data/dashboardData';

const DashboardHeader = ({ onMenuToggle, isMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-4">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="text-white p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors" aria-label="Go to Landing Page">
            <ArrowLeft size={24} />
          </button>
          <button onClick={onMenuToggle} className="text-white p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors lg:hidden" aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm p-2 rounded-full">
          <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"><CalendarDays size={20} /></button>
          <button className="p-2 text-white bg-white/20 rounded-full transition-colors"><LayoutGrid size={20} /></button>
          <button onClick={() => navigate('/profile')} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

const ClubsPanel = ({ selectedClub, onSelectClub, isOpen, onClose }) => {
  const handleClubClick = (clubId) => {
    onSelectClub(clubId);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto lg:block lg:w-[320px] lg:flex-shrink-0"
        >
          <div className="bg-dash-purple h-full rounded-none lg:rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col">
            <h2 className="font-playfair text-4xl font-bold text-white mb-8">CLUBS</h2>
            <nav className="space-y-3">
              {clubs.map((club) => {
                const Icon = club.Icon;
                return (
                  <motion.button
                    key={club.id}
                    onClick={() => handleClubClick(club.id)}
                    className={`w-full text-left p-3 rounded-xl border border-white/20 transition-all duration-300 flex items-center gap-4 ${selectedClub === club.id ? 'bg-dash-purple-light shadow-inner' : 'hover:bg-white/10'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-6 h-6 text-white/80" />}
                    </div>
                    <span className="font-inter font-medium text-white">{club.name}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EventsPanel = ({ club, events }) => (
  <div className="flex-grow p-6 lg:p-8">
    <h2 className="font-playfair text-4xl font-bold text-white mb-8">EVENTS</h2>
    <AnimatePresence mode="wait">
      <motion.div
        key={club.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg"
          >
            <h3 className="font-playfair text-xl font-bold text-black mb-2">{event.title}</h3>
            <p className="font-inter text-gray-700 mb-4">{event.description}</p>
            <div className="font-inter text-sm text-gray-600 space-y-1">
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
            </div>
            {event.details && (
              <ul className="list-disc list-inside mt-3 font-inter text-sm text-gray-600 space-y-1">
                {event.details.map((detail, i) => <li key={i}>{detail}</li>)}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
);

const WelcomeView = () => (
  <div className="w-full max-w-4xl mx-auto text-center pt-24 px-4">
    <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">WELCOME BACK</h1>
    <p className="font-inter text-lg text-white/80 mb-8">Here’s what’s happening in your clubs today!</p>
    <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 min-h-[300px] shadow-xl">
      <h3 className="font-playfair text-2xl font-bold text-black/80 text-left">Announcements</h3>
    </div>
  </div>
);

const DashboardPage = () => {
  const [selectedClub, setSelectedClub] = useState('finite-loop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState('welcome'); // 'welcome' or 'dashboard'

  // This effect simulates switching from welcome to dashboard after a delay
  // In a real app, this might be a user action
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setView('dashboard');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const selectedClubData = clubs.find(c => c.id === selectedClub);
  const currentEvents = eventsByClub[selectedClub];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-dash-bg-start via-dash-bg-mid to-dash-bg-end relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-marble opacity-50"></div>
      <img 
        src="https://www.pngmart.com/files/15/White-Vase-PNG-Transparent-Image.png" 
        alt="Vase" 
        className="absolute bottom-0 right-0 lg:right-[5%] h-1/2 lg:h-3/4 object-contain pointer-events-none z-10"
      />

      <DashboardHeader 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <main className="relative z-20 pt-20 lg:pt-8 min-h-screen">
        <AnimatePresence mode="wait">
          {view === 'welcome' ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WelcomeView />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-screen-2xl mx-auto lg:flex lg:items-start lg:space-x-8 h-full"
            >
              {/* Mobile Menu */}
              <div className="lg:hidden">
                <ClubsPanel
                  selectedClub={selectedClub}
                  onSelectClub={setSelectedClub}
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block">
                 <ClubsPanel
                  selectedClub={selectedClub}
                  onSelectClub={setSelectedClub}
                  isOpen={true}
                />
              </div>
              
              <EventsPanel club={selectedClubData} events={currentEvents} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DashboardPage;
