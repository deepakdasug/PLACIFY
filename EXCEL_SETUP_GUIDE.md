# 🚀 PLACIFY - Setup Guide for Excel File Based Data

## ✅ Quick Start (3 Steps)

### Step 1: Prepare Your Excel File
Create an Excel file with your student data containing these columns:
```
Student_ID | Student_Name | Batch | Course | City | Education | Experience | Skill_Score | Communication_Score | Mock_Average | Interview_Average | Projects_Complete | Applications_Count | Profile_Completion_Score | Placement_Readiness_Score | Placement_Status | Placed_Salary
```

### Step 2: Place the File
1. Navigate to: `PLACIFY/public/`
2. Save your Excel file as: **`student_data.xlsx`**

### Step 3: Open the App
1. Go to: `http://localhost:5173/`
2. Refresh the page (F5)
3. ✅ Your data is now loaded!

---

## 📁 File Location

```
PLACIFY/
├── public/
│   ├── vite.svg
│   └── student_data.xlsx  ← Place your Excel file here!
├── src/
├── package.json
└── ...
```

**Full Path:** `c:\Users\Deepak Kumar\Downloads\PLACIFY\public\student_data.xlsx`

---

## 📊 Excel File Format

### Required Columns (Exact Names Required)

| # | Column Name | Type | Example | Notes |
|---|---|---|---|---|
| 1 | Student_ID | Text | STU001 | Unique identifier |
| 2 | Student_Name | Text | John Doe | Full name |
| 3 | Batch | Text | Batch-2024-Jan | Cohort name |
| 4 | Course | Text | MERN Development | Must be one of: MERN Development, Data Analytics, Full Stack Development |
| 5 | City | Text | Delhi | City name |
| 6 | Education | Text | B.Tech | Educational qualification |
| 7 | Experience | Text/Number | 0 | Years of experience |
| 8 | Skill_Score | Number | 85 | 0-100 |
| 9 | Communication_Score | Number | 78 | 0-100 |
| 10 | Mock_Average | Number | 82 | 0-100 |
| 11 | Interview_Average | Number | 80 | 0-100 |
| 12 | Projects_Complete | Number | 8 | 0-10 |
| 13 | Applications_Count | Number | 15 | 0-50 |
| 14 | Profile_Completion_Score | Number | 95 | 0-100 |
| 15 | Placement_Readiness_Score | Number | 88 | 0-100 |
| 16 | Placement_Status | Text | Selected | Options: Selected, Interview Scheduled, Applied, Not Applied, Rejected |
| 17 | Placed_Salary | Text | 8.5 LPA | Empty if not placed |

---

## 📝 Example Excel Data

### CSV Format (if saving as .csv)
```csv
Student_ID,Student_Name,Batch,Course,City,Education,Experience,Skill_Score,Communication_Score,Mock_Average,Interview_Average,Projects_Complete,Applications_Count,Profile_Completion_Score,Placement_Readiness_Score,Placement_Status,Placed_Salary
STU001,Aarav Sharma,Batch-2024-Jan,MERN Development,Delhi,B.Tech,0,85,78,82,80,8,15,95,88,Selected,8.5 LPA
STU002,Priya Kumari,Batch-2024-Jan,Data Analytics,Bangalore,B.Sc,1,92,88,90,87,10,22,98,94,Selected,12 LPA
STU003,Rohit Verma,Batch-2024-Jan,Full Stack Development,Mumbai,B.Tech,0,78,72,75,73,6,10,80,76,Interview Scheduled,
STU004,Ananya Desai,Batch-2024-Feb,MERN Development,Pune,B.Tech,1,88,85,86,84,9,18,92,90,Applied,
STU005,Vikram Singh,Batch-2024-Feb,Data Analytics,Hyderabad,B.Sc,2,95,92,94,91,10,25,99,96,Selected,15 LPA
```

---

## 🔄 Updating Student Data

When you make changes to your Excel file:

1. **Edit the Excel file** in `PLACIFY/public/student_data.xlsx`
2. **Save the file** (Ctrl+S)
3. **Go to the web app** and **Refresh the page** (F5 or Ctrl+R)
4. **The app automatically loads the new data!**

No need to upload anything through the dashboard.

---

## 🎯 How It Works

### On App Startup:
1. App loads and looks for `student_data.xlsx` in the `public` folder
2. If found, it automatically reads and imports all data
3. Data is stored in the app's memory
4. All dashboards display the loaded data

### On Page Refresh:
1. App reloads fresh data from `student_data.xlsx`
2. Any changes you made to the Excel file appear in the app
3. No manual upload needed

### On Trainer Dashboard:
- Shows all students from the Excel file
- "Reload Data" button to refresh from file
- "Export to Excel" to download all data
- "Show Overall Analysis" for dashboard with analytics

### On Student Dashboard:
- Student sees their individual performance metrics
- Data loaded automatically from the Excel file
- No manual data entry needed

---

## ✅ Supported File Formats

- **`.xlsx`** (Excel 2007+) - ⭐ **Recommended**
- **`.xls`** (Excel 97-2003)
- **`.csv`** (Comma Separated Values)

---

## 📋 Login Credentials

After uploading your Excel file with students, create login credentials:

### For Your Students:
- **Email**: Can be any email format
- **Password**: password123 (or customize in code)
- **User Type**: Student

*Note: For demo purposes, anyone can login. In production, integrate with real authentication.*

### Trainer Account (Demo):
- **Email**: trainer@example.com
- **Password**: password123

---

## 🎨 Integration Point

**File Location in Code:**
- The app looks for: `/student_data.xlsx`
- Which maps to: `PLACIFY/public/student_data.xlsx`

**Context Provider:**
- File is loaded by: `src/context/StudentDataContext.tsx`
- Automatically runs on app startup
- Stores data in React Context for all components to access

**Auto-Reload:**
- Click "🔄 Reload Data" button on Trainer Dashboard
- Or refresh the page (F5)

---

## ⚠️ Important Notes

### Column Names Must Match Exactly
- `Student_ID` ❌ not `StudentID`
- `Student_Name` ❌ not `Name`
- `Skill_Score` ❌ not `SkillScore`
- Case-sensitive!

### Required Data Types
- All **scores** must be **numbers** (not text)
- Student_ID should be **unique** per student
- All score fields should have values (no blanks)

### File Naming
- Must be exactly: `student_data.xlsx`
- Not `student_data_v2.xlsx` or `data.xlsx`
- Placed in `public` folder, not `src` folder

---

## 🐛 Troubleshooting

### Problem: App says "No Excel file found"

**Solution:**
1. Check file is saved in the correct location:
   - `c:\Users\Deepak Kumar\Downloads\PLACIFY\public\student_data.xlsx`
2. Verify filename is exactly: `student_data.xlsx`
3. Try a hard refresh: `Ctrl+Shift+R`
4. Check browser console for errors: `F12`

### Problem: Data not loading after placing file

**Solution:**
1. Make sure app is running: `npm run dev`
2. Hard refresh the browser: `Ctrl+Shift+R`
3. Check file format is `.xlsx`, `.xls`, or `.csv`
4. Verify column headers match exactly (including capitalization)

### Problem: Student can't see their data

**Solution:**
1. Check Student_ID in Excel matches the ID you use for login
2. Ensure all data fields are filled (no blank cells in score columns)
3. Verify data types: scores should be numbers, not text
4. Refresh the page: `F5`

### Problem: Column headers are not recognized

**Solution:**
1. Check spelling: `Student_ID` (with underscore, not dash)
2. Check capitalization: `Student_Name` (not `Student_name`)
3. No extra spaces at beginning/end of column names
4. All 17 required columns must be present

---

## 🚀 Workflow Example

### Day 1: Setup
1. ✅ Prepare Excel with 50 students
2. ✅ Save as `student_data.xlsx`
3. ✅ Place in `PLACIFY/public/`
4. ✅ App automatically loads data
5. ✅ Students can login and view dashboards

### Day 5: Update Scores
1. ✅ Open `PLACIFY/public/student_data.xlsx`
2. ✅ Update skill scores for students
3. ✅ Save the file
4. ✅ Go to app and hit "Reload Data" or refresh page
5. ✅ Updated scores appear instantly!

---

## 🎓 Features Overview

### For Trainers:
- 📊 View all students in a table
- 🔍 Search by name or ID
- 📁 Filter by course
- 🎯 Filter by placement status
- 📥 Export data to Excel
- 📈 View overall analysis and statistics
- 🔄 Reload data from file anytime

### For Students:
- 👤 View personal information
- 📊 See 8 performance metrics with progress bars
- 📈 Track placement status and salary
- 💡 Get personalized improvement tips

---

## 📞 Quick Reference

| Action | Location |
|---|---|
| **Place Excel file** | `PLACIFY/public/student_data.xlsx` |
| **Edit file** | Use Excel, LibreOffice, or any spreadsheet app |
| **Update data** | Edit file → Save → Refresh browser page |
| **Access app** | `http://localhost:5173/` |
| **Start dev server** | `npm run dev` |
| **View instructions** | `PLACIFY/public/EXCEL_UPLOAD_INSTRUCTIONS.md` |

---

## ✨ Summary

1. **Create Excel file** with student data ✅
2. **Save as** `student_data.xlsx` ✅
3. **Place in** `PLACIFY/public/` ✅
4. **Refresh app** - Data loads automatically! ✅
5. **Update file** anytime and refresh to see changes ✅

**That's it! No upload buttons, no manual data entry. Simple and efficient.** 🎉
