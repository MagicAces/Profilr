import { useSelector } from "react-redux";
// import Tabs from "./Tabs";
import Students from "./Students";
import Course from "./Course";

const Content = () => {
  const { tab } = useSelector((state: any) => state.student);

  return (
    <>
      <div className="dashboard-container-content">
        {/* <Tabs /> */}
        <h3>Pending Requests</h3>
        {tab === 1 && <Students />}
        {tab === 2 && <Course />}
      </div>
    </>
  );
};

export default Content;
