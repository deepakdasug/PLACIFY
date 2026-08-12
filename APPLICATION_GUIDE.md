# PLACIFY - Training Institute Management System

## 📋 Project Overview

PLACIFY is a comprehensive web application for managing a training institute where students learn:
- **MERN Development**
- **Data Analytics**
- **Full Stack Development**

The system has two types of users:
- **Students**: View their personal performance metrics and placement status
- **Trainers**: Manage all student data, upload Excel files, view analytics, and export reports

---

## 🎨 UI Design

The application follows a **95% White + 5% Grey** color scheme:
- **Primary Background**: White (#FFFFFF)
- **Secondary Background**: Light Grey (#F5F5F5)
- **Accent Color**: Blue (#1976D2)
- **Text Colors**: Dark Grey (#212121) and Medium Grey (#666666)
- **Utility Colors**: Green (success), Orange (warning), Red (danger)

---

## ⚡ Getting Started

### 1. Installation
```bash
cd PLACIFY
npm install
npm run dev
```

### 2. Access the Application
- **URL**: `http://localhost:5173/`
- **Port**: 5173 (default Vite port)

### 3. Login
Use one of these demo accounts:

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

**Trainer Account:**
- Email: `trainer@example.com`
- Password: `password123`

---

## 📊 Excel File Format

### Required Column Headers (Exact Match Required)

| Column Name | Type | Description |
|------------|------|-------------|
| Student_ID | String | Unique identifier (e.g., STU001) |
| Student_Name | String | Full name of student |
| Batch | String | Batch/cohort name (e.g., Batch-2024-Jan) |
| Course | String | Course name (MERN Development, Data Analytics, Full Stack Development) |
| City | String | City name |
| Education | String | Educational qualification |
| Experience | String/Number | Years of experience |
| Skill_Score | Number | 0-100 |
| Communication_Score | Number | 0-100 |
| Mock_Average | Number | 0-100 |
| Interview_Average | Number | 0-100 |
| Projects_Complete | Number | 0-10 |
| Applications_Count | Number | 0-50 |
| Profile_Completion_Score | Number | 0-100 |
| Placement_Readiness_Score | Number | 0-100 |
| Placement_Status | String | Selected, Interview Scheduled, Applied, Not Applied, Rejected |
| Placed_Salary | String | Salary or empty (e.g., "8.5 LPA") |

### Example Excel Data

```
| Student_ID | Student_Name      | Batch          | Course                  | City       | Education | Experience | Skill_Score | Communication_Score | Mock_Average | Interview_Average | Projects_Complete | Applications_Count | Profile_Completion_Score | Placement_Readiness_Score | Placement_Status      | Placed_Salary |
|------------|------------------|----------------|------------------------|------------|-----------|-----------|------------|-------------------|--------------|--------------------|-------------------|-------------------|-------------------------|--------------------------|-----------------------|---------------|
| STU001     | Aarav Sharma      | Batch-2024-Jan | MERN Development        | Delhi      | B.Tech    | 0         | 85         | 78                 | 82           | 80                 | 8                 | 15                | 95                        | 88                       | Selected              | 8.5 LPA       |
| STU002     | Priya Kumari      | Batch-2024-Jan | Data Analytics          | Bangalore  | B.Sc      | 1         | 92         | 88                 | 90           | 87                 | 10                | 22                | 98                        | 94                       | Selected              | 12 LPA        |
| STU003     | Rohit Verma       | Batch-2024-Jan | Full Stack Development  | Mumbai     | B.Tech    | 0         | 78         | 72                 | 75           | 73                 | 6                 | 10                | 80                        | 76                       | Interview Scheduled  |               |
```

---

## 👨‍🎓 Student Features

### Student Dashboard
After logging in, students can see:

1. **Personal Information Card**
   - Student ID, Name, Batch, Course
   - City, Education, Experience

2. **Placement Status Section**
   - Current placement status
   - Offered salary (if placed)

3. **Performance Metrics** (8 metrics shown with progress bars)
   - **Skill Score** (0-100)
   - **Communication Score** (0-100)
   - **Mock Test Average** (0-100)
   - **Interview Average** (0-100)
   - **Projects Completed** (0-10)
   - **Applications Submitted** (0-50)
   - **Profile Completion %** (0-100)
   - **Placement Readiness** (0-100)

4. **Summary Section**
   - Overview of key metrics
   - Course information
   - Quick statistics

5. **Improvement Tips**
   - Personalized suggestions based on performance
   - Tips are shown only for metrics below 75%

---

## 👨‍🏫 Trainer Features

### Trainer Dashboard
After logging in, trainers can:

1. **Upload Student Data**
   - Drag & drop Excel file upload
   - Supports .xlsx, .xls, .csv formats
   - Automatic validation and loading

2. **Statistics Overview**
   - Total Students count
   - Number of placed students
   - Placement rate percentage
   - Number of different courses

3. **View All Student Data**
   - Comprehensive table with all metrics
   - Sortable columns
   - Responsive scrolling for large tables

4. **Advanced Filtering**
   - **Filter by Course**: Select specific course (MERN, Data Analytics, Full Stack)
   - **Filter by Status**: Select specific placement status
   - **Search**: Search by student name or ID
   - **Reset Filters**: Clear all filters at once

5. **Action Buttons**
   - **📥 Export to Excel**: Download all student data as Excel file
   - **📊 Show Overall Analysis**: Generate and download analysis dashboard with:
     - Overall statistics
     - Average scores across all metrics
     - Course distribution
     - Placement status breakdown

6. **Data Visualization**
   - Status badges with color coding:
     - 🟢 Selected (Green)
     - 🟠 Interview Scheduled (Orange)
     - 🔵 Applied (Blue)
     - ⚪ Not Applied (Grey)
     - 🔴 Rejected (Red)

---

## 🔐 Authentication

### Login Flow
1. User selects "Student" or "Trainer" role
2. Enters email and password
3. System validates credentials (demo uses mock auth)
4. Redirects to appropriate dashboard

### Signup Flow
1. User enters name, email, password
2. Selects "Student" or "Trainer" role
3. Account is created and user is logged in
4. Redirected to their dashboard

### Session Management
- User session stored in localStorage
- Auto-login on page refresh
- Logout clears session data

---

## 📁 Project Structure

```
PLACIFY/
├── public/
│   ├── vite.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx          # Login page
│   │   │   ├── Signup.tsx         # Signup page
│   │   │   ├── Home.tsx           # Landing page
│   │   │   └── Auth.css           # Auth styling
│   │   │
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   └── Navbar.css         # Navbar styling
│   │   │
│   │   ├── StudentDashboard/
│   │   │   ├── StudentDashboard.tsx    # Student view
│   │   │   └── StudentDashboard.css    # Styling
│   │   │
│   │   ├── TrainerDashboard/
│   │   │   ├── TrainerDashboard.tsx    # Trainer view
│   │   │   ├── TrainerDashboard.css    # Styling
│   │   │   ├── ExcelUpload.tsx         # File upload component
│   │   │   └── ExcelUpload.css         # Upload styling
│   │   │
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.tsx      # Route protection HOC
│   │
│   ├── context/
│   │   └── AuthContext.tsx         # Authentication context
│   │
│   ├── utils/
│   │   ├── constants.ts            # App constants
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── mockData.ts             # Mock credentials
│   │   └── excelUtils.ts           # Excel import/export
│   │
│   ├── styles/
│   │   ├── global.css              # Global styles (95% white theme)
│   │   └── Home.css                # Home page styles
│   │
│   ├── assets/
│   │   ├── react.svg
│   │   ├── vite.svg
│   │   └── hero.png
│   │
│   ├── App.tsx                     # Main app with routing
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Base styles
│
├── .gitignore
├── .oxlintrc.json                  # Linting config
├── index.html                      # HTML entry point
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
└── README.md                       # This file
```

---

## 🔧 Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool & dev server
- **React Router**: Client-side routing
- **XLSX (SheetJS)**: Excel file handling
- **CSS3**: Styling

---

## 💾 Data Management

### Current Implementation (Demo Mode)
- **Storage**: Browser localStorage
- **Data Persistence**: Until cache is cleared
- **Data Flow**: Excel → Browser Memory → UI

### For Production (Recommended)
You'll need to:
1. Create backend API endpoints
2. Replace localStorage with API calls
3. Setup database (MongoDB, PostgreSQL, etc.)
4. Implement real authentication
5. Add security measures (CORS, JWT tokens, etc.)

---

## 🎯 How to Use

### For New Users

#### 1. As a Trainer:
```
1. Open http://localhost:5173/
2. Click "Login" → Select "Trainer"
3. Email: trainer@example.com, Password: password123
4. Click "Upload Student Data"
5. Select your Excel file (.xlsx, .xls, or .csv)
6. Wait for upload to complete
7. View statistics, filter data, export reports
8. Click "Show Overall Analysis" to see dashboard
```

#### 2. As a Student:
```
1. Open http://localhost:5173/
2. Click "Login" → Select "Student"
3. Email: student@example.com, Password: password123
4. View your performance metrics
5. See placement status and salary
6. Get personalized improvement tips
```

---

## 📈 Performance Metrics Breakdown

### Skill Score (0-100)
- Measures technical knowledge and coding ability
- Evaluated through assessments and coding challenges

### Communication Score (0-100)
- Evaluates verbal and written communication
- Based on presentation skills and interactions

### Mock Average (0-100)
- Average score from mock interviews
- Simulates real interview environment

### Interview Average (0-100)
- Average score from actual job interviews
- Final assessment of interview performance

### Projects Complete (0-10)
- Number of projects student has completed
- Demonstrates practical application of knowledge

### Applications Count (0-50)
- Number of job applications submitted
- Shows initiative and effort in job search

### Profile Completion % (0-100)
- How complete the student's profile is
- LinkedIn, portfolio, resume completeness

### Placement Readiness (0-100)
- Overall readiness for employment
- Aggregate of all performance factors

---

## 🎨 Color Coding System

### Performance Levels (Progress Bars)
- 🟢 **Green** (80-100%): Excellent
- 🟠 **Orange** (60-79%): Good
- 🔴 **Red** (0-59%): Needs Improvement

### Placement Status Badges
- 🟢 **Selected**: Student has received offer
- 🟠 **Interview Scheduled**: Interview upcoming
- 🔵 **Applied**: Application submitted
- ⚪ **Not Applied**: No application yet
- 🔴 **Rejected**: Application rejected

---

## 🐛 Common Issues & Solutions

### Issue: Excel upload fails
**Solution**: 
- Verify column names match exactly (case-sensitive)
- Ensure all required columns are present
- Check that score columns contain numbers only
- Try exporting to .xlsx format

### Issue: Student can't see their data
**Solution**:
- Verify Student_ID in Excel matches Student_ID in system
- Check browser localStorage is enabled
- Ensure trainer has uploaded file

### Issue: Styles not loading correctly
**Solution**:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check that global.css is imported in App.tsx

### Issue: Application crashes on page refresh
**Solution**:
- Check browser console for errors
- Verify localStorage data is valid JSON
- Clear localStorage and re-login

---

## 📝 File Upload Tips

1. **Before uploading:**
   - Open Excel file in a text editor to verify format
   - Ensure no merged cells
   - Check for special characters in names

2. **Column order doesn't matter** - system finds columns by header name

3. **File size limit** - typically 10MB (depends on browser)

4. **Supported formats:**
   - Excel: .xlsx (recommended), .xls
   - CSV: .csv (with commas)

---

## 🚀 Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

---

## 📞 Support & Customization

### To Change:

**Colors:**
- Edit `:root` variables in `src/styles/global.css`

**Layout:**
- Modify component files in `src/components/`

**Data Columns:**
- Update `Student` interface in `src/utils/types.ts`
- Modify Excel import logic in `src/utils/excelUtils.ts`

**Authentication:**
- Update `src/context/AuthContext.tsx`
- Change credentials in `src/utils/mockData.ts`

---

## ✅ Application Features Checklist

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Component-based architecture
- ✅ TypeScript type safety
- ✅ Excel file upload and import
- ✅ Excel file export and analysis
- ✅ Advanced filtering and search
- ✅ Performance metrics visualization
- ✅ Placement status tracking
- ✅ Student improvement tips
- ✅ Session management
- ✅ Protected routes
- ✅ 95% white + 5% grey UI theme
- ✅ Trainer and Student role separation
- ✅ Real-time statistics
- ✅ Status badge color coding

---

## 📄 License

This project is created for a training institute management system.

---

## 🎓 Future Enhancements

- Backend API integration
- Database implementation
- Email notifications
- Dashboard analytics
- Student progress tracking over time
- Batch performance comparison
- Interview scheduling system
- Resource library
- Live chat support
- Mobile app version

---

**Created with ❤️ for PLACIFY Training Institute**
