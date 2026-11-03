# Exam Security & Detection Implementation Guide

Securing an online exam involves a multi-layered approach that combines browser-level restrictions, activity tracking, and AI-powered webcam monitoring. 

This guide details how to implement comprehensive exam security, the specific libraries to use, and how they tie into the overall "Trust Score" system.

---

## 1. Browser-Level Security (Preventing Basic Cheating)

Before using AI, you must lock down the browser interface to prevent copy-pasting or searching for answers. These restrictions are implemented using native React event listeners and browser APIs.

### A. Disable Copy, Paste, and Right-Click
You can prevent students from copying questions or pasting answers by attaching event listeners to the main exam `<Box>` or `<Container>`.

```jsx
const handleContextMenu = (e) => {
  e.preventDefault(); // Disables right-click menu
  alert("Right-clicking is disabled during the exam.");
};

const handleCopyPaste = (e) => {
  e.preventDefault(); // Disables Ctrl+C / Ctrl+V
  // TODO: Send violation to backend
};

// Usage in JSX:
<div 
  onContextMenu={handleContextMenu} 
  onCopy={handleCopyPaste} 
  onPaste={handleCopyPaste}
>
  {/* Exam Content */}
</div>
```

### B. Enforce Fullscreen Mode
Force the browser into fullscreen when the exam starts. If the student exits fullscreen (e.g., by pressing Esc), it flags a violation.
- **API Used**: Browser Native Fullscreen API (`document.documentElement.requestFullscreen()`).

---

## 2. Tab & Window Tracking (Detecting "Alt-Tabbing")

Students often try to switch tabs to Google answers. You track this using the native `visibilitychange` and `blur`/`focus` events.

```jsx
import { useEffect } from 'react';

const ExamMonitor = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Violation: Student switched tabs!");
        // Update Trust Score in Backend
      }
    };

    const handleWindowBlur = () => {
      console.log("Violation: Browser window lost focus!");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  return null;
};
```

---

## 3. AI Webcam Monitoring (The "Third Eye")

This is the most advanced layer. Based on your `package.json`, your project is already equipped with the perfect libraries for this: `@tensorflow/tfjs`, `@tensorflow-models/face-detection`, and `@tensorflow-models/coco-ssd`.

### Libraries Used
- **`react-webcam`**: Captures the live video feed.
- **`@tensorflow/tfjs`**: The core machine learning engine.
- **`@tensorflow-models/face-detection`**: Detects human faces. Used to verify the student is looking at the screen and that there aren't multiple people.
- **`@tensorflow-models/coco-ssd`**: An object detection model. Used to detect prohibited items like "cell phone" or "book" in the camera frame.

### Implementation Steps

1. **Initialize Models**: Load both the `face-detection` and `coco-ssd` models when the exam component mounts.
   ```javascript
   import * as cocoSsd from '@tensorflow-models/coco-ssd';
   import * as faceDetection from '@tensorflow-models/face-detection';

   // Inside useEffect or initialization function:
   const objectModel = await cocoSsd.load();
   const faceModel = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector);
   ```

2. **Continuous Frame Analysis**: Set an interval (e.g., every 2 seconds) to grab the current frame from `react-webcam`.

3. **Face Checks**:
   - Pass the frame to `faceModel`.
   - **Violation 1**: Returns 0 faces $\rightarrow$ *Student is away from the camera.*
   - **Violation 2**: Returns 2+ faces $\rightarrow$ *Multiple people detected in the room.*

4. **Object Checks**:
   - Pass the frame to `objectModel`.
   - Iterate through the detected objects.
   - **Violation 3**: If `prediction.class === 'cell phone'`, trigger a critical alert immediately.

---

## 4. The Trust Score System (Backend Aggregation)

Instead of immediately terminating the exam, record these violations and calculate a **Trust Score**.

1. **Start with 100 Points**.
2. **Deductions**:
   - Alt-Tabbing / Tab Switch: `-10 points`
   - Copy/Paste attempt: `-5 points`
   - Face not visible (for > 5 seconds): `-15 points`
   - Multiple faces detected: `-30 points`
   - Cell phone detected: `-50 points`
3. **Database**: Every time a violation occurs on the frontend, send a quick `POST /api/exam/violation` request to your Node.js backend.
4. **Teacher Dashboard**: When the teacher views the student's results, they see the final Trust Score. E.g., *"Trust Score: 45/100 (Flagged for cell phone use and multiple tab switches)"*.

By combining browser restrictions, TensorFlow.js models running client-side, and a backend scoring system, you create a highly secure, automated proctoring environment without overwhelming the server.
