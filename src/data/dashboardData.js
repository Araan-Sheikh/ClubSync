import { Code, HelpCircle, Mic, Drama, Music } from 'lucide-react';

export const clubs = [
  { id: 'finite-loop', name: 'Finite Loop Club', Icon: Code },
  { id: 'grey-matter', name: 'Grey Matter', Icon: HelpCircle },
  { id: 'saca', name: 'SACA', Icon: Mic },
  { id: 'taaleem', name: 'Taaleem', Icon: Drama },
  { id: 'stereo', name: 'Stereo', Icon: Music },
];

export const eventsByClub = {
  'finite-loop': [
    {
      title: 'She Codes : Journey from Campus to Career',
      description: 'Open for all students on 18 October, 2025. Hear from accomplished professionals - placed at HPE, AWS (Intern), Capillary Tech, and Shibuya Corporation!',
      date: '18 October, 2025',
      time: '9:30 AM onwards',
      venue: 'Phalguni Hall',
    },
    {
      title: 'Hackloop S04',
      description: 'Exclusively for 1st & 2nd-year Finite Loop Club members.',
      date: 'Varies',
      time: 'Varies',
      venue: 'Online & On-campus',
      details: [
        'Registration: Oct 06 - Oct 11, 10:00 AM',
        'Hackathon: Oct 13 - Nov 12',
        'HackXpo Grand Finale: Nov 22'
      ]
    },
  ],
  'grey-matter': [
    {
      title: 'Prashna Manjari Competition',
      description: 'Open for all students on 16 October, 2025.',
      date: '16 October, 2025',
      time: '10:00 AM - 1:00 PM',
      venue: 'Phalguni Hall',
    },
    {
      title: 'The General Quiz',
      description: 'Open for all students!',
      date: '30 August, 2025',
      time: '9 AM - 5:30 PM',
      venue: 'Sambhram Hall',
    },
  ],
  'saca': [
    {
      title: 'Shenanigans',
      description: 'Open for all students!',
      date: '30 AM, 11 October, 2025',
      time: '9:30 AM onwards',
      venue: 'LC 12, CV Raman Block',
    },
    {
      title: 'Game of Roles - Beyond the Script',
      description: 'Open for all students!',
      date: '30 AM - 27 September, 2025',
      time: '9:30 AM onwards',
      venue: 'LC 11, CV Raman Block',
    },
  ],
  'taaleem': [
    {
      title: 'Abhinaya Short Film Competition',
      description: 'Showcase your filmmaking talent. Open to all students and staff.',
      date: '15 November, 2025',
      time: 'Submission Deadline',
      venue: 'Online Submission',
    },
    {
      title: 'Pratyahar: Voices for Hope',
      description: 'An evening of poetry and storytelling dedicated to mental health awareness.',
      date: '10 October, 2025',
      time: '6:00 PM onwards',
      venue: 'Amphitheatre',
    },
  ],
  'stereo': [
    {
      title: 'Swaramanjari',
      description: 'An intra-college singing competition. Let your voice be heard!',
      date: '25 September, 2025',
      time: '2:00 PM - 5:00 PM',
      venue: 'Sowparnika Hall',
    },
    {
      title: 'Musical Talents of NMAMIT',
      description: 'A grand showcase of the diverse musical talents within our campus.',
      date: '28 October, 2025',
      time: '5:30 PM onwards',
      venue: 'Open Air Theatre',
    },
  ],
};
