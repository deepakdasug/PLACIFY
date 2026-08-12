# PLACIFY - Training Institute Management System

## 🚀 Application Overview

PLACIFY is a comprehensive training institute management system built with React.js and SheetJS for managing student performance, placement tracking, and trainer analytics.

## 🌐 Access the Application

**Website Link:** http://localhost:5177/  
**Browser Preview:** http://127.0.0.1:59337

## 👥 User Types & Authentication

### Student Login
Students now login using their **Student ID** and **Name** from the Excel file:
- **Student ID:** Enter your Student ID from the Excel file (e.g., STU001)
- **Name:** Enter your full name exactly as it appears in the Excel file
- The system will match these credentials against the student data in `public/student_data.xlsx`

### Trainer Login
Trainers still use email and password:
- **Email:** `trainer@example.com`
- **Password:** `password123`

### Demo Credentials
The login page provides demo buttons that auto-fill credentials:
- **Student Demo:** Uses the first student from your Excel file
- **Trainer Demo:** Uses trainer@example.com / password123

## 📊 Features Implemented

### 🎓 Student Dashboard Features

1. **Personal Information Display**
   - Student ID, Name, Batch, Course
   - City, Education, Experience

2. **Performance Metrics** (Based on Excel Data)
   - Skill Score
   - Communication Score
   - Mock Average
   - Interview Average
   - Projects Completed
   - Applications Submitted
   - Profile Completion Percentage
   - Attendance Percentage

3. **Placement Readiness Pie Chart**
   - Skill Score, Communication Score
   - Mock Average, Interview Average
   - Projects Completed, Applications Submitted
   - Profile Completion Percentage
   - **Attendance** (New Feature)
   - Placement Readiness Score

5. **Placement Readiness Pie Chart**
   - Visual circular progress indicator
   - Color-coded based on performance:
     - Green: ≥80%
     - Orange: 60-79%
     - Yellow: 40-59%
     - Red: <40%

6. **Placement Status**
   - Current placement status with visual badges
   - Salary information if placed

7. **Improvement Tips**
   - Personalized suggestions based on performance

### 👨‍🏫 Trainer Dashboard Features

1. **Student Data Management**
   - View all student records in a table
   - Filter by course, placement status
   - Search by student name or ID

2. **Statistics Overview**
   - Total students count
   - Placed students count
   - Placement rate percentage
   - Number of courses

3. **Data Export**
   - Export student data to Excel
   - **"Show Overall Analysis"** button generates Excel with analysis dashboard

4. **Excel File Upload**
   - Upload new student data via Excel file
   - Automatic data processing and validation

5. **Data Reload**
   - Refresh data from Excel file
   - Fallback to localStorage if Excel unavailable

## 📁 Excel File Setup

### Required Excel Columns

Your Excel file (`student_data.xlsx`) should include these columns:

- `Student_ID` - Unique student identifier
- `Student_Name` - Full name of the student
- `Batch` - Batch/Year information
- `Course` - Course name
- `City` - Student's city
- `Education` - Educational qualification
- `Experience` - Work experience in years
- `Skill_Score` - Technical skill score (0-100)
- `Communication_Score` - Communication score (0-100)
- `Mock_Average` - Mock interview average (0-100)
- `Interview_Average` - Interview average (0-100)
- `Projects_Complete` - Number of projects completed
- `Applications_Count` - Number of job applications
- `Attendance` - Attendance percentage (0-100) *[Optional, defaults to 75%]*
- `Profile_Completion_Score` - Profile completion percentage (0-100)
- `Placement_Readiness_Score` - Overall readiness score (0-100)
- `Placement_Status` - Current placement status
- `Placed_Salary` - Salary if placed (LPA)

### Excel File Location

Place your Excel file at: `public/student_data.xlsx`

The application will automatically load this file on startup.

## 🎨 UI Design

The application follows a clean, professional design with:
- **95% White** - Clean, modern background
- **5% Grey** - Subtle accents and borders
- **Blue Accent Color** - Primary actions and highlights
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🔧 Technical Stack

- **Frontend:** React.js with TypeScript
- **Build Tool:** Vite
- **Excel Processing:** SheetJS (xlsx)
- **Routing:** React Router
- **State Management:** React Context API
- **Styling:** CSS with CSS Variables

## 📝 Component Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Home.tsx          # Landing page
│   │   ├── Login.tsx         # Login form
│   │   └── Signup.tsx        # Signup form
│   ├── Navbar/
│   │   └── Navbar.tsx        # Navigation bar
│   ├── PieChart/
│   │   ├── PieChart.tsx      # Circular progress chart
│   │   └── PieChart.css
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── StudentDashboard/
│   │   ├── StudentDashboard.tsx # Student view
│   │   └── StudentDashboard.css
│   └── TrainerDashboard/
│       ├── TrainerDashboard.tsx # Trainer view
│       ├── ExcelUpload.tsx       # Excel upload component
│       ├── TrainerDashboard.css
│       └── ExcelUpload.css
├── context/
│   ├── AuthContext.tsx       # Authentication state
│   └── StudentDataContext.tsx # Student data state
├── utils/
│   ├── types.ts             # TypeScript types
│   ├── mockData.ts          # Mock authentication data
│   └── excelUtils.ts        # Excel processing utilities
└── styles/
    ├── global.css           # Global styles
    └── Home.css             # Home page styles
```

## � Student Registration

Students are automatically registered through the Excel file. To add a new student:
1. Add their details to the `student_data.xlsx` file
2. Include all required columns (Student_ID, Student_Name, etc.)
3. Place the updated file in the `public/` folder
4. The student can then login using their Student ID and Name

## �🔄 How to Update Data

### Method 1: Excel File Update (Recommended)
1. Update your `student_data.xlsx` file with new student data
2. Replace the file in the `public/` folder
3. Refresh the application
4. Data will automatically reload

### Method 2: Upload via Trainer Dashboard
1. Login as trainer
2. Use the Excel upload feature
3. Select your updated Excel file
4. Data will be processed and displayed

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🐛 Troubleshooting

### Data Not Loading
- Ensure `student_data.xlsx` is in the `public/` folder
- Check that Excel file has all required columns
- Refresh the page after updating the Excel file
- Check browser console for errors

### Authentication Issues
- **Students:** Ensure your Student ID and Name exactly match the Excel file
- **Trainers:** Use the demo credentials provided above
- Clear browser localStorage if experiencing issues
- Ensure the Excel file is loaded before attempting student login
- Check that Student ID and Name are spelled correctly (case-insensitive)

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors in the console
- Ensure all type imports use `type` keyword

## 📈 Future Enhancements

Potential features for future development:
- Backend API integration
- Real database storage
- Advanced analytics and reporting
- Email notifications
- Attendance tracking system
- Interview scheduling
- Resume builder integration

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the browser console for errors
3. Ensure Excel file format is correct
4. Verify demo credentials are being used correctly

---

**Note:** This is a demonstration application using mock authentication and Excel-based data storage. For production use, implement proper backend authentication and database integration.