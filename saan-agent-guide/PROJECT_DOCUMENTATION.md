# Project Report: AI-Integrated Educational Platform (Mini-Project)

## 1. Project Overview
This project, titled **Mini-Project**, is a comprehensive educational platform designed to enhance the learning and examination experience for both students and teachers through the integration of Artificial Intelligence. The platform features a robust AI Assistant (**SAAN**), automated grading, and a sophisticated proctoring system (**Third Eye**).

## 2. Problem Statement
Traditional online examination systems often struggle with:
- Maintaining high academic integrity without intrusive monitoring.
- Providing instant, context-aware assistance to students.
- Reducing the manual workload of teachers in grading subjective answers.
- Ensuring a modern, responsive user experience across devices.

## 3. Proposed Solution
The platform addresses these issues by:
- Implementing **SAAN AI**, a chatbot with conversational memory and a multi-model fallback strategy.
- Developing **Third Eye**, an AI-driven proctoring module that uses computer vision to detect cheating.
- Automating the grading of subjective questions using semantic understanding via the Gemini API.
- Using a secure JWT-based authentication system and Redux for state management.

## 4. System Architecture
The system follows a MERN-like architecture with enhanced AI capabilities:
- **Frontend**: React.js with Material-UI (MUI) for styling and Redux Toolkit for state management.
- **Backend**: Node.js and Express.js REST API.
- **Database**: MongoDB for persistent storage of users, exam data, and chat logs.
- **AI Engine**: Google Gemini API (Pro/Flash) and TensorFlow.js for client-side vision.

## 5. Key Features

### 5.1 SAAN AI Assistant
- **Context-Aware**: Remembers the last few messages in a conversation using MongoDB history.
- **Resilient**: Implements a fallback mechanism from `gemini-2.5-flash` to `gemini-2.5-flash-lite` during high traffic or rate limits.
- **Interface**: Uses `react-markdown` for rich text responses and `framer-motion` for smooth animations.

### 5.2 Third Eye (AI Proctoring)
- **Face Detection**: Uses `@tensorflow-models/face-detection` to ensure only the authorized student is present.
- **Object Detection**: Uses `@tensorflow-models/coco-ssd` to identify unauthorized devices like smartphones.
- **Trust Score**: A dynamic metric (0-100) calculated based on tab switches, detected objects, and facial presence.

### 5.3 Intelligent Auto-Grader
- **Semantic Analysis**: Moves beyond keyword matching to grade based on the underlying meaning of answers compared to a teacher-provided key.
- **Feedback Generation**: Provides automated, helpful feedback to students on why they received a specific score.

## 6. Technical Stack Details
| Category | Technology |
| :--- | :--- |
| **Frontend** | React, MUI, Redux Toolkit, Framer Motion |
| **Backend** | Node.js, Express, JWT, Bcrypt |
| **Database** | MongoDB (Mongoose) |
| **AI Models** | Google Gemini 2.5, TensorFlow.js (COCO-SSD, BlazeFace) |
| **Dev Tools** | Nodemon, Concurrently, Git |

## 7. Security & Authentication
- **JWT**: Secure token-based authentication with cookies.
- **Password Hashing**: Bcryptjs used for hashing passwords before storage.
- **Browser Lockdown**: Disabling right-click, copy/paste, and enforcing fullscreen during exams.

## 8. Conclusion
The AI-Integrated Educational Platform demonstrates the power of modern AI in transforming the digital classroom. By automating grading and proctoring while providing a helpful AI companion, it creates a more efficient and secure environment for modern education.

## 9. Future Scope
- **Real-time Voice Proctoring**: Adding audio analysis to detect talking during exams.
- **AI-Generated Exams**: Automatically generating questions based on uploaded PDFs/study material.
- **Plagiarism Detection**: Integrating deep-search APIs to check for copied content from the web.

---
*Documentation generated for the Mini-Project Repository.*
