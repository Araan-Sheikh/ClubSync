import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useClubs } from '../contexts/ClubsContext';

const CalendarPage = () => {
  const navigate = useNavigate();
  const { clubs } = useClubs();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
    
    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  // Get the first day of the month and total days
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    return { year, month, firstDay, daysInMonth, today };
  };

  // Check if a date has events
  const hasEventsOnDate = (day) => {
    const { year, month } = getMonthData();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return events.some(event => {
      const eventDate = new Date(event.event_date);
      const eventDateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
      return eventDateStr === dateStr;
    });
  };

  // Get events for a specific date
  const getEventsForDate = (day) => {
    const { year, month } = getMonthData();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return events.filter(event => {
      const eventDate = new Date(event.event_date);
      const eventDateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
      return eventDateStr === dateStr;
    });
  };

  // Check if date is today
  const isToday = (day) => {
    const { year, month, today } = getMonthData();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Handle date click
  const handleDateClick = (day) => {
    const eventsOnDate = getEventsForDate(day);
    if (eventsOnDate.length > 0) {
      setSelectedDate(day);
      setSelectedDateEvents(eventsOnDate);
    }
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Render calendar grid
  const renderCalendar = () => {
    const { firstDay, daysInMonth } = getMonthData();
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 sm:h-20"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvents = hasEventsOnDate(day);
      const isTodayDate = isToday(day);
      
      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDateClick(day)}
          className={`h-16 sm:h-20 flex flex-col items-center justify-center rounded-lg transition-all relative
            ${isTodayDate ? 'bg-[#260046] text-white font-bold shadow-lg' : 'bg-white/20 hover:bg-white/30 text-white'}
            ${hasEvents ? 'cursor-pointer' : 'cursor-default'}
          `}
        >
          <span className="text-lg sm:text-xl">{day}</span>
          {hasEvents && (
            <div className="absolute bottom-2">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
            </div>
          )}
        </motion.button>
      );
    }
    
    return days;
  };

  const { year, month } = getMonthData();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-300 via-purple-300 to-pink-200 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-[#260046] p-2 hover:bg-white/20 rounded-full transition-colors"
            data-testid="calendar-back-button"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-playfair text-2xl font-bold text-[#260046]">Calendar</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6 bg-white/20 backdrop-blur-md rounded-2xl p-4">
            <button 
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-white/30 rounded-full transition-colors"
              data-testid="previous-month-button"
            >
              <ChevronLeft size={28} className="text-[#260046]" />
            </button>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#260046]">
              {monthNames[month]} {year}
            </h2>
            <button 
              onClick={goToNextMonth}
              className="p-2 hover:bg-white/30 rounded-full transition-colors"
              data-testid="next-month-button"
            >
              <ChevronRight size={28} className="text-[#260046]" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-4 sm:p-6 shadow-xl">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center font-inter font-semibold text-[#260046] text-sm sm:text-base">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {loading ? (
                <div className="col-span-7 flex justify-center items-center h-64">
                  <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-[#260046]"></div>
                </div>
              ) : (
                renderCalendar()
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedDate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedDate(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-4 top-20 bottom-20 sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:h-auto sm:max-h-[80vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-100 to-pink-100">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-[#260046]">Calendar Events</h3>
                  <p className="font-inter text-sm text-gray-600">
                    {monthNames[month]} {selectedDate}, {year}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors"
                  data-testid="close-events-modal"
                >
                  <X size={24} className="text-[#260046]" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="space-y-4">
                  {selectedDateEvents.map((event, index) => {
                    const clubData = clubs.find(c => c.id === event.club_id);
                    const eventDate = new Date(event.event_date);
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200 shadow-sm hover:shadow-md transition-shadow"
                        data-testid={`event-card-${index}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                            <CalendarIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-playfair text-lg font-bold text-[#260046] mb-1">
                              {event.title}
                            </h4>
                            {event.description && (
                              <p className="font-inter text-sm text-gray-700 mb-2">
                                {event.description}
                              </p>
                            )}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} />
                                <span className="font-inter">
                                  {eventDate.toLocaleString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit',
                                    hour12: true 
                                  })}
                                </span>
                              </div>
                              {event.venue && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <MapPin size={16} />
                                  <span className="font-inter">{event.venue}</span>
                                </div>
                              )}
                              {clubData && (
                                <div className="mt-2">
                                  <span className="inline-block px-3 py-1 bg-[#260046] text-white text-xs font-inter rounded-full">
                                    {clubData.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            {event.registration_link && (
                              <a
                                href={event.registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 px-4 py-2 bg-[#260046] text-white font-inter text-sm rounded-lg hover:bg-opacity-90 transition-all"
                              >
                                Register Now
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;
