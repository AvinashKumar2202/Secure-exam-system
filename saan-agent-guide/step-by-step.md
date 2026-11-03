# Comprehensive Guide to Building the SAAN AI Agent

The SAAN AI Agent is a robust, intelligent assistant tailored for educational platforms. It features conversational capabilities, a Trust Score system for automated proctoring, and an AI-driven auto-grader.

This guide provides a detailed, step-by-step technical implementation plan, including exact libraries and code structures.

---

## 1. Required Libraries & Tech Stack

### Backend (Node.js & Express)
Navigate to your `backend` directory and install the following libraries via terminal:
```bash
npm install express mongoose dotenv cors @google/generative-ai
```

- **`express`**: To create the API server and handle endpoints.
- **`mongoose`**: For connecting to MongoDB to store chat history, users, and student grades.
- **`dotenv`**: To securely manage environment variables like your secret API key.
- **`cors`**: To allow your React frontend (usually running on port 3000) to communicate with your backend.
- **`@google/generative-ai`**: Google's official Node.js SDK for interacting securely with Gemini models.

### Frontend (React)
Navigate to your `frontend` directory and install the following libraries via terminal:
```bash
npm install axios react-markdown framer-motion lucide-react
```

- **`axios`**: For making clean, promise-based HTTP requests to your backend API.
- **`react-markdown`**: Essential for properly formatting the AI's responses (which often include bold text, lists, or code blocks).
- **`framer-motion`**: To add premium, smooth micro-animations to the chat interface.
- **`lucide-react`**: For beautiful, modern icons (like send buttons, user avatars) in the UI.

---

## Step-by-Step Implementation

### Step 1: API Key Configuration
1. Go to [Google AI Studio](https://aistudio.google.com/) and generate an API key.
2. In your `backend` directory, open or create a `.env` file and add your key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

### Step 2: Backend AI Service Setup (Multi-Model Fallback)
Create a dedicated file for your AI logic (e.g., `backend/controllers/aiController.js`) and a route file (`backend/routes/aiRoutes.js`).

1. **Initialize the Google SDK**: 
   ```javascript
   const { GoogleGenerativeAI } = require('@google/generative-ai');
   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
   ```
2. **Implement Multi-Model Fallback Logic**: Create a POST controller function.
   - **Primary Attempt**: Configure it to use `gemini-2.5-flash`.
   - **Fallback Attempt**: Wrap the call in a `try-catch` block. If an error occurs (like 503 Service Unavailable or 429 Too Many Requests), the `catch` block should automatically retry the exact same prompt using the lighter model, `gemini-2.5-flash-lite`.

### Step 3: Database & Context Memory
To make SAAN intelligent, it must remember the context of the conversation.

1. **Mongoose Schema**: Create a `Chat` schema in `backend/models/chatModel.js` to store the `userId`, `timestamp`, `userMessage`, and `aiResponse`.
2. **Context Injection**: When a user asks a new question, make a database query to load their last 5 previous messages. Concatenate these previous messages with the new prompt before sending it to Gemini. This gives the AI "memory".

### Step 4: Frontend UI Construction
Create the chat interface component in your React application (e.g., `frontend/src/components/SaanChat.jsx`).

1. **State Management**: Use React's `useState` hook.
   ```javascript
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   ```
2. **API Connection**: Create a function that triggers when the user clicks "Send". It should set `isLoading(true)`, use `axios.post('http://localhost:5000/api/ai/chat', { prompt: input })`, update the `messages` array with the response, and set `isLoading(false)`.
3. **Render Markdown**: Map through your `messages` array to display the UI. For the AI's response text, wrap it inside the markdown component:
   ```jsx
   <ReactMarkdown>{msg.text}</ReactMarkdown>
   ```
4. **Animations**: Wrap your individual message bubble components in `<motion.div>` (from `framer-motion`) and add properties like `initial={{ opacity: 0, y: 10 }}` and `animate={{ opacity: 1, y: 0 }}` so messages slide in gracefully.

### Step 5: Implement the Auto-Grader Feature
This feature upgrades the platform from rigid text-matching to intelligent semantic grading.

1. **Backend Endpoint**: Create a `/api/ai/grade` route.
2. **System Prompt**: Structure a strict, instruction-based prompt for Gemini so it acts like a teacher.
   - *Example Prompt*: `"Compare this Student Answer: [Student Input] to this Exact Answer Key: [Correct Answer]. Grade the student out of 10 based on semantic meaning and concept grasp, not exact wording. Return ONLY a JSON object exactly like this: { "score": Number, "feedback": "String" }"`
3. **Database Integration**: Parse the returned JSON object in your backend and automatically `updateOne()` on the student's result record in MongoDB to save the `score`.

### Step 6: Implement Trust Score (Automated Proctoring)
This feature tracks student integrity during exams and reports it to teachers.

1. **Frontend Tracking**: 
   - Add a `visibilitychange` event listener on the `window` object to count how many times the student leaves the exam tab.
   - Add `onCopy` and `onPaste` event handlers to the exam textareas to track unauthorized clipboard activity.
   - Use `Date.now()` to track the total milliseconds taken per question.
2. **Backend Evaluation**: On test submission, POST these metrics to an `/api/ai/proctor` endpoint.
3. **AI Analysis**: Pass the metrics to Gemini and ask it to evaluate the "Trust Score" (0-100) based on anomalous behavior (e.g., switching tabs 5 times and finishing a hard question in 2 seconds should yield a low score). The teacher's dashboard will fetch and display this metric using `lucide-react` shield icons.
