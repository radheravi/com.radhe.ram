export enum ActivityType {
  CALL = 'CALL',
  SMS = 'SMS',
  NOTIFICATION = 'NOTIFICATION',
  LOCATION = 'LOCATION'
}

export interface LogEntry {
  id: string;
  type: ActivityType;
  title: string; // Contact Name or App Name
  description: string; // Message content or Call duration
  timestamp: string;
  status?: 'incoming' | 'outgoing' | 'missed' | 'received';
  locationCoords?: { lat: number; lng: number };
}

export interface AppState {
  currentPage: 'landing' | 'dashboard';
  currentView: 'overview' | 'calls' | 'sms' | 'notifications' | 'location';
  isAiThinking: boolean;
  aiInsight: string | null;
}