import { useSelector } from "react-redux";
// import Tabs from "./Tabs";
// import Requests from "./Requests";
import Register from "./Register";

const Content = () => {
  const { students } = useSelector((state: any) => state.student);

  return (
    <>
      <div className="dashboard-container-content">
        {/* <Tabs /> */}
        <h3>History ({students.length})</h3>
        <Register />
        {/* {tab === 1 && <Requests />} */}
        {/* {tab === 2 && <Register />} */}
      </div>
    </>
  );
};

export default Content;
