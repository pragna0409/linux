# Cipher Universe - React Version

## Setup Instructions

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Copy Assets to Public Folder**
   Make sure these files are in the `public` folder:
   - bg.png
   - overlay1.png
   - distro.png
   - redpill.png
   - bluepill.png
   - bye.jpg
   - bgmusic.mp3
   - lin.mp4
   - win.mp4

4. **Start Development Server**
   ```bash
   npm start
   ```
   Opens at http://localhost:3000

## Project Structure

```
src/
├── components/
│   ├── Landing.js          # Landing page
│   ├── Registration.js      # Registration page with pills
│   ├── VideoPage.js        # Video pages (linux/windows)
│   ├── RegistrationModal.js # Registration form modal
│   ├── ByeOverlay.js       # Bye image overlay
│   ├── OneOfUs.js          # "One of Us" page
│   └── Dashboard.js       # Admin dashboard
├── utils/
│   └── registrationHandler.js # Registration utilities
├── styles/
│   └── App.css            # All styles
├── App.js                  # Main app with routing
└── index.js                # Entry point
```

## Features

✅ Full React implementation with routing
✅ Mobile responsive (pills positioned in character hands)
✅ Smooth animations (floating pills, button effects)
✅ Registration saves OS field (linux/windows)
✅ Admin dashboard with JSON import/export
✅ Scrollable dashboard
✅ All original features preserved


