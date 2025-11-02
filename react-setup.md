# React Setup Instructions

To convert this project to React, follow these steps:

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Verify installation: `node --version`

2. **Create React App**
   ```bash
   npx create-react-app cipher-universe-react
   cd cipher-universe-react
   ```

3. **Install React Router**
   ```bash
   npm install react-router-dom
   ```

4. **Copy Assets**
   - Copy all images (bg.png, overlay1.png, distro.png, redpill.png, bluepill.png, bye.jpg)
   - Copy audio files (bgmusic.mp3)
   - Copy video files (lin.mp4, win.mp4)
   - Copy fonts folder if exists

5. **Project Structure**
   ```
   cipher-universe-react/
   ├── public/
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
   │   ├── components/
   │   │   ├── Landing.js
   │   │   ├── Registration.js
   │   │   ├── VideoPage.js
   │   │   ├── Dashboard.js
   │   │   ├── OneOfUs.js
   │   │   ├── RegistrationModal.js
   │   │   └── ByeOverlay.js
   │   ├── utils/
   │   │   └── registrationHandler.js
   │   ├── styles/
   │   │   └── App.css (from styles.css)
   │   ├── App.js
   │   └── index.js
   └── package.json
   ```

6. **Run Development Server**
   ```bash
   npm start
   ```



