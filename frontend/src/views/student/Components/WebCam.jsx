import React, { useRef, useEffect } from 'react';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as faceDetection from '@tensorflow-models/face-detection';
import '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';

export default function WebCamComponent({ updateCheatingLog, onCameraStatusChange }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const isMounted = useRef(true);
  const lastAlertRef = useRef({ noFace: 0, cellPhone: 0, prohibited: 0, multipleFaces: 0 });

  const runModels = async () => {
    try {
      // Load object detection model
      const net = await cocossd.load();
      
      // Load face detection model
      const faceModel = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig = {
        runtime: 'tfjs',
        maxFaces: 10,
      };
      const faceDetector = await faceDetection.createDetector(faceModel, detectorConfig);

      if (!isMounted.current) return;
      
      console.log('Ai models loaded successfully.');

      intervalRef.current = setInterval(() => {
        if (isMounted.current) {
          detect(net, faceDetector);
        }
      }, 500); // Check twice a second for smoother visual updates
    } catch (err) {
      console.error("Failed to load AI models:", err);
    }
  };

  const drawRect = (boxes, classes, scores, faces, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw objects
    for (let i = 0; i < boxes.length; i++) {
      if (['cell phone', 'book'].includes(classes[i])) {
        const [x, y, width, height] = boxes[i];
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF3B30';
        ctx.fillStyle = '#FF3B30';
        ctx.stroke();
        ctx.font = 'bold 16px Arial';
        ctx.fillText(
          classes[i].toUpperCase() + ' - ' + Math.round(scores[i] * 100) + '%',
          x,
          y > 20 ? y - 8 : 20
        );
      }
    }

    // Draw faces
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i];
      const { xMin, yMin, width, height } = face.box;
      ctx.beginPath();
      ctx.rect(xMin, yMin, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00D4AA';
      ctx.fillStyle = '#00D4AA';
      ctx.stroke();
      ctx.font = 'bold 16px Arial';
      ctx.fillText('FACE', xMin, yMin > 20 ? yMin - 8 : 20);
    }
  };

  const detect = async (net, faceDetector) => {
    if (
      isMounted.current &&
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }

      try {
        const obj = await net.detect(video);
        const faces = await faceDetector.estimateFaces(video);

        if (!isMounted.current) return;

        // Draw bounding boxes on the canvas
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          const boxes = obj.map(o => o.bbox);
          const classes = obj.map(o => o.class);
          const scores = obj.map(o => o.score);
          drawRect(boxes, classes, scores, faces, ctx);
        }

        let face_count = faces.length;
        const now = Date.now();
        
        obj.forEach((element) => {
          if (element.class === 'cell phone') {
            if (now - lastAlertRef.current.cellPhone > 10000) {
              lastAlertRef.current.cellPhone = now;
              updateCheatingLog((prevLog) => ({
                ...prevLog,
                cellPhoneCount: prevLog.cellPhoneCount + 1,
              }));
              toast.error('Cell Phone Detected! Action recorded.', { autoClose: 3000, toastId: 'phone' });
            }
          }
          if (element.class === 'book') {
            if (now - lastAlertRef.current.prohibited > 10000) {
              lastAlertRef.current.prohibited = now;
              updateCheatingLog((prevLog) => ({
                ...prevLog,
              prohibitedObjectCount: prevLog.prohibitedObjectCount + 1,
              }));
              toast.error('Prohibited Object Detected! Action recorded.', { autoClose: 3000, toastId: 'book' });
            }
          }
        });

        // Face condition checks
        if (face_count === 0) {
          if (now - lastAlertRef.current.noFace > 10000) {
            lastAlertRef.current.noFace = now;
            updateCheatingLog((prevLog) => ({
              ...prevLog,
              noFaceCount: prevLog.noFaceCount + 1,
            }));
            toast.error('Face Not Visible! Action recorded.', { autoClose: 3000, toastId: 'noface' });
          }
        } else if (face_count > 1) {
          if (now - lastAlertRef.current.multipleFaces > 10000) {
            lastAlertRef.current.multipleFaces = now;
            updateCheatingLog((prevLog) => ({
              ...prevLog,
              multipleFaceCount: prevLog.multipleFaceCount + 1,
            }));
            toast.error('Multiple Faces Detected! Action recorded.', { autoClose: 3000, toastId: 'multiface' });
          }
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    runModels();
    return () => {
      isMounted.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <Webcam
        ref={webcamRef}
        muted={true}
        onUserMedia={() => onCameraStatusChange?.(true)}
        onUserMediaError={() => onCameraStatusChange?.(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          background: '#000'
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 8,
          objectFit: 'cover'
        }}
      />
    </>
  );
}
