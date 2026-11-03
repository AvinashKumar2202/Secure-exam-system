# Third Eye Implementation Guide (AI Proctoring)

The **Third Eye** is an advanced AI proctoring module designed to monitor students during an examination using their webcam. It ensures academic integrity by detecting suspicious behaviors such as looking away, the presence of multiple people, or using unauthorized devices (like smartphones).

This guide provides a step-by-step technical plan to implement the Third Eye feature in your React frontend and Node.js backend.

---

## 1. Required Libraries & Tech Stack

### Frontend (React)
Navigate to your `frontend` directory and install the following packages:
```bash
npm install react-webcam @tensorflow/tfjs @tensorflow-models/blazeface
```
- **`react-webcam`**: A React component for easily accessing the user's webcam and capturing frames.
- **`@tensorflow/tfjs`**: The core TensorFlow.js library for running machine learning models in the browser.
- **`@tensorflow-models/blazeface`**: A lightweight, fast facial detection model. We run this on the *client-side* (in the browser) to save bandwidth and server costs, tracking if the student is looking at the screen.

### Backend (Node.js)
You will reuse the `@google/generative-ai` package already installed. We will utilize the **Gemini Vision** capabilities to analyze periodic snapshots for unauthorized objects (like phones).

---

## Step-by-Step Implementation

### Step 1: Initialize the Webcam Component
Create a new component, e.g., `frontend/src/components/ThirdEye.jsx`.

1. Import `Webcam` from `react-webcam`.
2. Render the webcam video stream in the UI (you can make it small or hide it depending on your design).
3. Ensure you request camera permissions from the user before the exam starts.

```jsx
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const ThirdEye = () => {
  const webcamRef = useRef(null);
  return (
    <div className="third-eye-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
    </div>
  );
};
export default ThirdEye;
```

### Step 2: Client-Side Face Detection (TensorFlow.js)
We want to continuously check if the student's face is visible.

1. Load the `blazeface` model when the component mounts.
2. Use `setInterval` (e.g., every 1-2 seconds) to capture the current video frame.
3. Pass the frame to the `blazeface` model to detect faces.
4. **Logic**:
   - If `faces.length === 0`: The student is away from the screen. Issue a warning!
   - If `faces.length > 1`: Multiple people detected. Issue a critical warning!

### Step 3: Snapshot Capture for Object Detection
While TensorFlow.js handles faces locally, we need Gemini's vision power to detect objects like smartphones.

1. Set up a longer interval (e.g., every 30 seconds, or randomly triggered).
2. Use `webcamRef.current.getScreenshot()` to grab a base64 encoded image string.
3. Send this image string to your backend endpoint via an API call (e.g., `axios.post('/api/proctor/vision', { image: base64Data })`).

### Step 4: Backend Vision Analysis (Gemini API)
Create a new route in your backend (`backend/controllers/proctorController.js`).

1. Receive the base64 image from the frontend.
2. Format the image data as required by the Google Generative AI SDK (InlineData format).
3. Call `gemini-2.5-flash` (which supports multimodal vision inputs).
4. **System Prompt**: 
   *"Analyze this webcam image of a student taking an exam. Does the student have a smartphone, a book, or notes visible? Are they looking away from the screen? Return a JSON object: { "suspicious": boolean, "reason": "description of violation" }."*

### Step 5: Handling Violations & Trust Score
1. If the backend returns `suspicious: true` (e.g., a phone is detected), emit an alert to the frontend.
2. Display a strict warning modal on the student's screen: "Unauthorized object detected. Please put your phone away."
3. **Database Integration**: Log this violation in MongoDB under the student's exam session and immediately deduct points from their overall **Trust Score**.

### Step 6: Privacy and Security Best Practices
- **Consent**: Always display a clear consent banner stating the camera is active and recording for proctoring purposes.
- **Data Retention**: Ensure snapshots sent to the backend are *not* permanently saved unless required for a dispute. Keep the processing in memory and return only the JSON result.
- **Browser Compatibility**: Test the `react-webcam` across Chrome, Firefox, and Edge to ensure permissions flow smoothly.
