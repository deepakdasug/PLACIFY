# 🎓 PLACIFY - Training Institute Management System
## 📚 Your Complete Guide to the Application

---

## 🌟 **Welcome to PLACIFY!**

PLACIFY is a **Placement Intelligence Platform** powered by AccioJob, designed to help training institutes manage student performance, track placement readiness, and provide comprehensive analytics for both students and trainers.

---

## 🚀 **How It Works - Overview**

```
┌─────────────────────────────────────────────────────────┐
│  Excel File (student_data.xlsx) ← Data Source          │
│           ↓                                            │
│  SheetJS/XLSX Library → Reads & Parses Data           │
│           ↓                                            │
│  React Application → Displays & Manages Data          │
│           ↓                                            │
│  Two User Roles: Student & Trainer                    │
└─────────────────────────────────────────────────────────┘
```

---

## 👥 **User Roles & Access**

### 🎯 **Student Role**
- 👤 Login with **Student ID** and **Student Name**
- 📊 View personal performance dashboard
- 📈 Track placement readiness score
- 📅 Monitor attendance records
- 🎓 View course and batch information
- ✅ Check placement status

### 👨‍🏫 **Trainer Role**
- 🔐 Fixed credentials:
  - **Trainer ID:** `TR1`
  - **Trainer Name:** `ACCIO1`
- 📊 View overall class analytics
- 🏆 See Top 10 students by placement readiness
- 🔍 Search individual students by ID or Name
- 📥 Export updated data to Excel
- 📈 Access Google Sheets for detailed analysis

---

## 📋 **Step-by-Step Workflow**

### 🔄 **1. Data Loading Process**
```
Step 1: Application starts
        ↓
Step 2: Reads student_data.xlsx from public folder
        ↓
Step 3: SheetJS library parses the Excel file
        ↓
Step 4: Data is stored in React Context
        ↓
Step 5: Available throughout the application
```

### 📝 **2. Student Registration (Sign Up)**
```
Step 1: Click "Sign Up" button in navbar
        ↓
Step 2: Fill registration form:
        • Student Name
        • Course (dropdown from Excel data)
        • City (searchable dropdown from Excel data)
        • Education
        • Experience
        ↓
Step 3: System auto-generates unique Student ID
        • Pattern: STU followed by next number
        • Example: STU101, STU102, etc.
        ↓
Step 4: Credentials popup shows:
        • Your Student ID
        • Your Name
        ↓
Step 5: Auto-redirects to login page after 3 seconds
        ↓
Step 6: Login with your new credentials
```

### 🔐 **3. Login Process**

#### **For Students:**
```
Step 1: Navigate to Login page
        ↓
Step 2: Select "Student" from dropdown
        ↓
Step 3: Enter Student ID (e.g., STU101)
        ↓
Step 4: Enter Student Name (must match Excel data)
        ↓
Step 5: Click Login
        ↓
Step 6: Access Student Dashboard
```

#### **For Trainers:**
```
Step 1: Navigate to Login page
        ↓
Step 2: Select "Trainer" from dropdown
        ↓
Step 3: Enter Trainer ID: TR1
        ↓
Step 4: Enter Trainer Name: ACCIO1
        ↓
Step 5: Click Login
        ↓
Step 6: Access Trainer Dashboard
```

### 📊 **4. Student Dashboard Features**

#### **📋 Student Information Card**
- ✅ **Student ID** - Unique identifier
- ✅ **Batch** - Current batch assignment
- ✅ **Course** - enrolled course (MERN, Data Analytics, Full Stack)
- ✅ **City** - Location
- ✅ **Education** - Educational background
- ✅ **Experience** - Work experience

#### **🎯 Placement Status Card**
- ✅ Shows current placement status
- ✅ Values: "Placed", "Not Placed", "Selected", etc.
- ✅ Color-coded for quick identification

#### **📈 Placement Readiness Score Card**
- ✅ Circular progress indicator
- ✅ Shows percentage score (0-100%)
- ✅ Based on multiple performance metrics
- ✅ Visual representation of readiness

#### **📊 Performance Metrics Displayed**
- ✅ **Skill Scores** - Technical skill performance
- ✅ **Communication** - Communication skills assessment
- ✅ **Mock Interview** - Mock interview performance
- ✅ **Aptitude** - Aptitude test scores
- ✅ **Attendance** - Attendance percentage
- ✅ **Projects Completed** - Number of projects done
- ✅ **Profile Completion** - Profile completeness score

### 🏆 **5. Trainer Dashboard Features**

#### **📊 Overall Analytics**
- ✅ **Total Students** - Count of all students
- ✅ **Placed Students** - Number of placed students
- ✅ **Courses** - Available courses count
- ✅ **Average Skill Score** - Class average
- ✅ **Average Communication** - Class average
- ✅ **Average Mock Score** - Class average
- ✅ **Average Interview** - Class average
- ✅ **Average Placement Readiness** - Class average

#### **🏆 Top 10 Students Table**
- ✅ Rank (1-10)
- ✅ Student ID
- ✅ Student Name
- ✅ Course
- ✅ Placement Readiness Score
- ✅ Placement Status
- ✅ Sorted by highest placement readiness score

#### **🔍 Student Search Feature**
- ✅ Search by Student ID
- ✅ Search by Student Name
- ✅ Both fields must match
- ✅ Click "View" to see student's dashboard
- ✅ Trainer can view individual student performance

#### **📥 Data Export**
- ✅ Export updated Excel file
- ✅ Includes all original students
- ✅ Includes newly registered students
- ✅ Downloads as .xlsx file
- ✅ Can be used to update the source file

#### **📊 Google Sheets Integration**
- ✅ "Show Overall Analysis" button
- ✅ Opens Google Sheets in new tab
- ✅ Provides detailed analysis
- ✅ Link to pre-configured spreadsheet

---

## 💾 **Data Persistence & Management**

### 📁 **Excel File Structure**
```
student_data.xlsx contains:
├── Student ID
├── Student Name
├── Batch
├── Course
├── City
├── Education
├── Experience
├── Skill Scores (various skills based on course)
├── Communication Score
├── Mock Interview Score
├── Interview Score
├── Aptitude Score
├── Attendance
├── Projects Completed
├── Profile Completion
├── Placement Readiness Score
└── Placement Status
```

### 💾 **LocalStorage Usage**
```
Key: allStudents
Purpose: Store merged student data
├── Original Excel students
└── Newly registered students

Key: unsavedStudents
Purpose: Track new registrations
└── Students not yet exported to Excel
```

### 🔄 **Data Flow**
```
Excel File → Application → LocalStorage → Dashboard
                ↓
          New Signups → LocalStorage → Export → Excel
```

---

## 🎨 **Application Features**

### 🏠 **Home Page**
- ✅ Welcome message with company logo
- ✅ Course cards (MERN, Data Analytics, Full Stack)
- ✅ Training institute description
- ✅ Sign Up button in navbar
- ✅ Navigation links (Home, About, Contact)

### 🔐 **Authentication Pages**
- ✅ Login page with student/trainer options
- ✅ Sign up page with smart dropdowns
- ✅ Navbar visible on all pages
- ✅ Form validation
- ✅ Error handling

### 📊 **Dashboards**
- ✅ Student Dashboard - Personal performance view
- ✅ Trainer Dashboard - Class analytics view
- ✅ Responsive design
- ✅ Clean, professional UI
- ✅ 95% white, 5% grey color scheme

### 🌐 **Navigation**
- ✅ Home - Landing page
- ✅ About - Information about the institute
- ✅ Contact - Contact form and information
- ✅ Sign Up - Student registration
- ✅ Logout - Secure logout functionality

---

## 🛠️ **Technical Architecture**

### ⚙️ **Technologies Used**
```
Frontend Framework:     React
Language:               TypeScript
Build Tool:             Vite
Routing:                React Router
Data Handling:          SheetJS (XLSX)
State Management:       React Context API
Styling:                CSS (Component-based)
Storage:                LocalStorage
Data Source:            Excel File (.xlsx)
```

### 📁 **Project Structure**
```
PLACIFY/
├── public/
│   ├── student_data.xlsx          ← Student data source
│   ├── placify_logo_v2.png        ← Company logo
│   └── APPLICATION_GUIDE.md       ← This file
├── src/
│   ├── components/
│   │   ├── Auth/                  ← Login, Signup, Home
│   │   ├── Navbar/                ← Navigation bar
│   │   ├── StudentDashboard/      ← Student dashboard
│   │   ├── TrainerDashboard/      ← Trainer dashboard
│   │   ├── About/                 ← About page
│   │   ├── Contact/               ← Contact page
│   │   ├── PieChart/              ← Charts
│   │   └── ProtectedRoute/        ← Route protection
│   ├── context/
│   │   ├── AuthContext.tsx        ← Authentication state
│   │   └── StudentDataContext.tsx ← Student data state
│   ├── utils/
│   │   ├── excelUtils.ts          ← Excel operations
│   │   └── types.ts               ← TypeScript types
│   ├── styles/
│   │   ├── global.css             ← Global styles
│   │   └── Home.css               ← Home page styles
│   ├── App.tsx                    ← Main app component
│   └── main.tsx                   ← Entry point
└── package.json                   ← Dependencies
```

---

## 🎯 **Key Highlights**

### ✨ **Smart Features**
1. **🎯 Auto-generated Student IDs** - No manual ID assignment needed
2. **🔍 Smart Dropdowns** - Course and city options from Excel data
3. **🔐 Secure Trainer Access** - Fixed credentials for trainers
4. **📊 Real-time Analytics** - Instant performance insights
5. **🏆 Top 10 Ranking** - Identify top performers easily
6. **📥 Easy Export** - Download updated data anytime
7. **💾 Data Persistence** - New students saved automatically
8. **🎨 Clean UI** - Professional, modern interface

### 🎓 **Course-Specific Skills**

#### **📊 Data Analytics**
- ✅ Excel
- ✅ Python
- ✅ SQL
- ✅ Power BI

#### **💻 MERN Development**
- ✅ MongoDB
- ✅ Express
- ✅ React
- ✅ Node.js

#### **🌐 Full Stack Development**
- ✅ Frontend technologies
- ✅ Backend technologies
- ✅ Database management
- ✅ API development

#### **📝 Common Skills (All Courses)**
- ✅ Aptitude
- ✅ Communication

---

## 🔒 **Security Features**

### ✅ **Authentication**
- ✅ Student login validates against Excel data
- ✅ Trainer login uses fixed credentials
- ✅ Route protection for dashboards
- ✅ Secure logout functionality

### ✅ **Data Privacy**
- ✅ Trainers can't see full student table
- ✅ Students only see their own data
- ✅ No sensitive data in URLs
- ✅ No example credentials visible in UI

---

## 🚀 **How to Use This Application**

### 📝 **For Students**
```
1️⃣ Click "Sign Up" in navbar
2️⃣ Fill the registration form
3️⃣ Note your Student ID from popup
4️⃣ Go to Login page
5️⃣ Enter your Student ID and Name
6️⃣ Explore your dashboard
7️⃣ Track your progress
8️⃣ Work on improving your scores
```

### 👨‍🏫 **For Trainers**
```
1️⃣ Go to Login page
2️⃣ Select "Trainer" option
3️⃣ Enter Trainer ID: TR1
4️⃣ Enter Trainer Name: ACCIO1
5️⃣ View overall analytics
6️⃣ Check Top 10 students
7️⃣ Search individual students
8️⃣ Export updated data
9️⃣ Access Google Sheets for analysis
```

---

## 📈 **Performance Metrics Explained**

### 🎯 **Placement Readiness Score**
```
Calculated based on:
├── Skill Scores (40%)
├── Communication (20%)
├── Mock Interview (20%)
├── Interview Performance (10%)
└── Attendance (10%)
```

### 📊 **Skill Scores**
- Varies by course
- Reflects technical knowledge
- Updated regularly
- Key placement factor

### 💬 **Communication Score**
- Verbal communication
- Presentation skills
- Team collaboration
- Important for interviews

### 🎭 **Mock Interview Score**
- Performance in mock interviews
- Question handling
- Confidence level
- Preparation for real interviews

### 📝 **Aptitude Score**
- Problem-solving ability
- Logical reasoning
- Quantitative skills
- Analytical thinking

---

## 🎨 **UI/UX Design**

### 🎨 **Color Scheme**
- ✅ **95% White** - Clean, professional look
- ✅ **5% Grey** - Subtle accents and borders
- ✅ **Blue** - Primary action color
- ✅ **Green** - Success indicators
- ✅ **Gold** - Highlights and underlines

### 📱 **Responsive Design**
- ✅ Works on desktop
- ✅ Works on tablets
- ✅ Works on mobile devices
- ✅ Adaptive layouts

### 🎯 **User Experience**
- ✅ Intuitive navigation
- ✅ Clear call-to-actions
- ✅ Fast loading
- ✅ Smooth transitions
- ✅ Error feedback

---

## 🔧 **Troubleshooting**

### ❓ **Common Issues & Solutions**

#### **📥 Excel File Not Loading**
```
Problem: Student data not showing
Solution:
1. Check if student_data.xlsx exists in public folder
2. Verify file is not corrupted
3. Clear browser cache
4. Refresh the page
```

#### **🔐 Login Failed**
```
Problem: Can't login as student
Solution:
1. Verify Student ID is correct
2. Check Student Name matches exactly
3. Ensure you're registered first
4. Try signing up again
```

#### **📝 Sign Up Not Working**
```
Problem: Can't register new student
Solution:
1. Ensure Excel data is loaded
2. Fill all required fields
3. Check dropdowns have values
4. Try refreshing the page
```

#### **📊 Dashboard Not Showing Data**
```
Problem: Dashboard appears empty
Solution:
1. Check if you're logged in
2. Verify student data is loaded
3. Try logging out and back in
4. Check browser console for errors
```

---

## 📞 **Support & Contact**

### 📧 **Need Help?**
- Visit the **Contact** page
- Fill out the contact form
- Our team will assist you

### 📖 **Documentation**
- This guide covers all features
- Refer to specific sections
- Check troubleshooting for issues

---

## 🎉 **Conclusion**

PLACIFY is designed to make training institute management **simple, efficient, and effective**. Whether you're a **student** tracking your progress or a **trainer** monitoring class performance, this application provides all the tools you need in one place.

### 🌟 **Key Takeaways**
- ✅ Easy student registration
- ✅ Comprehensive performance tracking
- ✅ Powerful analytics for trainers
- ✅ Secure authentication
- ✅ Clean, modern interface
- ✅ Excel-based data management
- ✅ Export functionality
- ✅ Google Sheets integration

---

## 🚀 **Get Started Now!**

1. 📝 **Sign Up** as a new student
2. 🔐 **Login** with your credentials
3. 📊 **Explore** your dashboard
4. 📈 **Track** your progress
5. 🎯 **Improve** your scores
6. 🏆 **Achieve** placement success!

---

**🎓 PLACIFY - Your Path to Placement Success!**

*Powered by AccioJob | Placement Intelligence Platform*

---

*For questions or support, please visit the Contact page.*
