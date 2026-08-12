import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStudentData } from '../../context/StudentDataContext';
import { type Student } from '../../utils/types';
import { Navbar } from '../Navbar/Navbar';
import './Auth.css';

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    city: '',
    education: '',
    experience: '',
  });
  const [citySearch, setCitySearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState({ studentId: '', name: '' });
  const [countdown, setCountdown] = useState(3);
  const { students, setStudents, reloadData } = useStudentData();
  const navigate = useNavigate();

  // Get unique values from student data for dropdowns
  const uniqueCourses = Array.from(new Set(students.map(s => s.Course))).filter(Boolean);
  const uniqueCities = Array.from(new Set(students.map(s => s.City))).filter(Boolean);
  const uniqueExperiences = Array.from(new Set(students.map(s => s.Experience))).filter(Boolean);

  // Reload student data from localStorage when component mounts to get latest students
  useEffect(() => {
    const loadLatestStudents = () => {
      const savedStudents = localStorage.getItem('allStudents');
      if (savedStudents) {
        console.log('Signup page: Loading latest students from localStorage');
        setStudents(JSON.parse(savedStudents));
      }
    };
    loadLatestStudents();
  }, []);

  // Filter cities based on search
  const filteredCities = uniqueCities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Get most common values for defaults
  const getCommonValue = (key: keyof Student) => {
    const values = students.map(s => s[key]).filter(Boolean);
    if (values.length === 0) return '';
    
    const frequency: Record<string, number> = {};
    values.forEach(v => {
      const strV = String(v);
      frequency[strV] = (frequency[strV] || 0) + 1;
    });
    
    return Object.entries(frequency).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  };

  const generateStudentId = () => {
    // Get all students including unsaved ones
    const unsavedStudents = JSON.parse(localStorage.getItem('unsavedStudents') || '[]');
    const allStudents = [...students, ...unsavedStudents];
    
    console.log('Current students list length:', students.length);
    console.log('Unsaved students length:', unsavedStudents.length);
    console.log('Total students for ID generation:', allStudents.length);
    console.log('All students:', allStudents.map(s => ({ id: s.Student_ID, name: s.Student_Name })));
    
    if (allStudents.length === 0) return 'STU100001';
    
    // Get all student IDs and find the highest numeric part
    const numericIds = allStudents
      .map(s => {
        const match = s.Student_ID.match(/STU(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(id => id > 0);
    
    console.log('Numeric IDs:', numericIds);
    
    if (numericIds.length === 0) return 'STU100001';
    
    const maxId = Math.max(...numericIds);
    const newId = maxId + 1;
    console.log('Max ID:', maxId, 'New ID:', newId);
    
    return `STU${newId}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.course || !formData.city || !formData.education || !formData.experience) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      // Generate new student ID
      const newStudentId = generateStudentId();
      
      // Get common values for defaults
      const commonValues = {
        Batch: getCommonValue('Batch'),
        Skill_Score: getCommonValue('Skill_Score') || '70',
        Communication_Score: getCommonValue('Communication_Score') || '70',
        Mock_Average: getCommonValue('Mock_Average') || '70',
        Interview_Average: getCommonValue('Interview_Average') || '70',
        Projects_Complete: getCommonValue('Projects_Complete') || '0',
        Applications_Count: getCommonValue('Applications_Count') || '0',
        Profile_Completion_Score: getCommonValue('Profile_Completion_Score') || '70',
        Placement_Readiness_Score: getCommonValue('Placement_Readiness_Score') || '70',
        Placement_Status: getCommonValue('Placement_Status') || 'Not Applied',
        Placed_Salary: getCommonValue('Placed_Salary') || '0',
        Attendance: getCommonValue('Attendance') || '75',
      };

      // Create new student object
      const newStudent: Student = {
        Student_ID: newStudentId,
        Student_Name: formData.name,
        Batch: commonValues.Batch as string,
        Course: formData.course,
        City: formData.city,
        Education: formData.education,
        Experience: formData.experience,
        Skill_Score: Number(commonValues.Skill_Score),
        Communication_Score: Number(commonValues.Communication_Score),
        Mock_Average: Number(commonValues.Mock_Average),
        Interview_Average: Number(commonValues.Interview_Average),
        Projects_Complete: Number(commonValues.Projects_Complete),
        Applications_Count: Number(commonValues.Applications_Count),
        Profile_Completion_Score: Number(commonValues.Profile_Completion_Score),
        Placement_Readiness_Score: Number(commonValues.Placement_Readiness_Score),
        Placement_Status: commonValues.Placement_Status as string,
        Placed_Salary: commonValues.Placed_Salary as string,
        Attendance: Number(commonValues.Attendance),
      };

      console.log('New student created:', newStudent);
      
      // Check if student already exists to avoid duplicates
      const existingStudent = students.find(s => s.Student_ID === newStudentId);
      if (existingStudent) {
        setError('A student with this ID already exists. Please try again.');
        setLoading(false);
        return;
      }
      
      // Add to existing students
      const updatedStudents = [...students, newStudent];
      
      // Save to localStorage IMMEDIATELY
      localStorage.setItem('allStudents', JSON.stringify(updatedStudents));
      console.log('Saved to localStorage, total students:', updatedStudents.length);
      
      // Also save to unsavedStudents for later Excel update (avoid duplicates)
      const unsavedStudents = JSON.parse(localStorage.getItem('unsavedStudents') || '[]');
      const unsavedIds = new Set(unsavedStudents.map(s => s.Student_ID));
      if (!unsavedIds.has(newStudentId)) {
        unsavedStudents.push(newStudent);
        localStorage.setItem('unsavedStudents', JSON.stringify(unsavedStudents));
        console.log('Added to unsavedStudents, total:', unsavedStudents.length);
      }
      
      // Update context state
      setStudents(updatedStudents);
      console.log('Updated context state with', updatedStudents.length, 'students');
      
      // Set loading to false to allow popup to show
      setLoading(false);
      
      // Show credentials popup immediately
      setCredentials({ studentId: newStudentId, name: formData.name });
      setShowCredentials(true);
      
      // Start countdown
      setCountdown(3);
      
      // Wait 3 seconds, then redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showCredentials && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showCredentials, countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (students.length === 0) {
    return (
      <div className="auth-container">
        <Navbar />
        <div className="auth-card">
          <div className="auth-header">
            <img src="/placify_logo_v2.png" alt="Logo" className="auth-logo" />
            <p>Student Registration</p>
          </div>
          <div className="alert alert-error">
            Student data not loaded. Please ensure the Excel file is available before signing up.
          </div>
          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <Navbar />
      <div className="auth-card">
        <div className="auth-header">
          <img src="/placify_logo_v2.png" alt="Logo" className="auth-logo" />
          <p>Student Registration</p>
        </div>

        {showCredentials ? (
          <div className="credentials-popup">
            <h3>Registration Successful!</h3>
            <div className="credentials-info">
              <p><strong>Your Student ID:</strong> {credentials.studentId}</p>
              <p><strong>Your Name:</strong> {credentials.name}</p>
            </div>
            <p className="popup-timer">Redirecting to login in {countdown} seconds...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="name">Student Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="course">Course:</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Select Course</option>
                  {uniqueCourses.map(course => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  list="city-list"
                  value={formData.city}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    handleChange(e);
                  }}
                  placeholder="Search or select city"
                  required
                  disabled={loading}
                />
                <datalist id="city-list">
                  {filteredCities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="form-group">
                <label htmlFor="education">Education:</label>
                <input
                  id="education"
                  name="education"
                  type="text"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Enter your education (e.g., B.Tech, MCA)"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Experience:</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Select Experience</option>
                  {uniqueExperiences.map(exp => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary btn-login"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};