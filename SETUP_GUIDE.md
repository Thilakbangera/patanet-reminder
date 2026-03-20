# 🚀 Patent Reminder System - Complete VS Code Setup Guide

## 📋 What You Have

You have a complete project structure with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Nodemailer
- **4 Drafters**: Abhishek, Ayush M Anchan, Pramith Nayak, Thilak
- **17 Reminder Types**: IDF, FORM1, PS DRAFT, PS ACK, CS CHECKLIST, etc.
- **Professional UI**: Dark theme with full features

---

## ✅ Prerequisites

Before you start, make sure you have:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org
   - Verify: Open terminal and type `node --version`

2. **Git** (optional but recommended)
   - Download from: https://git-scm.com

3. **VS Code** (You have this!)
   - Download from: https://code.visualstudio.com

4. **Gmail Account** (for email notifications)
   - Any Gmail account works

---

## 🎯 Step 1: Extract and Open in VS Code

1. **Extract the ZIP file** to any location on your computer
   - Example: `C:\Users\YourName\Documents\patent-reminder-system`

2. **Open the folder in VS Code**:
   - Open VS Code
   - Click `File` → `Open Folder`
   - Select the `patent-reminder-system` folder
   - Click `Select Folder`

3. **Trust the workspace** (if asked)
   - Click `Yes, I trust the authors`

---

## 🔧 Step 2: Setup Gmail (For Email Notifications)

### Enable 2-Step Verification:

1. Go to https://myaccount.google.com
2. Click **Security** (left sidebar)
3. Scroll to **2-Step Verification**
4. Click **Enable** and follow instructions
5. You'll need your phone to verify

### Generate App Password:

1. After 2-Step is enabled, go to https://myaccount.google.com/apppasswords
2. Select:
   - **Mail**
   - **Windows Computer** (or your device type)
3. Click **Generate**
4. Google will show you a 16-character password like: `abcd efgh ijkl mnop`
5. **Copy this password** (without spaces)
6. Keep it somewhere safe for the next step

---

## 💻 Step 3: Setup Backend Server

### Terminal 1: Backend Setup

1. **Open new terminal in VS Code**:
   - Press `Ctrl + ` (backtick/grave accent)
   - A terminal will appear at the bottom

2. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   - This downloads all necessary packages
   - Wait for it to complete (takes 1-2 minutes)

4. **Create .env file**:
   - Right-click in the `backend` folder (in VS Code sidebar)
   - Select **New File**
   - Name it `.env` (with the dot)
   - Copy the content below:

   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   PORT=5000
   NODE_ENV=development
   ```

   **Example:**
   ```
   EMAIL_USER=myemail@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   PORT=5000
   NODE_ENV=development
   ```

   ⚠️ **Important**: Replace with your actual Gmail and app password!

5. **Start the backend server**:
   ```bash
   npm start
   ```

   You should see:
   ```
   ✅ Patent Reminder API Server running on port 5000
   🌐 http://localhost:5000
   ```

   **✅ Leave this terminal running!**

---

## 🎨 Step 4: Setup Frontend Server

### Terminal 2: Frontend Setup

1. **Open a new terminal** (don't close the first one!):
   - Click the `+` icon in the terminal area
   - A new terminal tab opens

2. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   - Wait for it to complete (takes 1-2 minutes)

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ➜  Local:   http://localhost:5173/
   ```

5. **Click on the URL** or open browser:
   - Go to `http://localhost:5173`
   - The Patent Reminder System will load!

---

## 🔐 Step 5: Login to the Application

1. **Open the application** at http://localhost:5173
2. **Enter password**: `patent2024`
3. **Click Login**
4. ✅ You're in!

---

## 📝 Step 6: Try It Out!

### Create Your First Reminder:

1. Click on any drafter card (e.g., "Abhishek")
2. Click **"New Reminder"** button
3. Fill in the form:
   - **Tracking Code**: `TEST-2024-001`
   - **Client Name**: `Test Client`
   - **Reminder Type**: `IDF` (select from dropdown)
   - **Due Date**: Pick tomorrow's date
   - **Reminder Days**: `3` (default is fine)
   - **Additional Comment**: `This is a test`
4. Click **"Set Reminder & Send Email"**
5. ✅ Reminder created! Check email inbox for notification

### Add a Patent:

1. Click **"Patent Portfolio"** tab
2. Click **"Add Patent"** button
3. Fill in the details
4. Click **"Add Patent"**
5. ✅ Patent added to portfolio!

---

## 🎯 Project Structure

```
patent-reminder-system/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind CSS
│   ├── index.html           # HTML file
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
│
└── backend/                  # Node.js + Express backend
    ├── server.js            # Main server file
    ├── package.json         # Backend dependencies
    └── .env                 # Configuration (CREATE THIS)
```

---

## 🐛 Troubleshooting

### "npm command not found"
- **Solution**: Install Node.js from https://nodejs.org
- Restart VS Code after installation

### "Cannot find module 'express'"
- **Solution**: Run `npm install` in the terminal
- Make sure you're in the correct folder (frontend or backend)

### "Email not sending"
- **Solution**:
  1. Check Gmail 2-Step Verification is enabled
  2. Verify app-specific password in .env
  3. Make sure backend server is running (Terminal 1)
  4. Wait 1-2 seconds after setting reminder before checking email

### "Cannot connect to http://localhost:5173"
- **Solution**:
  1. Check frontend server is running (Terminal 2)
  2. Terminal should show: `Local: http://localhost:5173/`
  3. Open VS Code terminal and run `npm run dev` in frontend folder

### "Login not working"
- **Solution**: 
  - Password is: `patent2024`
  - Make sure you're typing it correctly
  - Check Caps Lock is off

### "Data not saving"
- **Solution**:
  - Data is saved in browser's LocalStorage
  - Try clearing browser cache (Ctrl+Shift+Delete)
  - Or use a different browser

---

## 📊 Features Checklist

✅ **Dashboard**: Shows all 4 drafters with stats
✅ **Create Reminders**: Set tracking code, client name, due date, etc.
✅ **Email Notifications**: Sends email to drafter's registered email
✅ **Patent Portfolio**: Add and manage patents
✅ **Summary Dashboard**: View performance metrics
✅ **Edit/Delete**: Modify or remove reminders and patents
✅ **Status Tracking**: Color-coded deadline tracking (Red=Overdue, Orange=Urgent, Yellow=Soon, Green=OK)
✅ **Responsive Design**: Works on desktop, tablet, mobile
✅ **Data Persistence**: Saves in browser LocalStorage
✅ **Professional UI**: Dark theme with modern design

---

## 🔄 Running Again Later

After you close VS Code, to run the application again:

1. **Open the project folder** in VS Code
2. **Open Terminal** (Ctrl + `)
3. **Navigate to frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
4. **In another terminal, navigate to backend**:
   ```bash
   cd backend
   npm start
   ```
5. **Open** http://localhost:5173

---

## 🎓 Modifying the System

### Change Master Password:

1. Open `frontend/src/App.jsx`
2. Find line with: `authPassword === 'patent2024'`
3. Replace `'patent2024'` with your password
4. Save (Ctrl+S)
5. Frontend will auto-refresh

### Add New Drafter:

1. Open `frontend/src/App.jsx`
2. Find the `drafters` array (around line 13)
3. Add a new entry:
   ```javascript
   { 
     id: 5, 
     name: 'New Name', 
     email: 'new.email@gmail.com', 
     color: 'from-pink-600 to-pink-400' 
   }
   ```
4. Save and refresh browser

### Add New Reminder Type:

1. Open `frontend/src/App.jsx`
2. Find `reminderTypes` array (around line 20)
3. Add your type:
   ```javascript
   const reminderTypes = [
     'IDF', 'FORM1', // ... existing types
     'YOUR_NEW_TYPE'  // Add here
   ];
   ```
4. Save and refresh

---

## 📞 Support & Documentation

For more advanced features, see these files in the project:
- **README.md** - Complete documentation
- **QUICK_START.md** - 5-minute quick start
- **ADVANCED_CONFIG.md** - Advanced customization

---

## 🎉 You're All Set!

Everything is ready to use! Here's what to do next:

1. ✅ Extract the project
2. ✅ Setup Gmail (if you want email notifications)
3. ✅ Run `npm install` in backend folder
4. ✅ Create `.env` file in backend folder
5. ✅ Run backend server: `npm start`
6. ✅ Run frontend server: `npm run dev` in another terminal
7. ✅ Go to http://localhost:5173
8. ✅ Login with password: `patent2024`
9. ✅ Create your first reminder!

**Enjoy your Patent Reminder System! 🚀**

---

**Version**: 1.0
**Last Updated**: 2024
**Questions?** Check the README.md or QUICK_START.md files
