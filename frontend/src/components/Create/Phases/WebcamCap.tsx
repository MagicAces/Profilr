import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null); // Ref for the webcam component
  const [imgSrc, setImgSrc] = useState<string | null>(null); // State for storing captured image URL

  // Function to capture a photo from the webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  return (
    <>
      {/* Webcam component */}
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      {/* Capture button */}
      <button onClick={capture}>Capture photo</button>
      {/* Display captured image */}
      {imgSrc && <img src={imgSrc} alt="Captured" />}
    </>
  );
};

export default WebcamCapture;
