# How to Run the React Project

## Step 1: Fix PowerShell Execution Policy (One-time setup)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or if you can't run as admin, try:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

## Step 2: Install Dependencies

In your project directory (C:\Linuxx), run:
```bash
npm install
```

This will install:
- React
- React DOM
- React Router DOM
- React Scripts

## Step 3: Start the Development Server

After dependencies are installed, run:
```bash
npm start
```

The app will:
- Start on http://localhost:3000
- Automatically open in your browser
- Hot-reload when you make changes

## Alternative: If npm still doesn't work

You can use npx directly:
```bash
npx react-scripts start
```

Or use node directly:
```bash
node node_modules/.bin/react-scripts start
```

## Troubleshooting

**If you see "npm is not recognized":**
- Restart your terminal after installing Node.js
- Check Node.js installation: `node --version`

**If assets don't load:**
- Make sure all files are in the `public` folder:
  - bg.png, overlay1.png, distro.png
  - redpill.png, bluepill.png, bye.jpg
  - bgmusic.mp3, lin.mp4, win.mp4

**If port 3000 is busy:**
- The app will ask to use a different port (like 3001)
- Or stop the other process using port 3000

## Build for Production

To create a production build:
```bash
npm run build
```

This creates an optimized build in the `build` folder.


