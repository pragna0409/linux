# React Setup Instructions

## Quick Start

1. **Install Node.js** (if not installed)
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Copy Assets to Public Folder**
   
   **Option A: Manual Copy**
   - Create a `public` folder in the root directory
   - Copy these files to `public`:
     - bg.png
     - overlay1.png
     - distro.png
     - redpill.png
     - bluepill.png
     - bye.jpg
     - bgmusic.mp3
     - lin.mp4
     - win.mp4

   **Option B: Using Script** (if Node.js is available)
   ```bash
   node copy-assets.js
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```
   Opens at http://localhost:3000

## Project Structure

```
├── public/                    # Static assets go here
│   ├── index.html
│   ├── bg.png
│   ├── overlay1.png
│   ├── distro.png
│   ├── redpill.png
│   ├── bluepill.png
│   ├── bye.jpg
│   ├── bgmusic.mp3
│   ├── lin.mp4
│   └── win.mp4
├── src/
│   ├── components/           # React components
│   │   ├── Landing.js
│   │   ├── Registration.js
│   │   ├── VideoPage.js
│   │   ├── RegistrationModal.js
│   │   ├── ByeOverlay.js
│   │   ├── OneOfUs.js
│   │   └── Dashboard.js
│   ├── utils/                # Utility functions
│   │   └── registrationHandler.js
│   ├── styles/               # CSS styles
│   │   └── App.css
│   ├── App.js                # Main app with routing
│   └── index.js              # Entry point
├── package.json              # Dependencies
└── README_REACT.md          # Documentation
```

## Features

✅ Full React implementation
✅ React Router for navigation
✅ Mobile responsive (pills in character hands)
✅ Smooth animations
✅ OS field tracking (linux/windows)
✅ Admin dashboard
✅ Scrollable dashboard
✅ All original features preserved


