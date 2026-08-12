import { type User } from './types';

// Mock user credentials for demo (In real app, this would be backend validation)
export const VALID_CREDENTIALS = {
  student: {
    email: 'student@example.com',
    password: 'password123',
  },
  trainer: {
    email: 'trainer@example.com',
    password: 'password123',
  },
};

// Default users for demonstration
export const DEFAULT_USERS: User[] = [
  {
    id: '1',
    name: 'Student',
    email: 'student@example.com',
    userType: 'student',
    studentId: 'STU001',
  },
  {
    id: '2',
    name: 'Trainer',
    email: 'trainer@example.com',
    userType: 'trainer',
  },
];
