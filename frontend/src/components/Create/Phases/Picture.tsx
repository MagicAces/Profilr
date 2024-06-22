import React, {
  useState,
  useRef,
  useEffect,
  ReactEventHandler,
  useCallback,
} from "react";
import axios from "axios";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import * as faceapi from "face-api.js";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { setPhase } from "../../../redux/features/profile/profileSlice";

interface ProcessedImages {
  original: Blob | null;
  whiteBackground: Blob | null;
}

const videoConstraints = {
  width: 294,
  height: 412,
  facingMode: "user",
};

const Picture = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [processedImages, setProcessedImages] = useState<ProcessedImages>({
    original: null,
    whiteBackground: null,
  });
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileSizeKB = file.size / 1024;

      if (fileSizeKB < 60 || fileSizeKB > 100) {
        toast.error("File size must be between 60KB and 100KB.");
        return;
      }

      setSelectedFile(file);
      setImageSrc(URL.createObjectURL(file));
      setUseCamera(false);
    }
  };

  const handleCompleteCrop = async (crop: Crop) => {
    setCompletedCrop(crop);
    if (imageRef.current && crop.width && crop.height) {
      const canvas = canvasRef.current;
      const image = imageRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = crop.width;
          canvas.height = crop.height;
          ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
          );

          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, "image/jpeg");
          });

          if (blob) {
            const faceDetected = await validateFace(blob);
            if (!faceDetected) {
              alert("No face detected");
              return;
            }
            // Change background to white
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, crop.width, crop.height);
            ctx.drawImage(
              image,
              crop.x,
              crop.y,
              crop.width,
              crop.height,
              0,
              0,
              crop.width,
              crop.height
            );

            const whiteBgBlob = await new Promise<Blob | null>((resolve) => {
              canvas.toBlob(resolve, "image/jpeg");
            });

            if (whiteBgBlob) {
              setProcessedImages({
                original: blob,
                whiteBackground: whiteBgBlob,
              });
            }
          }
        }
      }
    }
  };

  const validateFace = async (imageBlob: Blob): Promise<boolean> => {
    const image = await faceapi.bufferToImage(imageBlob);
    const detections = await faceapi.detectAllFaces(image);
    return detections.length > 0;
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setUseCamera(false);
        setImageSrc(imageSrc);
      }
    }
  }, [webcamRef, setImageSrc]);

  function handleImageLoaded(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        294 / 412,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!processedImages.original || !processedImages.whiteBackground) {
      toast.error("Please complete the image processing before submitting.");
      return;
    }

    // const valid = validateInputs();

    // if (!valid) return;

    // dispatch(setPhase(3));
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);
    };

    loadModels();
  }, []);

  return (
    <>
      <form className="picture-upload" onSubmit={handleSubmit}>
        <div className="upload">
          <div className="instructions"></div>
          <div className="action">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              capture="environment"
            />
            <button type="button" onClick={() => setUseCamera(true)}>
              Use Camera
            </button>
          </div>
          {useCamera && (
            <div className="webcam-preview">
              <Webcam
                audio={false}
                height={294}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={412}
                videoConstraints={videoConstraints}
              />
              <button type="button" onClick={capture}>
                Capture
              </button>
            </div>
          )}
        </div>
        {imageSrc && (
          <ReactCrop
            crop={crop}
            aspect={294 / 412}
            onChange={setCrop}
            onComplete={handleCompleteCrop}
          >
            <img src={imageSrc} onLoad={handleImageLoaded} />
          </ReactCrop>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="buttons">
          <button
            type="button"
            className="back-button"
            onClick={() => dispatch(setPhase(3))}
          >
            Back
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Picture;
