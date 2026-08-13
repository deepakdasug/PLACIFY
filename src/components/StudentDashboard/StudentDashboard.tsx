import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { PieChart } from '../PieChart/PieChart';
import { useAuth } from '../../context/AuthContext';
import { useStudentData } from '../../context/StudentDataContext';
import { type Student } from '../../utils/types';
import { generateSkillRoadmap } from '../../utils/sarvamAI';
import './StudentDashboard.css';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { students, isLoading, error } = useStudentData();
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [isTrainerView, setIsTrainerView] = useState(false);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState('');

  useEffect(() => {
    const loadStudentData = () => {
      if (isLoading) return;

      if (error) {
        setMessage('Error loading data. Please contact your trainer.');
        return;
      }

      if (students.length === 0) {
        setMessage('No student data available yet. Please ask your trainer to upload the Excel file.');
        return;
      }

      // Check if trainer is viewing a student's dashboard via query param
      const queryStudentId = searchParams.get('studentId');
      const targetStudentId = queryStudentId || user?.studentId;
      
      setIsTrainerView(!!queryStudentId && user?.userType === 'trainer');

      console.log('All available students:', students);
      console.log('Looking for student with ID:', targetStudentId);
      console.log('User data:', user);
      console.log('Is trainer view:', isTrainerView);

      // Find student by Student_ID (primary match)
      const found = students.find(s => s.Student_ID === targetStudentId);

      console.log('Found student:', found);

      if (found) {
        console.log('Student Projects_Complete:', found.Projects_Complete);
        setStudentData(found);
        generateMetrics(found);
        setMessage('');
      } else {
        setMessage(`Student data not found. Looking for Student ID: ${targetStudentId}`);
      }
    };

    loadStudentData();
  }, [students, user?.studentId, user?.name, isLoading, error, searchParams, user?.userType]);

  const generateMetrics = (student: Student) => {
    console.log('Generating metrics for student:', student);
    
    // Only include metrics that are actually present in the Excel file
    const metrics = [
      {
        label: 'Skill Score',
        score: student.Skill_Score || 0,
        maxScore: 100,
        icon: '💡',
      },
      {
        label: 'Communication Score',
        score: student.Communication_Score || 0,
        maxScore: 100,
        icon: '🗣️',
      },
      {
        label: 'Mock Average',
        score: student.Mock_Average || 0,
        maxScore: 100,
        icon: '📝',
      },
      {
        label: 'Interview Average',
        score: student.Interview_Average || 0,
        maxScore: 100,
        icon: '👔',
      },
      {
        label: 'Projects Completed',
        score: student.Projects_Complete || 0,
        maxScore: 10,
        icon: '🛠️',
        showOnlyScore: true,
      },
      {
        label: 'Applications Submitted',
        score: student.Applications_Count || 0,
        maxScore: 50,
        icon: '📧',
        showOnlyScore: true,
      },
      {
        label: 'Profile Completion',
        score: student.Profile_Completion_Score || 0,
        maxScore: 100,
        icon: '👤',
        suffix: '%',
      },
      {
        label: 'Attendance',
        score: student.Attendance || 75,
        maxScore: 100,
        icon: '📅',
        suffix: '%',
      },
    ];

    console.log('Generated metrics:', metrics);
    setPerformanceMetrics(metrics);
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getPercentage = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100);
  };

  const handleGenerateRoadmap = async () => {
    if (!studentData) return;

    setIsGeneratingRoadmap(true);
    setRoadmapError('');

    try {
      const weakSkills = performanceMetrics.filter(metric => {
        const percentage = (metric.score / metric.maxScore) * 100;
        return percentage < 60;
      });

      if (weakSkills.length === 0) {
        setRoadmapError('Great job! All your skills are above 60%. Keep up the good work!');
        setRoadmap([]);
        setIsGeneratingRoadmap(false);
        return;
      }

      const roadmapData = await generateSkillRoadmap(weakSkills, 60);
      setRoadmap(roadmapData);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setRoadmapError('Failed to generate roadmap. Please try again later.');
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  if (isLoading) {
    return (
      <div className="student-dashboard">
        <Navbar />
        <div className="dashboard-container">
          <div className="loading-state">
            <div className="loading"></div>
            <p>Loading your data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <Navbar />

      <div className="dashboard-container">
        {studentData ? (
          <>
            {isTrainerView && (
              <>
                <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
                  <strong>👨‍🏫 Trainer View:</strong> Viewing {studentData.Student_Name}'s dashboard
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => navigate('/trainer/dashboard')}
                  style={{ marginBottom: '1rem', width: 'auto' }}
                >
                  ← Back to Trainer Dashboard
                </button>
              </>
            )}

            {/* Student Info Section */}
            <div className="student-info-section">
              <div className="info-card">
                <h2>{studentData.Student_Name}</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Student ID:</span>
                    <span className="value">{studentData.Student_ID}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Batch:</span>
                    <span className="value">{studentData.Batch}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Course:</span>
                    <span className="value">{studentData.Course}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">City:</span>
                    <span className="value">{studentData.City}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Education:</span>
                    <span className="value">{studentData.Education}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Experience:</span>
                    <span className="value">{studentData.Experience} years</span>
                  </div>
                </div>
              </div>

              {/* Placement Status */}
              <div className="placement-card">
                <h3>Placement Status</h3>
                <div className="status-container">
                  <span
                    className={`status-badge status-${studentData.Placement_Status.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {studentData.Placement_Status}
                  </span>
                  {studentData.Placed_Salary && studentData.Placed_Salary !== '0' && (
                    <div className="salary-info">
                      <p className="salary-label">Offered Salary</p>
                      <p className="salary-value">{studentData.Placed_Salary}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Placement Readiness Pie Chart */}
              <div className="readiness-card">
                <h3>Placement Readiness</h3>
                {(() => {
                  const readinessScore = Number(studentData.Placement_Readiness_Score) || 0;
                  console.log('Placement Readiness Score:', readinessScore, studentData.Placement_Readiness_Score);
                  return (
                    <PieChart 
                      percentage={readinessScore} 
                      size={180}
                      strokeWidth={14}
                      label="Readiness Score"
                    />
                  );
                })()}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="performance-section">
              <h2>Your Performance Scores</h2>
              <div className="metrics-grid">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div className="metric-icon">{metric.icon}</div>
                    <h4>{metric.label}</h4>
                    
                    <div className="metric-content">
                      <div className="score-display">
                        <span className="score">{metric.score}</span>
                        {!metric.showOnlyScore && <span className="max-score">/ {metric.maxScore}</span>}
                        {metric.suffix && <span className="suffix">{metric.suffix}</span>}
                      </div>

                      {!metric.showOnlyScore && (
                        <>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${getPercentage(metric.score, metric.maxScore)}%`,
                                backgroundColor: getScoreColor(metric.score, metric.maxScore),
                              }}
                            ></div>
                          </div>

                          <div className="percentage">
                            {getPercentage(metric.score, metric.maxScore)}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="summary-section">
              <div className="summary-card">
                <h3>📊 Overall Summary</h3>
                <div className="summary-content">
                  <p>
                    <strong>Course:</strong> {studentData.Course}
                  </p>
                  <p>
                    <strong>Skill Score:</strong> {studentData.Skill_Score}/100
                  </p>
                  <p>
                    <strong>Communication Score:</strong> {studentData.Communication_Score}/100
                  </p>
                  <p>
                    <strong>Mock Average:</strong> {studentData.Mock_Average}/100
                  </p>
                  <p>
                    <strong>Interview Average:</strong> {studentData.Interview_Average}/100
                  </p>
                  <p>
                    <strong>Total Applications:</strong> {studentData.Applications_Count || 0}
                  </p>
                  <p>
                    <strong>Projects Completed:</strong> {studentData.Projects_Complete || 0}
                  </p>
                  <p>
                    <strong>Profile Completion:</strong> {studentData.Profile_Completion_Score}%
                  </p>
                  <p>
                    <strong>Attendance:</strong> {studentData.Attendance || 75}%
                  </p>
                  <p>
                    <strong>Placement Readiness Score:</strong> {studentData.Placement_Readiness_Score}/100
                  </p>
                </div>
              </div>

              <div className="tips-card">
                <h3>💡 Tips for Improvement</h3>
                <ul>
                  {studentData.Skill_Score < 75 && (
                    <li>Focus on improving your technical skills through practice.</li>
                  )}
                  {studentData.Communication_Score < 75 && (
                    <li>Practice communication skills through mock interviews.</li>
                  )}
                  {studentData.Mock_Average < 75 && (
                    <li>Take more mock tests to improve your performance.</li>
                  )}
                  {studentData.Interview_Average < 75 && (
                    <li>Prepare more for interviews to improve your performance.</li>
                  )}
                  {studentData.Projects_Complete < 7 && (
                    <li>Complete more projects to strengthen your portfolio.</li>
                  )}
                  {studentData.Profile_Completion_Score < 90 && (
                    <li>Complete your profile to increase visibility to recruiters.</li>
                  )}
                  {studentData.Applications_Count < 15 && (
                    <li>Apply to more job opportunities to increase your chances.</li>
                  )}
                  {(studentData.Attendance || 75) < 75 && (
                    <li>Improve your attendance to maintain good academic standing.</li>
                  )}
                </ul>
              </div>

              {/* AI Roadmap Section */}
              <div className="roadmap-card">
                <h3>🤖 AI-Powered Skill Roadmap</h3>
                <p className="roadmap-description">
                  Get personalized learning roadmaps for your weak skills using AI analysis
                </p>
                <button
                  className="btn-generate-roadmap"
                  onClick={handleGenerateRoadmap}
                  disabled={isGeneratingRoadmap}
                >
                  {isGeneratingRoadmap ? '🔄 Generating Roadmap...' : '🚀 Generate AI Roadmap'}
                </button>

                {roadmapError && (
                  <div className={`alert ${roadmapError.includes('Great job') ? 'alert-success' : 'alert-error'}`}>
                    {roadmapError}
                  </div>
                )}

                {roadmap.length > 0 && (
                  <div className="roadmap-container">
                    {roadmap.map((item, index) => (
                      <div key={index} className="roadmap-item">
                        <div className="roadmap-header">
                          <h4 className="roadmap-skill">{item.skill}</h4>
                          <div className="roadmap-scores">
                            <span className="current-score">Current Score: {item.currentScore}</span>
                          </div>
                        </div>
                        <div className="roadmap-steps">
                          <h5>📋 Improvement Steps:</h5>
                          <ol>
                            {item.roadmap.map((step: string, stepIndex: number) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="error-state">
            <h2>⚠️ {message}</h2>
            <p>Please refresh the page or contact your trainer for assistance.</p>
          </div>
        )}
      </div>
    </div>
  );
};
