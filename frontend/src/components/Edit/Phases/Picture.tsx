import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import * as faceapi from "face-api.js";
import { useDispatch, useSelector } from "react-redux";
import sample from "../../../assets/sample.png";
import { toast } from "react-toastify";
import {
  clearProfile,
  fillStudent,
  setPhase,
} from "../../../redux/features/profile/profileSlice";
import Loader from "../../Utils/Loader";
import { useDebounceEffect } from "../../../utils/useDebounceEffect";
import { canvasPreview } from "../../../utils/canvasPreview";
import { blobToBase64 } from "../../../utils/funct";
import { StudentInput } from "../../../types";
import { useNavigate } from "react-router";
// import { useUpdateProfileMutation } from "../../../redux/features/user/userApiSlice";
import { isEqual } from "lodash";
import { apiSlice } from "../../../redux/features/apiSlice";
import { useUpdateStudentMutation } from "../../../redux/features/student/studentApiSlice";
import heic2any from "heic2any";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const Picture = () => {
  const { student }: { student: StudentInput } = useSelector(
    (state: any) => state.profile
  );
  const { student: originalStudent } = useSelector(
    (state: any) => state.student
  );

  const [imgSrc, setImgSrc] = useState("");

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [loader, setLoader] = useState(false);
  // const [modelsLoaded, isModelsLoaded] = useState(false);

  const [updateStudent, { isLoading: updateLoading }] =
    useUpdateStudentMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loadModels = async () => {
  //     const MODEL_URL = "/models";
  //     Promise.all([
  //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  //       faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
  //     ])
  //       .then(() => {
  //         console.log("hello");
  //         isModelsLoaded(true);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   loadModels();
  // }, []);

  // function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files && e.target.files[0];

  //   if (!file) return;

  //   // Check file size
  //   if (file.size > 4 * 1024 * 1024) {
  //     // 1MB limit
  //     toast.error("File size should be less than 4MB");
  //     return;
  //   }
  //   setCrop(undefined);
  //   dispatch(fillStudent({ ...student, image: "" }));
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () =>
  //     setImgSrc(reader.result?.toString() || "")
  //   );
  //   reader.readAsDataURL(file);
  // }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    // Check file size
    if (file.size > 10 * 1024 * 1024) {
      // 1MB limit
      toast.error("File size should be less than 10MB");
      return;
    }
    setCrop(undefined);
    dispatch(fillStudent({ ...student, image: "" }));
    // const reader = new FileReader();
    // reader.addEventListener("load", () =>
    //   setImgSrc(reader.result?.toString() || "")
    // );
    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      if (file.type === "image/heic" || file.type === "image/heif") {
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
          });
          const blob = Array.isArray(convertedBlob)
            ? convertedBlob[0]
            : convertedBlob;
          const convertedReader = new FileReader();
          convertedReader.onload = () =>
            setImgSrc(convertedReader.result?.toString() || "");
          convertedReader.readAsDataURL(blob);
        } catch (error) {
          toast.error("Failed to convert HEIC image");
        }
      } else {
        setImgSrc(reader.result?.toString() || "");
      }
    });

    reader.readAsDataURL(file);
  }


  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  const cropImage = async () => {
    setLoader(true);
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blob) {
      // const facesDetected = await validateFace(blob);
      // if (facesDetected === 0) {
      //   setLoader(false);
      //   toast.error("No face detected");
      //   return;
      // }

      // if (facesDetected > 1) {
      //   setLoader(false);
      //   toast.error(`Multiple faces (${facesDetected}) detected`);
      //   return;
      // }
      dispatch(fillStudent({ ...student, image: await blobToBase64(blob) }));
    }
    // setCompletedCrop(undefined);
    setImgSrc("");
    setLoader(false);
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  // const validateFace = async (imageBlob: Blob): Promise<number> => {
  //   if (!modelsLoaded) return 0;
  //   try {
  //     const image = await faceapi.bufferToImage(imageBlob);

  //     const detections = await faceapi.detectAllFaces(
  //       image
  //       // new faceapi.TinyFaceDetectorOptions({
  //       //   inputSize: 512,
  //       //   scoreThreshold: 0.5,
  //       // })
  //     );
  //     console.log("Face detection result:", detections);
  //     return detections.length;
  //   } catch (error) {
  //     console.error("Error during face detection:", error);
  //     return 0;
  //   }
  // };

  const notEdited = () => {
    const original: StudentInput = {
      first_name: originalStudent?.first_name ?? "",
      last_name: originalStudent?.last_name ?? "",
      other_name: originalStudent?.other_name ?? "",
      email: originalStudent?.email ?? "",
      phone_no: originalStudent?.phone_no ?? "",
      gender: originalStudent?.gender?.toLowerCase() ?? "",
      level: originalStudent?.level?.toString() ?? "",
      semester:
        originalStudent?.courses?.length > 0
          ? originalStudent?.courses[0]?.semester
          : 0,
      index_number: originalStudent?.index_number ?? 0,
      reference_no: originalStudent?.reference_no ?? 0,
      program_id: originalStudent?.program?.id ?? 0,
      course_ids:
        originalStudent?.courses?.map((course: any) => course?.id) ?? [],
      image: originalStudent?.image_url ?? "",
    };

    if (isEqual(original, student)) return true;

    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (student.image.length <= 0) {
      toast.error("Please complete the image processing before submitting.");
      return;
    }
    if (notEdited()) {
      toast.info("No changes made");
      navigate("/");
      dispatch(clearProfile());
      return;
    }

    try {
      const res = await updateStudent({
        id: originalStudent?.id,
        data: student,
      }).unwrap();
      toast.success(res.message);
      navigate("/");
      dispatch(clearProfile());
      dispatch(apiSlice.util.resetApiState());
    } catch (error: any) {
      toast.error((error?.data?.message as string) || (error?.error as string));
    }
  };

  return (
    <>
      {(loader || updateLoading) && <Loader curved={false} />}
      <form className="picture-upload" onSubmit={handleSubmit}>
        <div className="upload">
          <div className="instructions">
            <p className="heading">Image Upload</p>
            <div className="line"></div>
            <div className="body">
              <p>
                Kindly follow the instructions for the image. It should look
                like the sample image shown.
              </p>
              <ul>
                <li>
                  Size should be between{" "}
                  <span className="bolden">60KB to 100KB</span>
                </li>
                <li>
                  Picture should be in{" "}
                  <span className="bolden">JPG, PNG or JPEG</span> format
                </li>
                <li>
                  Image should be{" "}
                  <span className="bolden">not more than 1 year ago</span>
                </li>
                <li>
                  Recommended dimension should be{" "}
                  <span className="bolden"> 294x412</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="sample">
            <img src={sample} alt="Sample Image" />
          </div>
        </div>
        <div className="action">
          <label htmlFor="inputTag">
            Choose Image <br />
            <input
              id="inputTag"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={onSelectFile}
              // capture="environment"
            />
          </label>
        </div>
        {!!imgSrc && (
          <div className="cropping">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              // minWidth={400}
              minHeight={412}
              minWidth={294}
              locked={true}
              // maxHeight={420}
              // maxWidth={302}
              // circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
                fetchPriority="high"
              />
            </ReactCrop>
          </div>
        )}
        {!!completedCrop && !student.image && (
          <div className="preview">
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
            <button type="button" onClick={cropImage}>
              Crop
            </button>
          </div>
        )}
        {student.image.length > 0 && (
          <div className="result">
            <img
              src={student.image}
              style={{
                objectFit: "contain",

                width: completedCrop?.width || "100%",
                height: completedCrop?.height ?? "auto",
              }}
            />
          </div>
        )}

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
