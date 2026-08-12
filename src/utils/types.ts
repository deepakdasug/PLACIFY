// Type definitions for the application

export interface Student {
  Student_ID: string;
  Student_Name: string;
  Batch: string;
  Course: string;
  City: string;
  Education: string;
  Experience: string;
  Skill_Score: number;
  Communication_Score: number;
  Mock_Average: number;
  Interview_Average: number;
  Projects_Complete: number;
  Applications_Count: number;
  Profile_Completion_Score: number; // Maps to "Profile_Completion_%" in Excel
  Placement_Readiness_Score: number;
  Placement_Status: string;
  Placed_Salary: string;
  Attendance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'student' | 'trainer';
  studentId?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (identifier: string, credential: string, userType: 'student' | 'trainer', students?: Student[]) => void;
  logout: () => void;
  signup: (name: string, identifier: string, _credential: string, userType: 'student') => void;
}

export interface StudentPerformance {
  metric: string;
  score: number;
  maxScore: number;
  percentage: number;
}
