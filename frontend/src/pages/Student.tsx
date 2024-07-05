import Starfield from "react-starfield";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setStudent } from "../redux/features/student/studentSlice";
import Navbar from "../components/Navbar";
import Content from "../components/Profile/Content";
import "../css/student.css";
import { useNavigate, useParams } from "react-router";
import { StudentProfile } from "../types";
// import { useGetStudentQuery } from "../redux/features/student/studentApiSlice";
// import Loader from "../components/Utils/Loader";

const Student = () => {
  const { id } = useParams();
  const { students }: { students: StudentProfile[] } = useSelector(
    (state: any) => state.student
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {
  //   data: foundStudent,
  //   error: foundStudentError,
  //   isLoading: foundStudentLoading,
  // } = useGetStudentQuery(id, {
  //   pollingInterval: 4 * 1000,
  //   refetchOnReconnect: true,
  // });

  useEffect(() => {
    if (isNaN(Number(id))) {
      toast.error("Not a valid id");
      navigate("/", { replace: true });
    }
    const student = students.find((s: StudentProfile) => s.id === Number(id));

    if (student === undefined) {
      // toast.error("Student not found");
      navigate("/", { replace: true });
    } else {
      dispatch(setStudent(student));
    }

    // if (!foundStudentLoading && !foundStudentError && foundStudent) {
    //   dispatch(setStudent(foundStudent?.student));
    // }
  }, []);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.37}
        backgroundColor="black"
      />
      {/* {foundStudentLoading && <Loader />} */}
      <div className="student-view-container">
        <Navbar />
        <Content />
      </div>
    </>
  );
};

export default Student;
