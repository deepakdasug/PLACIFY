import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { useStudentData } from '../../context/StudentDataContext';
import { exportStudentsToExcel } from '../../utils/excelUtils';
import './TrainerDashboard.css';

export const TrainerDashboard: React.FC = () => {
  const { students, isLoading, error, reloadData } = useStudentData();
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [searchError, setSearchError] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const navigate = useNavigate();

  // Check if there are unsaved students (for warning display only)
  const unsavedStudents = JSON.parse(localStorage.getItem('unsavedStudents') || '[]');
  const hasUnsavedStudents = unsavedStudents.length > 0;
  
  // Use the students from context (already includes unsaved students merged during load)
  const allStudents = students;

  // Get unique courses and statuses from all students
  const uniqueCourses = Array.from(new Set(allStudents.map(s => s.Course)));
  const uniqueStatuses = Array.from(new Set(allStudents.map(s => s.Placement_Status)));

  const handleViewStudentDashboard = () => {
    setSearchError('');

    if (!studentId || !studentName) {
      setSearchError('Please enter both Student ID and Name');
      return;
    }

    // Find the student in all students (including unsaved)
    const student = allStudents.find(
      s => s.Student_ID === studentId && s.Student_Name.toLowerCase() === studentName.toLowerCase()
    );

    if (!student) {
      setSearchError('Student not found. Please check the ID and Name.');
      return;
    }

    // Navigate to student dashboard with student ID as query param
    navigate(`/student/dashboard?studentId=${student.Student_ID}`);
  };

  const handleExportToExcel = async () => {
    setExportLoading(true);
    try {
      // Export ALL students including newly signed up ones
      exportStudentsToExcel(allStudents, 'student_data_updated.xlsx');
      
      // Clear unsaved students after successful export
      localStorage.removeItem('unsavedStudents');
      
      alert('Excel file exported successfully!');
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export data');
    } finally {
      setExportLoading(false);
    }
  };

  const handleShowAnalysis = async () => {
    // Redirect to Google Sheets
    window.open('https://docs.google.com/spreadsheets/d/1KkKV-F6Q-IyYcPjBULDJW3SWW0pYSR0y/edit?gid=301588153#gid=301588153', '_blank');
  };

  const handleReloadData = async () => {
    setIsReloading(true);
    try {
      await reloadData();
    } finally {
      setIsReloading(false);
    }
  };

  const placedCount = allStudents.filter(s => {
    const status = s.Placement_Status?.toLowerCase().trim();
    // Check for various possible values indicating placement
    return status === 'selected' || status === 'placed' || status === 'selected ';
  }).length;
  const placementRate = allStudents.length > 0 ? ((placedCount / allStudents.length) * 100).toFixed(2) : 0;
  const avgSkillScore = allStudents.length > 0 ? (allStudents.reduce((sum, s) => sum + s.Skill_Score, 0) / allStudents.length).toFixed(2) : 0;
  const avgCommunicationScore = allStudents.length > 0 ? (allStudents.reduce((sum, s) => sum + s.Communication_Score, 0) / allStudents.length).toFixed(2) : 0;
  const avgMockScore = allStudents.length > 0 ? (allStudents.reduce((sum, s) => sum + s.Mock_Average, 0) / allStudents.length).toFixed(2) : 0;
  const avgInterviewScore = allStudents.length > 0 ? (allStudents.reduce((sum, s) => sum + s.Interview_Average, 0) / allStudents.length).toFixed(2) : 0;
  const avgPlacementReadiness = allStudents.length > 0 ? (allStudents.reduce((sum, s) => sum + s.Placement_Readiness_Score, 0) / allStudents.length).toFixed(2) : 0;

  // Debug placement status data
  console.log('Placement Status Analysis:');
  console.log('Total students:', allStudents.length);
  console.log('Placement Status distribution:');
  const statusCounts: Record<string, number> = {};
  allStudents.forEach(s => {
    const status = s.Placement_Status || 'Unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  console.log(statusCounts);
  console.log('Students with Selected/Placed status:', placedCount);
  
  // Show a few sample placement statuses
  console.log('Sample Placement_Status values:', allStudents.slice(0, 5).map(s => s.Placement_Status));

  if (isLoading || isReloading) {
    return (
      <div className="trainer-dashboard">
        <Navbar />
        <div className="dashboard-container">
          <div className="loading-state">
            <div className="loading"></div>
            <p>{isReloading ? 'Reloading Data' : 'Loading student data from Excel file...'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-dashboard">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Trainer Dashboard</h1>
        </div>

        {error && (
          <div className="alert alert-error">
            <strong>ℹ️ {error}</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.9rem' }}>
              To fix this: Place your Excel file named <code>student_data.xlsx</code> in the <code>public</code> folder of this project, then refresh the page.
            </p>
          </div>
        )}

        {!error && students.length === 0 && (
          <div className="alert alert-info">
            <strong>📁 Setup Instructions:</strong>
            <ol style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
              <li>Create your Excel file with student data including columns: Student_ID, Student_Name, Batch, Course, City, Education, Experience, Skill_Score, Communication_Score, Mock_Average, Interview_Average, Projects_Complete, Applications_Count, Attendance, Profile_Completion_Score, Placement_Readiness_Score, Placement_Status, Placed_Salary</li>
              <li>Save it as <code>student_data.xlsx</code></li>
              <li>Place it in the <code>public</code> folder of this project</li>
              <li>Refresh this page</li>
              <li>Data will automatically load!</li>
            </ol>
          </div>
        )}

        {students.length > 0 && (
          <>
            {/* Statistics */}
            <div className="statistics-section">
              <div className="stat-card">
                <h4>Total Students</h4>
                <p className="stat-value">{allStudents.length}</p>
              </div>
              <div className="stat-card">
                <h4>Placed Students</h4>
                <p className="stat-value">{placedCount}</p>
              </div>
              <div className="stat-card">
                <h4>Courses</h4>
                <p className="stat-value">{uniqueCourses.length}</p>
              </div>
            </div>

            {/* Performance Averages */}
            <div className="statistics-section five-cards">
              <div className="stat-card">
                <h4>Avg Skill Score</h4>
                <p className="stat-value">{avgSkillScore}</p>
              </div>
              <div className="stat-card">
                <h4>Avg Communication</h4>
                <p className="stat-value">{avgCommunicationScore}</p>
              </div>
              <div className="stat-card">
                <h4>Avg Mock Score</h4>
                <p className="stat-value">{avgMockScore}</p>
              </div>
              <div className="stat-card">
                <h4>Avg Interview</h4>
                <p className="stat-value">{avgInterviewScore}</p>
              </div>
              <div className="stat-card">
                <h4>Avg Readiness</h4>
                <p className="stat-value">{avgPlacementReadiness}%</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn-primary"
                onClick={handleExportToExcel}
                disabled={exportLoading}
              >
                {exportLoading ? 'Exporting...' : '📥 Export Updated Excel'}
              </button>
              <button
                className="btn-primary"
                onClick={handleShowAnalysis}
              >
                📊 Show Overall Analysis
              </button>
              <button
                className="btn-secondary"
                onClick={handleReloadData}
                disabled={isReloading}
              >
                🔄 Reload Data
              </button>
            </div>



            {/* Student Search Section */}
            <div className="student-search-section">
              <h3>Search Student</h3>
              <p className="section-description">Enter Student ID and Name to view their dashboard</p>
              
              <div className="search-form">
                <div className="form-group">
                  <label htmlFor="studentId">Student ID:</label>
                  <input
                    id="studentId"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter Student ID"
                    className="search-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentName">Student Name:</label>
                  <input
                    id="studentName"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter Student Name"
                    className="search-input"
                  />
                </div>

                <button
                  className="btn-primary"
                  onClick={handleViewStudentDashboard}
                >
                  View
                </button>
              </div>

              {searchError && (
                <div className="alert alert-error" style={{ marginTop: '1rem' }}>
                  {searchError}
                </div>
              )}
            </div>

            {/* Top 10 Students by Placement Readiness */}
            <div className="top-students-section">
              <h3>Top 10 Students by Placement Readiness Score</h3>
              <div className="top-students-table">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Readiness Score</th>
                      <th>Placement Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudents
                      .sort((a, b) => b.Placement_Readiness_Score - a.Placement_Readiness_Score)
                      .slice(0, 10)
                      .map((student, index) => (
                        <tr key={student.Student_ID}>
                          <td className="rank-cell">#{index + 1}</td>
                          <td className="id-cell">{student.Student_ID}</td>
                          <td>{student.Student_Name}</td>
                          <td>{student.Course}</td>
                          <td className="score-cell">{student.Placement_Readiness_Score}%</td>
                          <td>
                            <span className={`status-badge status-${student.Placement_Status?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`}>
                              {student.Placement_Status || 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {students.length === 0 && !error && (
          <div className="empty-state">
            <h3>📁 Excel File Not Found</h3>
            <p>Place your Excel file at: <code>public/student_data.xlsx</code></p>
          </div>
        )}
      </div>
    </div>
  );
};
