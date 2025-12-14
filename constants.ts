import { ActivityType, LogEntry } from './types';

export const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    type: ActivityType.CALL,
    title: 'Unknown Number',
    description: 'Duration: 00:00 (Missed)',
    timestamp: '10:30 AM',
    status: 'missed'
  },
  {
    id: '2',
    type: ActivityType.SMS,
    title: 'Rahul (Classmate)',
    description: 'Hey Ravi, are you coming to the cricket match today?',
    timestamp: '10:15 AM',
    status: 'incoming'
  },
  {
    id: '3',
    type: ActivityType.NOTIFICATION,
    title: 'Instagram',
    description: 'New like on your photo',
    timestamp: '09:45 AM',
    status: 'received'
  },
  {
    id: '4',
    type: ActivityType.CALL,
    title: 'Mom',
    description: 'Duration: 02:15',
    timestamp: '09:00 AM',
    status: 'incoming'
  },
  {
    id: '5',
    type: ActivityType.SMS,
    title: 'SERVICE-ALERT',
    description: 'Your data pack is expiring soon.',
    timestamp: 'Yesterday',
    status: 'incoming'
  },
  {
    id: '6',
    type: ActivityType.LOCATION,
    title: 'School Zone',
    description: 'Ravi arrived at Delhi Public School',
    timestamp: '08:00 AM',
    locationCoords: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '7',
    type: ActivityType.SMS,
    title: 'Unknown',
    description: 'Click this link to win a prize!',
    timestamp: 'Yesterday',
    status: 'incoming'
  }
];

export const FEATURES = [
  {
    title: 'Real-time Location',
    description: 'Track the "Ravi" app location instantly on the web.',
    icon: '📍'
  },
  {
    title: 'Call & SMS Logs',
    description: 'View detailed call history and read text messages.',
    icon: '📞'
  },
  {
    title: 'App Notifications',
    description: 'See every notification that pops up on the child device.',
    icon: '🔔'
  },
  {
    title: 'AI Safety Insights',
    description: 'Powered by Gemini to detect potential risks.',
    icon: '✨'
  }
];