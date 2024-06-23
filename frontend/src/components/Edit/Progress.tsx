import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import { setPhase } from "../../redux/features/profile/profileSlice";

import "../../css/progress.css";

const Progress = () => {
  const { phase } = useSelector((state: any) => state.profile);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  // const dispatch = useDispatch();

  const steps = [
    "Personal Info",
    "School Details",
    "Courses Offered",
    "Picture Upload",
  ];
  useEffect(() => {
    if (stepsRef.current[phase]) {
      stepsRef.current[phase]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [phase]);

  return (
    <>
      <div className="step-indicators hide-scrollbar">
        <div className="steps-wrapper">
          <div className="steps-wrapper-top">
            <div
              ref={(el) => (stepsRef.current[1] = el)}
              className={`step ${phase === 1 ? "active" : ""}`}
              // onClick={() => dispatch(setPhase(1))}
            >
              1
            </div>
            <div className="line"></div>
            <div
              ref={(el) => (stepsRef.current[2] = el)}
              className={`step ${phase === 2 ? "active" : ""}`}
              // onClick={() => dispatch(setPhase(2))}
            >
              2
            </div>
            <div className="line"></div>
            <div
              ref={(el) => (stepsRef.current[3] = el)}
              className={`step ${phase === 3 ? "active" : ""}`}
              // onClick={() => dispatch(setPhase(3))}
            >
              3
            </div>
            <div className="line"></div>
            <div
              ref={(el) => (stepsRef.current[4] = el)}
              className={`step ${phase === 4 ? "active" : ""}`}
              // onClick={() => dispatch(setPhase(4))}
            >
              4
            </div>
          </div>
          <div className="steps-wrapper-bottom">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index + 1] = el)}
                className={`step-text ${phase === index + 1 ? "active" : ""}`}
                // onClick={() => dispatch(setPhase(index + 1))}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
