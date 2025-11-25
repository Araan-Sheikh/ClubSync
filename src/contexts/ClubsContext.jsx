import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import * as LucideIcons from 'lucide-react';

const ClubsContext = createContext();

export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      console.log('Fetching clubs from database...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('User session:', session ? 'authenticated' : 'not authenticated');
      if (!session) {
        console.log('No session, using static clubs');
        throw new Error('Not authenticated');
      }
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name, icon_name, created_at')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      console.log('Raw clubs data from DB:', data);

      // Transform data to include Icon component
      const clubsWithIcons = data.map(club => {
        console.log('Processing club:', club);
        const iconName = club.icon_name || club.icon || 'HelpCircle';
        return {
          ...club,
          Icon: LucideIcons[iconName] || LucideIcons.HelpCircle
        };
      });

      console.log('Transformed clubs:', clubsWithIcons);
      setClubs(clubsWithIcons);
    } catch (error) {
      console.error('Error fetching clubs, using fallback:', error);
      // Fallback to static clubs if database fetch fails
      const { clubs: staticClubs } = await import('../data/dashboardData');
      console.log('Using static clubs:', staticClubs);
      setClubs(staticClubs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('clubs_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'clubs' }, 
        () => {
          fetchClubs();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    clubs,
    loading,
    refreshClubs: fetchClubs
  };

  return <ClubsContext.Provider value={value}>{children}</ClubsContext.Provider>;
};

export const useClubs = () => {
  const context = useContext(ClubsContext);
  if (!context) {
    throw new Error('useClubs must be used within a ClubsProvider');
  }
  return context;
};
