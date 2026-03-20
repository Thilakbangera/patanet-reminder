# 🎬 VISUAL VS CODE SETUP GUIDE

## 🖼️ VISUAL STEP-BY-STEP

### Step 1️⃣: Extract & Open

```
1. Right-click ZIP file
   ↓
2. Extract All
   ↓
3. Drag folder into VS Code
   ↓
   ✅ Folder opens in VS Code
```

---

### Step 2️⃣: Open Terminal

```
VS Code Window:
┌─────────────────────────────┐
│ patent-reminder-system      │
│  └─ frontend/              │
│  └─ backend/               │
│                             │
│ [Terminal + button at bottom]
└─────────────────────────────┘
           ↓
Click: + (new terminal)
           ↓
   ✅ Terminal opens at bottom
```

---

### Step 3️⃣: Start Backend

```
Terminal:
$ cd backend
$ npm install    ← (wait 1-2 minutes)
$ npm start      ← (LEAVE RUNNING!)

✅ Should show:
✅ Patent Reminder API Server running on port 5000
🌐 http://localhost:5000
📧 Email notifications enabled: your-email@gmail.com
```

---

### Step 4️⃣: Start Frontend (New Terminal)

```
Click: + (new terminal tab)
           ↓
$ cd frontend
$ npm install    ← (wait 1-2 minutes)
$ npm run dev    ← (starts server)

✅ Should show:
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

---

### Step 5️⃣: Open Browser

```
Click the URL: http://localhost:5173
            OR
Type in address bar: http://localhost:5173
           ↓
✅ Patent Reminder System loads
```

---

### Step 6️⃣: Login

```
┌─────────────────────────────────┐
│  Patent Reminder System         │
│  Secure Access Required         │
│                                 │
│  Master Password:               │
│  [________________________]      │
│                                 │
│  Hint: Patent-related year      │
│                                 │
│  [     Login      ]             │
└─────────────────────────────────┘
           ↓
Type: patent2024
Click: Login
           ↓
✅ Dashboard opens!
```

---

## 🎯 DASHBOARD OVERVIEW

```
┌─────────────────────────────────────────────────────┐
│ Patent Reminder System                    [ Logout ] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │      A       │  │      A       │               │
│  │  Abhishek   │  │ Ayush M      │               │
│  │   5 Remind  │  │  2 Remind    │               │
│  │   0 Patents │  │  3 Patents   │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │      P       │  │      T       │               │
│  │  Pramith    │  │   Thilak     │               │
│  │   1 Remind  │  │   0 Remind   │               │
│  │   5 Patents │  │   8 Patents  │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
│ Stats: 8 Reminders | 16 Patents | 4 Drafters     │
└─────────────────────────────────────────────────────┘
           ↓
Click any drafter card to view their workspace
```

---

## 📝 DRAFTER WORKSPACE

```
┌──────────────────────────────────────────┐
│ ← Back    A Abhishek                     │
│           abhishek.drafter@gmail.com     │
│                           [ Summary ]    │
├──────────────────────────────────────────┤
│                                          │
│ [Reminders] [Patent Portfolio]           │
│                                          │
│ [ + New Reminder ]                       │
│                                          │
│ Create New Reminder Form:                │
│ ┌────────────────────────────────────┐   │
│ │ Tracking Code: [________________]  │   │
│ │ Client Name:   [________________]  │   │
│ │ Reminder Type: [IDF           ▼ ]  │   │
│ │ Due Date:      [________________]  │   │
│ │ Remind Me:     [===●===] 3 Days    │   │
│ │ Comment:       [________________]  │   │
│ │ [ Set Reminder & Send Email ]      │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Reminders:                               │
│ ┌────────────────────────────────────┐   │
│ │ IDF  APP-2024-001                  │   │
│ │ Acme Corp                          │   │
│ │ Due: 3/25/2024 | 5 days remaining  │   │
│ │                                [✎][🗑] │
│ └────────────────────────────────────┘   │
│                                          │
└──────────────────────────────────────────┘
```

---

## 🎨 CREATING A REMINDER

```
Step-by-step:

1. Click "New Reminder" button
                    ↓
2. Fill Form:
   Tracking Code: APP-2024-001
   Client Name: Acme Corp
   Reminder Type: IDF (select from list)
   Due Date: Pick a date
   Remind Me: 3 days (slider)
   Comment: Optional
                    ↓
3. Click "Set Reminder & Send Email"
                    ↓
✅ Reminder created!
✅ Email sent to abhishek.drafter@gmail.com
```

---

## 📋 ADDING A PATENT

```
1. Click "Patent Portfolio" tab
                    ↓
2. Click "Add Patent" button
                    ↓
3. Fill Patent Form:
   Patent Number: US 10,234,567
   Patent Title: Advanced Widget System
   Client Name: Tech Corp
   Application Type: Utility (select)
   Status: Pending (select)
   Description: Brief description
                    ↓
4. Click "Add Patent"
                    ↓
✅ Patent added to portfolio!
```

---

## 🎯 COLOR CODING SYSTEM

```
Reminder Deadline Status:

🟢 GREEN      ← 15+ days until due (On Track)
🟡 YELLOW     ← 8-14 days until due (Caution)
🟠 ORANGE     ← 1-7 days until due (Urgent!)
🔴 RED        ← Already past due (Overdue!)
```

---

## 💾 TERMINAL COMMANDS REFERENCE

```
Backend Setup:
├── cd backend              ← Go to backend folder
├── npm install             ← Download dependencies
└── npm start              ← Start server (PORT 5000)

Frontend Setup:
├── cd frontend             ← Go to frontend folder
├── npm install             ← Download dependencies
└── npm run dev            ← Start server (PORT 5173)

Other:
├── npm stop               ← Stop server (Ctrl+C)
├── npm run build          ← Build for production
└── npm cache clean        ← Clear cache (if issues)
```

---

## 🔑 KEYBOARD SHORTCUTS IN VS CODE

```
Open Terminal:        Ctrl + `  (backtick)
New Terminal Tab:     Click + in terminal area
Split Terminal:       Click split icon
Save File:            Ctrl + S
Find Text:            Ctrl + F
Open Command Palette: Ctrl + Shift + P
Open Folder:          Ctrl + K Ctrl + O
Refresh Browser:      Ctrl + R (or Ctrl + Shift + R)
Developer Tools:      F12
```

---

## 📊 FILE EDITING LOCATIONS

```
Want to change something?

Change Login Password:
├── File: frontend/src/App.jsx
├── Line: ~318
└── Find: authPassword === 'patent2024'
          Replace with: authPassword === 'mynewpassword'

Add New Drafter:
├── File: frontend/src/App.jsx
├── Line: ~13
└── Array: const drafters = [...]

Add Reminder Type:
├── File: frontend/src/App.jsx
├── Line: ~20
└── Array: const reminderTypes = [...]

Setup Email:
├── File: backend/.env
├── Add: EMAIL_USER=email@gmail.com
└── Add: EMAIL_PASSWORD=16charpassword
```

---

## ⚠️ COMMON ERRORS & FIXES

```
ERROR: npm: command not found
FIX: Install Node.js from nodejs.org

ERROR: EADDRINUSE (Port already in use)
FIX 1: Kill existing process
FIX 2: Change port in config
FIX 3: Use different port (5174 or 5001)

ERROR: Cannot find module 'X'
FIX: Run npm install again

ERROR: Login fails
FIX: Password is exactly "patent2024" (case sensitive)

ERROR: Email not sending
FIX 1: Check .env file exists
FIX 2: Check Gmail credentials
FIX 3: Enable 2-Step Verification on Gmail
FIX 4: Generate App Password

ERROR: Data not saving
FIX: Clear browser cache (Ctrl+Shift+Delete)
```

---

## ✅ VERIFICATION CHECKLIST

After starting both servers:

```
□ Terminal 1 shows:
  ✅ Patent Reminder API Server running on port 5000

□ Terminal 2 shows:
  ➜ Local: http://localhost:5173/

□ Browser shows:
  "Patent Reminder System" login page

□ Login works with:
  Password: patent2024

□ Dashboard shows:
  4 drafter cards (Abhishek, Ayush, Pramith, Thilak)

□ Can click drafter:
  Shows their reminders page

□ Can create reminder:
  Form appears with all fields

□ Data persists:
  After refresh, reminders still there
```

---

## 📱 WHAT YOU SEE AT EACH STAGE

```
Stage 1: Just Extracted
├── Folder opens in VS Code
└── All files visible in sidebar

Stage 2: After npm install (backend)
├── node_modules/ folder appears
└── Ready to start backend

Stage 3: After npm start (backend)
├── Terminal shows green checkmark
├── "running on port 5000"
└── Backend is ready

Stage 4: After npm install (frontend)
├── Another node_modules/ folder
└── Ready to start frontend

Stage 5: After npm run dev (frontend)
├── Terminal shows vite info
├── "Local: http://localhost:5173"
└── Frontend is ready

Stage 6: Browser opens
├── Login page appears
├── "Patent Reminder System"
└── Ready to login

Stage 7: After login
├── Dashboard with 4 cards
├── Each shows drafter name
└── Ready to use!
```

---

## 🎉 SUCCESS INDICATORS

When everything is working:

```
✅ Terminal 1: Backend running message
✅ Terminal 2: Vite dev server running
✅ Browser: http://localhost:5173 loads
✅ Login page: Appears without errors
✅ Dashboard: Shows 4 drafter cards
✅ Click drafter: Goes to their dashboard
✅ Create reminder: Form appears & saves
✅ Data persists: Survives page refresh
✅ Summary: Shows analytics
✅ Emails: Received (if Gmail configured)
```

**If all ✅, you're DONE!**

---

## 🚀 NEXT STEPS AFTER SUCCESS

```
Now that it's running:

1. Explore the UI
   └── Click buttons, try features

2. Create test data
   └── Add reminders for each drafter

3. Check features
   └── Patent portfolio, summary, edit/delete

4. (Optional) Setup Gmail
   └── For actual email notifications

5. Customize (if needed)
   └── Change password, add drafters, add reminder types

6. Deploy (if ready)
   └── Follow deployment guides in docs
```

---

## 🎓 LEARNING FROM CODE

The code is well-commented. Learn by:

```
1. Open frontend/src/App.jsx
   └── Read the React component

2. Open backend/server.js
   └── See Express & email setup

3. Check comments
   └── Explanations of what code does

4. Modify & experiment
   └── Change colors, add fields, extend features

5. Read documentation
   └── START_HERE.md, SETUP_GUIDE.md
```

---

## 📞 QUICK HELP

```
Need Help?           Check File:
─────────────────────────────────────
Getting started  →  START_HERE.md
Step-by-step     →  SETUP_GUIDE.md
Quick reference  →  QUICK_REFERENCE.md
Overview         →  README.md
This guide       →  This file
```

---

**Version**: 1.0
**Designed for**: VS Code Users
**Last Updated**: March 2024

🚀 **You've got everything! Happy building!**
