# Deployment Guide

## Render Backend Deployment

### Prerequisites
- Render account (free tier available)
- MongoDB Atlas connection string
- GitHub repository

### Step 1: Create Web Service on Render

1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - **Name:** bidyut-assignment-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free (or paid for stability)

### Step 2: Set Environment Variables on Render

In Render dashboard, go to your service → Environment:

```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://bidyut-assignment-fawn.vercel.app
MONGODB_URI=mongodb+srv://nikhilsharma7691_db_user:go7XWzPpb4AOskpA@cluster0.rclw9xo.mongodb.net/task-manager?retryWrites=true&w=majority
```

**⚠️ IMPORTANT:** 
- Set these in the Render dashboard, NOT in `.env.production`
- The `.env.production` file is for local reference only
- Render will use these environment variables automatically

### Step 3: Deploy

1. Push to main branch on GitHub
2. Render will automatically deploy
3. Monitor deployment in Render dashboard
4. Check logs if there are issues

---

## Vercel Frontend Deployment

### Step 1: Create Project on Vercel

1. Go to https://vercel.com/
2. Import your GitHub repository
3. Select "frontend" as root directory

### Step 2: Set Environment Variables on Vercel

In Vercel project settings → Environment Variables:

```
VITE_API_URL=https://bidyut-assignment-0htj.onrender.com/api
VITE_APP_TITLE=Task Manager
```

### Step 3: Deploy

1. Vercel auto-deploys on push to main
2. Check deployment status
3. Your app is live at: https://bidyut-assignment-fawn.vercel.app/

---

## CORS Configuration

The backend now supports CORS for multiple origins:

**Development:**
```env
CORS_ORIGIN=http://localhost:5173,http://localhost:5000
```

**Production:**
```env
CORS_ORIGIN=https://bidyut-assignment-fawn.vercel.app
```

The server automatically:
- ✅ Parses comma-separated origins
- ✅ Strips whitespace
- ✅ Logs configured origins on startup
- ✅ Handles OPTIONS preflight requests
- ✅ Allows credentials

---

## Troubleshooting

### CORS Error: "No 'Access-Control-Allow-Origin' header"

**Cause:** Environment variables not set correctly on Render

**Solution:**
1. Go to Render dashboard
2. Select your service
3. Click "Environment"
4. Verify `CORS_ORIGIN` is set to your Vercel frontend URL
5. Redeploy

### 500 Error on /api/tasks

**Most Common:** MongoDB connection failed

**Solution:**
1. Check Render logs: Dashboard → your service → Logs
2. Verify `MONGODB_URI` is correct
3. Ensure MongoDB Atlas IP whitelist includes Render IPs
   - Go to MongoDB Atlas → Network Access
   - Add IP: 0.0.0.0/0 (allows all) or Render's specific IPs

### Database Connection Timeout

**Solution:**
1. MongoDB Atlas → Network Access → IP Whitelist
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Redeploy on Render

---

## MongoDB Atlas IP Whitelist

Due to Render using dynamic IPs, whitelist all IPs:

1. Go to: https://cloud.mongodb.com/v2 (MongoDB Atlas)
2. Project → Network Access
3. Click "Add IP Address"
4. Enter: `0.0.0.0/0`
5. Click "Confirm"

---

## Health Check

Test your backend is working:

```bash
curl https://bidyut-assignment-0htj.onrender.com/health
```

Should return:
```json
{
  "status": "Server is running",
  "environment": "production",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

---

## Monitoring

- **Render Dashboard:** Check logs and resource usage
- **Vercel Dashboard:** Check deployment status
- **MongoDB Atlas:** Monitor database usage and connections
- **Browser DevTools:** Check Console and Network tabs for errors

---

## Environment Variables Reference

### Backend (.env.production)
```env
PORT=5000                           # Port (Render assigns)
NODE_ENV=production                 # Node environment
CORS_ORIGIN=...                     # Frontend URL(s)
MONGODB_URI=...                     # MongoDB connection
```

### Frontend (.env.production / Vercel)
```env
VITE_API_URL=...                    # Backend API URL
VITE_APP_TITLE=Task Manager         # App title
```

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render environment variables set correctly
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Vercel environment variables set
- [ ] Backend responds to /health endpoint
- [ ] Frontend can fetch /api/tasks
- [ ] No CORS errors in browser console
- [ ] Can create/edit/delete tasks
- [ ] Database persists data

---

**Need Help?**

Check logs:
1. Render: Dashboard → your service → Logs
2. Vercel: Project → Deployments → click deployment → Logs
3. Browser: F12 → Console tab

Common issues are usually:
1. Missing environment variables
2. MongoDB IP whitelist
3. Incorrect CORS_ORIGIN
4. Typo in connection string
