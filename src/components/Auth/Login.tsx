import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStudentData } from '../../context/StudentDataContext';
import { Navbar } from '../Navbar/Navbar';
import './Auth.css';

export const Login: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [userType, setUserType] = useState<'student' | 'trainer'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { students } = useStudentData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (userType === 'student') {
        // Check if student data is loaded
        if (students.length === 0) {
          throw new Error('Student data not loaded. Please ensure the Excel file is available in the public folder.');
        }
        // Student login with ID and Name
        login(studentId, studentName, userType, students);
      } else {
        // Trainer login with fixed credentials (TR1/ACCIO1)
        login(trainerId, trainerName, userType);
      }
      navigate(userType === 'trainer' ? '/trainer/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Navbar />
      <div className="auth-card">
        <div className="auth-header">
          <img src="/placify_logo_v2.png" alt="Logo" className="auth-logo" />
          <p>Training Institute Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="userType">Login As:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'student' | 'trainer')}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>

          {userType === 'student' ? (
            <>
              <div className="form-group">
                <label htmlFor="studentId">Student ID:</label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your Student ID"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentName">Student Name:</label>
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="trainerId">Trainer ID:</label>
                <input
                  id="trainerId"
                  type="text"
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                  placeholder="Enter your Trainer ID"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="trainerName">Trainer Name:</label>
                <input
                  id="trainerName"
                  type="text"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  placeholder="Enter your Trainer Name"
                  required
                  disabled={loading}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn-primary btn-login"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};
