import { useSelector } from "react-redux";
import Personal from "./Phases/Personal";
import Progress from "./Progress";
import School from "./Phases/School";
import Course from "./Phases/Course";
import Picture from "./Phases/Picture";

const Content = () => {
  const { phase } = useSelector((state: any) => state.profile);
  
  return (
    <>
      <div className="edit-container-content">
        <div className="edit-container-content-header">
          <h3>Edit Student Profile</h3>
          <span>Genuinely fill out the details</span>
        </div>
        <div className="edit-container-content-body">
          <Progress />
          {phase === 1 && <Personal />}
          {phase === 2 && <School />}
          {phase === 3 && <Course />}
          {phase === 4 && <Picture />}
        </div>
      </div>
    </>
  );
};

export default Content;
