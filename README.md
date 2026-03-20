# Patent Reminder System 📋

A professional, full-stack web application for managing patent reminders and tracking deadlines across multiple drafters with automated email notifications.

## 🎯 Quick Start (3 Steps)

### Step 1: Backend Setup
```bash
cd backend
npm install
# Create .env file with your Gmail credentials
npm start
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Step 3: Access Application
- Open: http://localhost:5173
- Password: `patent2024`

## 📁 Project Structure

```
patent-reminder-system/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express + Email
└── SETUP_GUIDE.md    # Detailed setup instructions
```

## ✨ Features

✅ 4 Drafters Management
✅ 17 Reminder Types (IDF, FORM1, PS DRAFT, etc.)
✅ Email Notifications
✅ Patent Portfolio Tracking
✅ Performance Analytics
✅ Color-Coded Status Tracking
✅ Professional Dark Theme UI
✅ Responsive Design
✅ Local Data Persistence

## 🔑 Key Information

| Item | Details |
|------|---------|
| **Frontend Port** | 5173 |
| **Backend Port** | 5000 |
| **Login Password** | patent2024 |
| **Browser** | http://localhost:5173 |

## 📧 Registered Drafters

| Name | Email |
|------|-------|
| Abhishek | abhishek.drafter@gmail.com |
| Ayush M Anchan | ayush.drafters@gmail.com |
| Pramith Nayak | pramith.drafters@gmail.com |
| Thilak | thilak.drafters@gmail.com |

## 🔐 Gmail Setup (For Email Features)

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to backend/.env:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

## 📖 Documentation

- **SETUP_GUIDE.md** - Complete step-by-step setup guide
- **README.md** (if present) - Detailed feature documentation
- **ADVANCED_CONFIG.md** (if present) - Advanced customization

## 🚀 Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open: http://localhost:5173

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| npm not found | Install Node.js from nodejs.org |
| Email not sending | Check Gmail app password in .env |
| Can't connect to backend | Ensure backend server is running on port 5000 |
| Port already in use | Change port in vite.config.js or kill existing process |

## 📊 Reminder Types

IDF, FORM1, PS DRAFT, PS ACK, CS CHECKLIST, CS DRAFT, CS ACK, FORM 9, FORM 18, FORM 26, PUBLICATION ACK, FER NOTICE, FER REPLY, HEARING NOTICE, HEARING, WS SUBMISSION, GRANT

## 💡 Tips

- Data is saved in browser LocalStorage
- Each drafter has their own reminders and patents
- Email notifications require backend server running
- Use different browser for testing multiple users
- Clear browser cache if data seems stuck

## 🎓 Next Steps

1. Read **SETUP_GUIDE.md** for detailed instructions
2. Install dependencies in both frontend and backend
3. Setup Gmail app password
4. Run both servers
5. Login and create your first reminder!

---

**Ready to get started?** Open **SETUP_GUIDE.md** for complete instructions!

Version 1.0 | 2024
