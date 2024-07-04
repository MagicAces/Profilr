import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../redux/features/student/studentSlice";
import { StudentProfile } from "../../types";

const Tabs = () => {
  const { tab, students } = useSelector((state: any) => state.student);

  const dispatch = useDispatch();
  return (
    <>
      <div className="dashboard-container-content-tabs">
        <div
          className={`students ${tab === 1 ? "active" : ""} `}
          onClick={() => dispatch(setTab(1))}
        >
          Requests (
          {
            students.filter(
              (student: StudentProfile) => student.status === "Pending"
            ).length
          }
          )
        </div>{" "}
        <div
          className={`courses ${tab === 2 ? "active" : ""} `}
          onClick={() => dispatch(setTab(2))}
        >
          Students ({students.length})
        </div>
      </div>
    </>
  );
};

export default Tabs;
