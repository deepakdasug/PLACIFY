import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Student } from '../utils/types';
import { importStudentsFromExcel } from '../utils/excelUtils';

interface StudentDataContextType {
  students: Student[];
  isLoading: boolean;
  error: string | null;
  reloadData: () => Promise<void>;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export const StudentDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExcelFile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting to load Excel file from /student_data.xlsx');
      
      // Try to load from public folder
      const response = await fetch('/student_data.xlsx');

      if (!response.ok) {
        console.error('Failed to fetch Excel file:', response.status, response.statusText);
        // File not found, check localStorage as fallback
        const savedStudents = localStorage.getItem('allStudents');
        if (savedStudents) {
          console.log('Using localStorage fallback');
          setStudents(JSON.parse(savedStudents));
        } else {
          setError('No Excel file found at /student_data.xlsx. Please upload the file to the public folder.');
        }
        setIsLoading(false);
        return;
      }

      console.log('Excel file fetched successfully, reading blob...');
      const blob = await response.blob();
      console.log('Blob size:', blob.size, 'bytes');
      
      const file = new File([blob], 'student_data.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      console.log('File created:', file.name, file.size, 'bytes');

      // Import the Excel file
      console.log('Starting Excel import...');
      let importedStudents = await importStudentsFromExcel(file);
      
      console.log('Imported students from Excel:', importedStudents.length, 'students');
      
      // Check if there are any unsaved students from localStorage (newly signed up)
      const unsavedStudents = localStorage.getItem('unsavedStudents');
      if (unsavedStudents) {
        const parsedUnsaved = JSON.parse(unsavedStudents);
        console.log('Found unsaved students:', parsedUnsaved.length);
        
        // Merge unsaved students with imported ones, avoiding duplicates
        const existingIds = new Set(importedStudents.map(s => s.Student_ID));
        const newStudents = parsedUnsaved.filter((s: Student) => !existingIds.has(s.Student_ID));
        
        if (newStudents.length > 0) {
          console.log('Adding', newStudents.length, 'new students to avoid duplicates');
          importedStudents = [...importedStudents, ...newStudents];
          console.log('Merged total students:', importedStudents.length);
          // Update localStorage with merged list
          localStorage.setItem('allStudents', JSON.stringify(importedStudents));
        } else {
          console.log('No new students to add (all already in database)');
        }
      }
      
      // Add default attendance if not present
      importedStudents = importedStudents.map(student => ({
        ...student,
        Attendance: student.Attendance || 75
      }));

      if (importedStudents.length === 0) {
        setError('No student data found in the Excel file.');
      } else {
        setStudents(importedStudents);
        // Also save to localStorage as backup
        localStorage.setItem('allStudents', JSON.stringify(importedStudents));
      }
    } catch (err) {
      console.error('Error loading Excel file:', err);
      setError(
        err instanceof Error
          ? `Error loading Excel file: ${err.message}`
          : 'Failed to load Excel file from /student_data.xlsx'
      );

      // Try localStorage as fallback
      try {
        const savedStudents = localStorage.getItem('allStudents');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          console.log('Loaded students from localStorage:', parsedStudents);
          // Add default attendance if not present
          const studentsWithAttendance = parsedStudents.map((student: any) => ({
            ...student,
            Attendance: student.Attendance || 75
          }));
          setStudents(studentsWithAttendance);
          setError(null); // Clear error if we found data in localStorage
        }
      } catch (storageErr) {
        console.error('localStorage fallback failed:', storageErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      // First, try to load from localStorage (which has the latest data including new signups)
      const savedStudents = localStorage.getItem('allStudents');
      if (savedStudents) {
        console.log('Loading students from localStorage:', JSON.parse(savedStudents).length);
        setStudents(JSON.parse(savedStudents));
        setIsLoading(false);
        return;
      }

      // If no localStorage data, load from Excel file
      console.log('No localStorage data, loading from Excel file');
      localStorage.removeItem('unsavedStudents');
      await loadExcelFile();
    };

    loadData();
  }, []);

  const value: StudentDataContextType = {
    students,
    isLoading,
    error,
    reloadData: loadExcelFile,
    setStudents, // Expose setStudents for direct updates
  };

  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = (): StudentDataContextType => {
  const context = useContext(StudentDataContext);
  if (context === undefined) {
    throw new Error('useStudentData must be used within a StudentDataProvider');
  }
  return context;
};
