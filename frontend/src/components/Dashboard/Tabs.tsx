import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../redux/features/student/studentSlice";

const Tabs = () => {
  const { tab } = useSelector((state: any) => state.student);

  const dispatch = useDispatch();
  return (
    <>
      <div className="dashboard-container-content-tabs">
        <div
          className={`students ${tab === 1 ? "active" : ""} `}
          onClick={() => dispatch(setTab(1))}
        >
          Students
        </div>{" "}
        <div
          className={`courses ${tab === 2 ? "active" : ""} `}
          onClick={() => dispatch(setTab(2))}
        >
          Courses
        </div>
      </div>
    </>
  );
};

export default Tabs;
