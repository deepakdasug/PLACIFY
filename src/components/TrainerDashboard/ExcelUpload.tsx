import { useState } from 'react';
import { importStudentsFromExcel } from '../../utils/excelUtils';
import { type Student } from '../../utils/types';
import './ExcelUpload.css';

interface ExcelUploadProps {
  onStudentsLoaded: (students: Student[]) => void;
}

export const ExcelUpload: React.FC<ExcelUploadProps> = ({ onStudentsLoaded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const students = await importStudentsFromExcel(file);
      if (students.length === 0) {
        setError('No student data found in the Excel file.');
      } else {
        onStudentsLoaded(students);
        setSuccess(`Successfully loaded ${students.length} students from Excel file!`);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to import Excel file. Please ensure it matches the expected format.'
      );
    } finally {
      setLoading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <div className="excel-upload">
      <div className="upload-card">
        <h3>Upload Student Data</h3>
        <p className="description">
          Upload your Excel file containing student data. The file should have columns:
          Student_ID, Student_Name, Batch, Course, City, Education, Experience, 
          Skill_Score, Communication_Score, Mock_Average, Interview_Average, 
          Projects_Complete, Applications_Count, Profile_Completion_Score, 
          Placement_Readiness_Score, Placement_Status, Placed_Salary
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            disabled={loading}
            className="file-input"
            id="excel-file"
          />
          <label htmlFor="excel-file" className="file-label">
            {loading ? 'Loading...' : 'Click to select Excel file'}
          </label>
        </div>

        <p className="file-note">
          Supported formats: .xlsx, .xls, .csv
        </p>
      </div>
    </div>
  );
};
