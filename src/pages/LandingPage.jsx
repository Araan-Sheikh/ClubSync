import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <section 
        id="home" 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95"></div>
        
        <Navbar />
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto mt-20"
          {...fadeInUp}
        >
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Unite. Discover. Celebrate!
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            One platform, all campus clubs. Find events, follow your favourites, and never miss a moment of campus life.
          </p>
          <motion.button
            onClick={() => navigate('/signup')}
            className="bg-navy hover:bg-navy-light text-white font-inter font-semibold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-violet-soft/50 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SIGN UP!!
          </motion.button>
        </motion.div>
      </section>

      <section id="problem" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div 
                className="rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-[500px]"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-soft/30 to-navy/40"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-mint-light/20 backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-mint-soft/30 order-1 lg:order-2"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-mint-light">
                The Problem in Focus
              </h2>
              <p className="font-inter text-base sm:text-lg leading-relaxed mb-8 text-white/90">
                University clubs and organisations often face challenges in effectively managing their activities and engaging students. The reliance on multiple uncoordinated communication platforms such as WhatsApp, Discord, and others leads to fragmented information sharing and limited accessibility. This disorganisation prevents effective communication with specific audiences, often resulting in reduced participation and social interaction, either due to a lack of awareness about club communication channels or the inconsistent use of separate tools by individual club leaders.
              </p>
              <motion.button
                onClick={() => navigate('/signup')}
                className="bg-navy hover:bg-navy-light text-white font-inter font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-violet-soft/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SIGN UP!!
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="solution" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        ></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-14 shadow-2xl"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-navy">
              Solution
            </h2>
            <p className="font-inter text-base sm:text-lg leading-relaxed mb-8 text-navy/80">
              ClubSync aims to solve this problem by creating a unified digital platform for clubs to manage members, organize events, post announcements, and track participation — all in one simple dashboard.
            </p>
            <p className="font-inter text-base sm:text-lg leading-relaxed mb-8 text-navy/80">
              With ClubSync, student leaders can organise their clubs efficiently, members stay informed about campus events, and colleges gain insight into campus engagement, transforming club management from chaos into coordination.
            </p>
            <motion.button
              onClick={() => navigate('/signup')}
              className="bg-navy hover:bg-navy-light text-white font-inter font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-violet-soft/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SIGN UP!!
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div 
                className="rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-[600px]"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-soft/40 to-navy/50"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-violet-light">
                Features
              </h2>
              
              <div className="space-y-6">
                {[
                  { title: 'Club Hubs', description: 'Dedicated spaces for each club with members, events, and announcements' },
                  { title: 'Event Buzz', description: 'Never miss an event with real-time notifications and updates' },
                  { title: 'Collab Mode', description: 'Seamless collaboration between clubs for joint events' },
                  { title: 'Calendar Sync', description: 'Integrate all club events into your personal calendar' },
                  { title: 'Admin Power Panel', description: 'Powerful tools for club leaders to manage everything efficiently' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
                  >
                    <CheckCircle className="w-6 h-6 text-violet-light flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-inter font-semibold text-lg sm:text-xl mb-1 text-white">
                        {feature.title}
                      </h3>
                      <p className="font-inter text-sm sm:text-base text-white/80">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => navigate('/signup')}
                className="mt-8 bg-violet-soft hover:bg-violet-light text-white font-inter font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-violet-soft/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SIGN UP!!
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-navy-dark py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-playfair text-2xl font-bold mb-2 text-violet-light">ClubSync</p>
          <p className="font-inter text-sm text-white/60">© 2025 ClubSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
