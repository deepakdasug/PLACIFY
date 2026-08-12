import { Navbar } from '../Navbar/Navbar';
import './About.css';

export const About: React.FC = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1>About Us</h1>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              We are dedicated to providing high-quality training in MERN Development, Data Analytics, 
              and Full Stack Development. Our goal is to equip students with the skills they need 
              to succeed in the tech industry.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Offer</h2>
            <ul>
              <li>Comprehensive MERN Stack training</li>
              <li>Data Analytics with industry-standard tools</li>
              <li>Full Stack Development courses</li>
              <li>Practical, hands-on projects</li>
              <li>Placement assistance and career guidance</li>
              <li>Regular performance tracking and feedback</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Our Approach</h2>
            <p>
              We believe in learning by doing. Our curriculum is designed to give students real-world 
              experience through projects, internships, and industry collaborations. Our experienced 
              trainers provide personalized attention to ensure every student reaches their full potential.
            </p>
          </div>

          <div className="about-section">
            <h2>Success Stories</h2>
            <p>
              Over the years, we have helped hundreds of students achieve their career goals. 
              Our alumni work at leading tech companies and have built successful careers 
              in software development, data analysis, and full-stack engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
