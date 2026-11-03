# Third-eye Examination Portal

Third-eye is an online examination platform for teachers and students. It combines exam creation and delivery with AI-assisted grading, real-time proctoring, and a mobile-camera workflow.

## Table of Contents

- [Features](#features)
- [Technology](#technology)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Run the Application](#run-the-application)
- [Contributors](#contributors)

## Features

- Teacher and student accounts with JWT-based authentication.
- Teacher tools for creating exams, configuring questions and marking, and reviewing submissions.
- Student exam interface with a timer, progress saving, and automatic submission behavior.
- AI-assisted question parsing, answer grading, and the SAAN study assistant.
- Browser-based proctoring with face and object detection, incident logging, and a QR/mobile camera workflow.

## Technology

- **Frontend:** React 18, React Router, Redux Toolkit, Material UI, TensorFlow.js, MediaPipe, and PeerJS.
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs, Nodemailer, and PeerJS.
- **Database:** MongoDB.
- **AI:** Google Gemini API for the assistant and AI-enabled exam workflows.

## Current Functionality

### User Authentication and Role Management

- Students and teachers can log in with separate roles and authenticated permissions.
- Secure token-based authentication (JWT) for user accounts.

### Teacher Capabilities

- Teachers can create and manage exams.
- Add customizable questions with negative marking features or custom exam instructions.
- Full access to the dashboard for reviewing student metrics and statistics.

### Student Functionality

- Students can view available or assigned exams and participate in them securely.
- Real-time test interface dynamically displaying questions, custom instructions, a live timer, and an auto-submit feature.

### AI Exam Proctoring

- Real-time AI proctoring of students during exams via desktop and "Third Eye" mobile camera functionalities.
- AI dynamically checks for cheating behaviors, such as mobile phone usage, multiple faces detection, and absence of detected faces.
- Suspicious incidents are logged and continuously viewable by teachers in their specific dashboard.

## Future Scope

### Candidate Verification

- Real-time identity verification prior to the exam start by validating the captured image against a registered profile.

### Voice Recognition

- Utilize voice recognition technology to monitor ambient room noise and identify voice anomalies during online exams, deterring potential collaboration.

### Secure Exam Environment

- Prevent candidates from opening or accessing unauthorized applications, browsing new tabs, or mitigating screen share risks on their devices during the exam.

### Unified Portal

- Expand the platform into a unified portal with built-in chat, a resource repository, and direct answer sheet scanning utilizing WebRTC and mobile devices.

## Getting Started

### Requirements

- Node.js and npm.
- A MongoDB instance, local or hosted.
- A Google Gemini API key to use AI assistant and AI-enabled features.

### Install

Install dependencies from the repository root and both application folders:

```sh
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Environment Variables

Copy `.env.example` to `backend/.env`, then set the values for your environment. The backend loads its environment file from `backend/.env`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign authentication tokens; use a long, random value. |
| `PORT` | No | Backend port; defaults to `5001`. |
| `NODE_ENV` | No | Node environment, for example `development` or `production`. |
| `GEMINI_API_KEY` | For AI features | Google Gemini API key for the assistant and AI exam features. |
| `EMAIL_USER` | For password-reset email | Email account used to send OTP messages. |
| `EMAIL_PASS` | For password-reset email | Email provider app password; do not use or commit your account password. |

Never commit `.env` files or real credentials. `.env.example` contains placeholders only.

### Run the Application

From the repository root, start the backend and frontend together:

```sh
npm run dev
```

The backend listens on `http://localhost:5001`; the frontend development server is available at `http://localhost:3000`. To run them separately, use `npm run dev` in `backend/` and `npm start` in `frontend/`.

## Contributors

- **Avinash Kumar** (AvinashKumar2202) and Team

## License

This project is intended for educational, portfolio, and demonstration purposes.
