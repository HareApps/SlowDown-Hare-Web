
export enum AppState {
  SETUP = 'SETUP',
  COUNTDOWN = 'COUNTDOWN',
  ALERT = 'ALERT',
  RELAXING = 'RELAXING',
  EXITED = 'EXITED'
}

export interface IntervalOption {
  label: string;
  seconds: number;
}

export const ACTIVITY_INTERVALS: IntervalOption[] = [
  { label: '6 seconds (Test)', seconds: 6 },
  { label: '0.5 hour', seconds: 1800 },
  { label: '1 hour', seconds: 3600 },
  { label: '1.5 hours', seconds: 5400 },
  { label: '2 hours', seconds: 7200 },
  { label: '2.5 hours', seconds: 9000 },
  { label: '3 hours', seconds: 10800 },
  { label: '3.5 hours', seconds: 12600 },
  { label: '4 hours', seconds: 14400 }
];

export const DELAY_INTERVALS: IntervalOption[] = [
  { label: '6 seconds (Test)', seconds: 6 },
  { label: '5 minutes', seconds: 300 },
  { label: '10 minutes', seconds: 600 },
  { label: '15 minutes', seconds: 900 },
  { label: '30 minutes', seconds: 1800 }
];
