# 🎓 PLACIFY - Training Institute Management System

## 📚 Placement Intelligence Platform

A comprehensive React-based training institute management portal for students learning MERN Development, Data Analytics, and Full Stack Development.

## 🌟 Features

### 👥 User Roles
- **Student** - View personal performance, track placement readiness, monitor attendance
- **Trainer** - View class analytics, search students, export data, access Google Sheets

### 🎯 Key Features
- ✅ Excel-based data management using SheetJS
- ✅ Auto-generated Student IDs
- ✅ Smart dropdowns (Course, City from Excel data)
- ✅ Real-time performance tracking
- ✅ Placement readiness score calculation
- ✅ Top 10 students ranking
- ✅ Data export to Excel
- ✅ Google Sheets integration
- ✅ Responsive design (95% white, 5% grey color scheme)

## 🚀 Technologies Used

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Routing:** React Router
- **Data Handling:** SheetJS (XLSX)
- **State Management:** React Context API
- **Styling:** CSS (Component-based)
- **Storage:** LocalStorage

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd PLACIFY
```

2. Install dependencies
```bash
npm install
```

3. Place your Excel file
- Put `student_data.xlsx` in the `public/` folder
- Put `placify_logo_v2.png` in the `public/` folder

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 📁 Project Structure

```
PLACIFY/
├── public/
│   ├── student_data.xlsx          # Student data source
│   ├── placify_logo_v2.png        # Company logo
│   └── APPLICATION_GUIDE.md       # Detailed documentation
├── src/
│   ├── components/
│   │   ├── Auth/                  # Login, Signup, Home
│   │   ├── Navbar/                # Navigation bar
│   │   ├── StudentDashboard/      # Student dashboard
│   │   ├── TrainerDashboard/      # Trainer dashboard
│   │   ├── About/                 # About page
│   │   └── Contact/               # Contact page
│   ├── context/
│   │   ├── AuthContext.tsx        # Authentication state
│   │   └── StudentDataContext.tsx # Student data state
│   ├── utils/
│   │   ├── excelUtils.ts          # Excel operations
│   │   └── types.ts               # TypeScript types
│   ├── styles/
│   │   ├── global.css             # Global styles
│   │   └── Home.css               # Home page styles
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # Entry point
```

## 🔐 Authentication

### Student Login
- **Credentials:** Student ID + Student Name
- Data validated against Excel file

### Trainer Login
- **Trainer ID:** `TR1`
- **Trainer Name:** `ACCIO1`

## 📊 Features Overview

### Student Dashboard
- Personal information display
- Placement status
- Placement readiness score (circular progress)
- Performance metrics (Skills, Communication, Mock Interview, Aptitude)
- Attendance tracking
- Projects completed
- Profile completion

### Trainer Dashboard
- Overall class analytics
- Top 10 students by placement readiness
- Student search by ID/Name
- Export updated data to Excel
- Google Sheets integration for detailed analysis

## 📖 Documentation

For detailed information about how the application works, please refer to:
[APPLICATION_GUIDE.md](public/APPLICATION_GUIDE.md)

## 🎨 Design

- **Color Scheme:** 95% white, 5% grey
- **Typography:** System fonts with Poppins for headings
- **Responsive:** Works on desktop, tablet, and mobile
- **Component-based:** Modular React components

## 📝 Excel File Structure

The `student_data.xlsx` file should contain:
- Student ID
- Student Name
- Batch
- Course
- City
- Education
- Experience
- Skill Scores (varies by course)
- Communication Score
- Mock Interview Score
- Interview Score
- Aptitude Score
- Attendance
- Projects Completed
- Profile Completion
- Placement Readiness Score
- Placement Status

## 🔧 Troubleshooting

For common issues and solutions, please refer to the [APPLICATION_GUIDE.md](public/APPLICATION_GUIDE.md) troubleshooting section.

## 📞 Support

For questions or support, please visit the Contact page in the application.

## 🌐 Navigation

- **Home** - Landing page with course information
- **About** - Information about the training institute
- **Contact** - Contact form and information
- **Sign Up** - Student registration
- **Login** - Student/Trainer authentication

## 🎯 Courses Supported

- **MERN Development** - MongoDB, Express, React, Node.js
- **Data Analytics** - Excel, Python, SQL, Power BI
- **Full Stack Development** - Frontend, Backend, Database, API

## 📈 Performance Metrics

- Skill Scores (40%)
- Communication (20%)
- Mock Interview (20%)
- Interview Performance (10%)
- Attendance (10%)

## 🚀 Getting Started

1. Click "Sign Up" in the navbar
2. Fill the registration form
3. Note your Student ID from the popup
4. Login with your credentials
5. Explore your dashboard

## 📄 License

This project is powered by AccioJob - Placement Intelligence Platform

## 🎉 Acknowledgments

- **Powered by AccioJob**
- **Placement Intelligence Platform**

---

**🎓 PLACIFY - Your Path to Placement Success!**
