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
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform data to include Icon component
      const clubsWithIcons = data.map(club => ({
        ...club,
        id: club.club_id,
        Icon: LucideIcons[club.icon] || LucideIcons.HelpCircle
      }));

      setClubs(clubsWithIcons);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      // Fallback to static clubs if database fetch fails
      const { clubs: staticClubs } = await import('../data/dashboardData');
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
