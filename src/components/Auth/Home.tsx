import { Navbar } from '../Navbar/Navbar';
import '../../styles/Home.css';

export const Home: React.FC = () => {

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <div className="home-header">
          <div className="h1-wrapper">
            <h1>Welcome To</h1>
          </div>
          <div className="home-logo-wrapper">
            <img src="/placify_logo_v2.png" alt="Logo" className="home-logo" />
          </div>
        </div>

        <div className="home-description">
          <p>
            A comprehensive training platform for aspiring developers and professionals.
            Learn MERN Development, Data Analytics, and Full Stack Development with
            guidance from experienced trainers.
          </p>

          <div className="courses-preview">
            <div className="course-card">
              <h3>MERN Development</h3>
              <p>Master MongoDB, Express, React, and Node.js for modern web applications.</p>
            </div>
            <div className="course-card">
              <h3>Data Analytics</h3>
              <p>Learn data analysis, visualization, and insights using industry tools.</p>
            </div>
            <div className="course-card">
              <h3>Full Stack Development</h3>
              <p>Build complete web applications from frontend to backend.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
