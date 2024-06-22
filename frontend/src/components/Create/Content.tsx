import { useSelector } from "react-redux";
import Personal from "./Phases/Personal";
import Progress from "./Progress";
import School from "./Phases/School";
import Course from "./Phases/Course";
import Picture from "./Phases/Picture";
import WebcamCapture from "./Phases/WebcamCap";

const Content = () => {
  const { phase } = useSelector((state: any) => state.profile);
  return (
    <>
      <div className="create-container-content">
        <div className="create-container-content-header">
          <h3>Create Student Profile</h3>
          <span>Genuinely fill out the details</span>
        </div>
        <div className="create-container-content-body">
          <Progress />
          {phase === 1 && <Personal />}
          {phase === 2 && <School />}
          {phase === 3 && <Course />}
          {phase === 4 && <WebcamCapture />}
        </div>
      </div>
    </>
  );
};

export default Content;
