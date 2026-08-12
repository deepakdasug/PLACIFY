import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User, type AuthContextType, type Student } from '../utils/types';
import { DEFAULT_USERS, VALID_CREDENTIALS } from '../utils/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (identifier: string, credential: string, userType: 'student' | 'trainer', students?: Student[]) => {
    if (userType === 'student') {
      // Student login with ID and Name from Excel data
      if (!students || students.length === 0) {
        throw new Error('Student data not loaded. Please ensure Excel file is available.');
      }

      const studentId = identifier;
      const studentName = credential;

      // Find student in Excel data by ID and Name
      const foundStudent = students.find(
        s => s.Student_ID === studentId && s.Student_Name.toLowerCase() === studentName.toLowerCase()
      );

      if (foundStudent) {
        const user: User = {
          id: foundStudent.Student_ID,
          name: foundStudent.Student_Name,
          email: `${foundStudent.Student_ID}@placify.com`, // Generate email from ID
          userType: 'student',
          studentId: foundStudent.Student_ID,
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return;
      }

      throw new Error('Invalid Student ID or Name. Please check your credentials and try again.');
    } else {
      // Trainer login with fixed credentials only (TR1/ACCIO1)
      if (identifier === 'TR1' && credential === 'ACCIO1') {
        const user: User = {
          id: 'TR1',
          name: 'ACCIO1',
          email: 'trainer@placify.com',
          userType: 'trainer',
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return;
      }
      
      throw new Error('Invalid trainer credentials. Only TR1/ACCIO1 can login as trainer.');
    }
  };

  const signup = (name: string, identifier: string, _credential: string, userType: 'student') => {
    // Only student signup is allowed
    if (userType !== 'student') {
      throw new Error('Trainer signup is not allowed. Trainers use fixed credentials (TR1/ACCIO1).');
    }

    // Mock signup - In real app, this would call backend API
    const newUser: User = {
      id: identifier,
      name,
      email: identifier.includes('@') ? identifier : `${identifier}@placify.com`,
      userType: 'student',
      studentId: identifier,
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
