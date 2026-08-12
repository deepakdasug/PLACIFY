# 📁 Place Your Excel File Here

## Instructions

1. **Export your student data from Excel** with the following columns:
   - Student_ID
   - Student_Name
   - Batch
   - Course
   - City
   - Education
   - Experience
   - Skill_Score
   - Communication_Score
   - Mock_Average
   - Interview_Average
   - Projects_Complete
   - Applications_Count
   - Profile_Completion_Score
   - Placement_Readiness_Score
   - Placement_Status
   - Placed_Salary

2. **Save the file as**: `student_data.xlsx`

3. **Place it in this folder** (`public/student_data.xlsx`)

4. **Refresh the web application** at `http://localhost:5173/`

5. **The app will automatically load your data!**

---

## How It Works

- When the app starts, it automatically looks for `student_data.xlsx` in this folder
- Once found, it loads all student data into the application
- Students can then login and see their individual dashboards
- Trainers can view all students, filter, search, and export data

---

## To Update Student Data

1. **Edit your Excel file** in this folder
2. **Save the changes**
3. **Refresh the web browser** (F5 or Ctrl+R)
4. **The app will reload with the updated data**

---

## Column Requirements

| Column Name | Type | Example |
|---|---|---|
| Student_ID | Text | STU001 |
| Student_Name | Text | John Doe |
| Batch | Text | Batch-2024-Jan |
| Course | Text | MERN Development, Data Analytics, or Full Stack Development |
| City | Text | New York |
| Education | Text | B.Tech, B.Sc |
| Experience | Text/Number | 0, 1, 2 |
| Skill_Score | Number | 85 |
| Communication_Score | Number | 78 |
| Mock_Average | Number | 82 |
| Interview_Average | Number | 80 |
| Projects_Complete | Number | 8 |
| Applications_Count | Number | 15 |
| Profile_Completion_Score | Number | 95 |
| Placement_Readiness_Score | Number | 88 |
| Placement_Status | Text | Selected, Interview Scheduled, Applied, Not Applied, Rejected |
| Placed_Salary | Text | 8.5 LPA (or empty if not placed) |

---

## Supported File Formats

- ✅ `.xlsx` (Excel 2007+) - **Recommended**
- ✅ `.xls` (Excel 97-2003)
- ✅ `.csv` (Comma Separated Values)

---

## Example Data

```
Student_ID,Student_Name,Batch,Course,City,Education,Experience,Skill_Score,Communication_Score,Mock_Average,Interview_Average,Projects_Complete,Applications_Count,Profile_Completion_Score,Placement_Readiness_Score,Placement_Status,Placed_Salary
STU001,Aarav Sharma,Batch-2024-Jan,MERN Development,Delhi,B.Tech,0,85,78,82,80,8,15,95,88,Selected,8.5 LPA
STU002,Priya Kumari,Batch-2024-Jan,Data Analytics,Bangalore,B.Sc,1,92,88,90,87,10,22,98,94,Selected,12 LPA
STU003,Rohit Verma,Batch-2024-Jan,Full Stack Development,Mumbai,B.Tech,0,78,72,75,73,6,10,80,76,Interview Scheduled,
```

---

## Troubleshooting

### Issue: Excel file not loading

**Solution:**
- Check filename is exactly: `student_data.xlsx`
- Ensure file is in the `public` folder (same level as `vite.svg`)
- Verify file format is .xlsx, .xls, or .csv
- Check browser console (F12) for error messages
- Try refreshing the page (Ctrl+Shift+R for hard refresh)

### Issue: Column names don't match

**Solution:**
- Column names are **case-sensitive**
- Must be exactly: `Student_ID` (not `StudentID` or `student_id`)
- Check Excel headers match the format above exactly

### Issue: Data not showing for specific student

**Solution:**
- Verify Student_ID in Excel matches the ID used for login
- Check all required columns have values
- Ensure no special characters in Student_ID

---

## Questions or Need Help?

Contact your application administrator or developer.
