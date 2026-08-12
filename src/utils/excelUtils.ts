import * as XLSX from 'xlsx';
import { type Student } from './types';

export const exportStudentsToExcel = (students: Student[], fileName: string = 'students_data.xlsx') => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Prepare data for the Data sheet
    const dataSheet = XLSX.utils.json_to_sheet(students);
    
    // Prepare data for the Analysis sheet
    const analysisData = generateAnalysis(students);
    const analysisSheet = XLSX.utils.json_to_sheet(analysisData);

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, dataSheet, 'Student Data');
    XLSX.utils.book_append_sheet(workbook, analysisSheet, 'Analysis Dashboard');

    // Write the file
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};

export const generateAnalysis = (students: Student[]) => {
  if (!students || students.length === 0) {
    return [{
      Category: 'No Data',
      Metric: 'Please upload Excel file first',
      Value: '',
    }];
  }

  const analysis = [];

  // Overall Statistics
  analysis.push({
    Category: 'Overall Statistics',
    Metric: '',
    Value: '',
  });
  analysis.push({
    Category: 'Total Students',
    Metric: students.length,
    Value: '',
  });

  const placedStudents = students.filter(s => s.Placement_Status === 'Selected').length;
  analysis.push({
    Category: 'Placed Students',
    Metric: placedStudents,
    Value: `${((placedStudents / students.length) * 100).toFixed(2)}%`,
  });

  // Average Scores
  analysis.push({
    Category: '',
    Metric: '',
    Value: '',
  });
  analysis.push({
    Category: 'Average Scores',
    Metric: '',
    Value: '',
  });

  const avgSkillScore = (students.reduce((sum, s) => sum + s.Skill_Score, 0) / students.length).toFixed(2);
  analysis.push({
    Category: 'Average Skill Score',
    Metric: avgSkillScore,
    Value: 'out of 100',
  });

  const avgCommScore = (students.reduce((sum, s) => sum + s.Communication_Score, 0) / students.length).toFixed(2);
  analysis.push({
    Category: 'Average Communication Score',
    Metric: avgCommScore,
    Value: 'out of 100',
  });

  const avgMockScore = (students.reduce((sum, s) => sum + s.Mock_Average, 0) / students.length).toFixed(2);
  analysis.push({
    Category: 'Average Mock Score',
    Metric: avgMockScore,
    Value: 'out of 100',
  });

  const avgInterviewScore = (students.reduce((sum, s) => sum + s.Interview_Average, 0) / students.length).toFixed(2);
  analysis.push({
    Category: 'Average Interview Score',
    Metric: avgInterviewScore,
    Value: 'out of 100',
  });

  const avgProfileCompletion = (students.reduce((sum, s) => sum + s.Profile_Completion_Score, 0) / students.length).toFixed(2);
  analysis.push({
    Category: 'Average Profile Completion %',
    Metric: avgProfileCompletion,
    Value: '%',
  });

  // Course Distribution
  analysis.push({
    Category: '',
    Metric: '',
    Value: '',
  });
  analysis.push({
    Category: 'Course Distribution',
    Metric: '',
    Value: '',
  });

  const courses = new Set(students.map(s => s.Course));
  courses.forEach(course => {
    const count = students.filter(s => s.Course === course).length;
    analysis.push({
      Category: course,
      Metric: count,
      Value: `${((count / students.length) * 100).toFixed(2)}%`,
    });
  });

  // Placement Status
  analysis.push({
    Category: '',
    Metric: '',
    Value: '',
  });
  analysis.push({
    Category: 'Placement Status',
    Metric: '',
    Value: '',
  });

  const statuses = ['Selected', 'Interview Scheduled', 'Applied', 'Not Applied', 'Rejected'];
  statuses.forEach(status => {
    const count = students.filter(s => s.Placement_Status === status).length;
    if (count > 0) {
      analysis.push({
        Category: status,
        Metric: count,
        Value: `${((count / students.length) * 100).toFixed(2)}%`,
      });
    }
  });

  return analysis;
};

export const importStudentsFromExcel = (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json<any>(worksheet);
        
        // Map Excel column names to TypeScript interface field names
        const students: Student[] = rawData.map((row: any, index: number) => {
          console.log(`Processing row ${index}:`, row);
          console.log(`Available keys for row ${index}:`, Object.keys(row));
          
          // Try multiple variations for Projects_Complete
          let projectsComplete = 0;
          const possibleKeys = [
            'Projects_Complete',
            'projects_complete', 
            'Projects Complete',
            'Projects complete',
            'PROJECTS_COMPLETE',
            'Projects_Completed',
            'projects_completed',
            'Projects Completed',
            'Projects completed',
            'PROJECTS_COMPLETED'
          ];
          
          for (const key of possibleKeys) {
            if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
              console.log(`Found Projects_Complete in key "${key}":`, row[key]);
              projectsComplete = Number(String(row[key]).trim());
              if (!isNaN(projectsComplete)) {
                break;
              }
            }
          }
          
          console.log(`Final Projects_Complete for row ${index}:`, projectsComplete);
          
          const student: Student = {
            Student_ID: row.Student_ID || row.student_id || '',
            Student_Name: row.Student_Name || row.student_name || '',
            Batch: row.Batch || row.batch || '',
            Course: row.Course || row.course || '',
            City: row.City || row.city || '',
            Education: row.Education || row.education || '',
            Experience: row.Experience || row.experience || '',
            Skill_Score: Number(row.Skill_Score || row.skill_score || 0),
            Communication_Score: Number(row.Communication_Score || row.communication_score || 0),
            Mock_Average: Number(row.Mock_Average || row.mock_average || 0),
            Interview_Average: Number(row.Interview_Average || row.interview_average || 0),
            Projects_Complete: projectsComplete,
            Applications_Count: Number(row.Applications_Count || row.applications_count || 0),
            Profile_Completion_Score: Number(row['Profile_Completion_%'] || row.Profile_Completion_Score || row.profile_completion_score || 0),
            Placement_Readiness_Score: Number(row.Placement_Readiness_Score || row.placement_readiness_score || 0),
            Placement_Status: row.Placement_Status || row.placement_status || '',
            Placed_Salary: row.Placed_Salary || row.placed_salary || '',
            Attendance: Number(row.Attendance || row.attendance || 75),
          };
          console.log('Mapped student:', student);
          return student;
        });
        
        console.log('Imported students with mapped fields:', students);
        resolve(students);
      } catch (error) {
        console.error('Error importing Excel:', error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
