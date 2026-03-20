# 🎯 Patent Reminder System - Quick Reference Card

## 📥 EXTRACT & OPEN

1. **Extract** `patent-reminder-system.zip` to your computer
2. **Open VS Code**
3. **Drag the folder** into VS Code (or File → Open Folder)
4. Select the extracted `patent-reminder-system` folder

---

## ⚡ QUICK RUN (4 Commands)

### Command 1: Backend Folder
```bash
cd backend
```

### Command 2: Install Backend
```bash
npm install
```

### Command 3: Start Backend (Keep Running!)
```bash
npm start
```
✅ Shows: `✅ Patent Reminder API Server running on port 5000`

### Command 4: New Terminal + Frontend
```bash
cd frontend && npm install && npm run dev
```
✅ Shows: `Local: http://localhost:5173/`

---

## 🌐 OPEN IN BROWSER

```
http://localhost:5173
```

**Password:** `patent2024`

---

## 📧 SETUP GMAIL (Optional - for email notifications)

1. Go to: https://myaccount.google.com/apppasswords
2. Select: Mail + Your Device
3. Copy the 16-character password
4. Create `.env` file in backend folder:
   ```
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASSWORD=your16charpassword
   PORT=5000
   NODE_ENV=development
   ```

---

## 🖥️ TYPICAL SETUP

**Terminal 1:**
```bash
cd backend
npm install
npm start
```

**Terminal 2:**
```bash
cd frontend
npm install
npm run dev
```

**Browser:** http://localhost:5173

---

## 🎯 WORKFLOW

1. ✅ Click drafter card (Abhishek, Ayush, etc.)
2. ✅ Click "New Reminder"
3. ✅ Fill form (tracking code, client, due date)
4. ✅ Click "Set Reminder & Send Email"
5. ✅ Check email inbox
6. ✅ View Patent Portfolio tab for patents
7. ✅ Click Summary to see analytics

---

## 🔐 DEFAULT CREDENTIALS

| Item | Value |
|------|-------|
| Password | patent2024 |
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Database | Browser LocalStorage |

---

## 📝 FILES CREATED DURING SETUP

You will create 1 file:

**`backend/.env`** (create manually):
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
NODE_ENV=development
```

---

## ⚠️ IF SOMETHING GOES WRONG

| Problem | Fix |
|---------|-----|
| npm not found | Install Node.js: nodejs.org |
| Module not found | Run `npm install` in that folder |
| Port 5173 in use | Run different port or kill process |
| Port 5000 in use | Change PORT in .env or kill existing process |
| Email not working | Check .env has correct credentials |
| Can't login | Password is `patent2024` (case sensitive) |
| Data not saving | Clear browser cache: Ctrl+Shift+Delete |

---

## 🚀 PRODUCTION BUILD

When ready to deploy:

**Frontend Build:**
```bash
cd frontend
npm run build
```
Creates optimized `dist` folder to deploy.

---

## 📂 KEY FILES LOCATIONS

| File | Location |
|------|----------|
| React App | `frontend/src/App.jsx` |
| Backend Server | `backend/server.js` |
| Config | `backend/.env` |
| Frontend Config | `frontend/vite.config.js` |
| Tailwind Config | `frontend/tailwind.config.js` |

---

## 🔧 COMMON CUSTOMIZATIONS

### Change Password
`frontend/src/App.jsx` → Find `patent2024` → Replace

### Add Drafter
`frontend/src/App.jsx` → `drafters` array → Add entry

### Add Reminder Type
`frontend/src/App.jsx` → `reminderTypes` array → Add type

### Change Port
`frontend/vite.config.js` → Change `port: 5173`

---

## 📞 HELP

1. **Read**: SETUP_GUIDE.md (step-by-step)
2. **Check**: Backend terminal for errors
3. **Verify**: .env file has email configured
4. **Test**: Open http://localhost:5000 in browser

---

## ✨ FEATURES AT A GLANCE

✅ 4 Drafters with individual dashboards
✅ 17 different reminder types
✅ Email notifications to each drafter
✅ Patent portfolio management
✅ Performance summary and analytics
✅ Color-coded deadline tracking
✅ Edit/Delete reminders and patents
✅ Dark professional UI
✅ Mobile responsive
✅ Data persists in browser

---

## 🎓 LEARNING RESOURCES

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Express.js**: https://expressjs.com
- **Nodemailer**: https://nodemailer.com

---

**🎉 YOU'RE READY TO GO!**

Follow the "QUICK RUN" section above and you'll be up in 5 minutes!
