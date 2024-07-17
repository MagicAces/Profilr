import Starfield from "react-starfield";
// import { useGetProfilesQuery } from "../redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/features/student/studentSlice";
import { setStudents } from "../redux/features/student/studentSlice";
import Loader from "../components/Utils/Loader";
import Navbar from "../components/Navbar";
import Content from "../components/Dashboard/Content";
import "../css/dashboard.css";
import { useGetStudentsQuery } from "../redux/features/student/studentApiSlice";
import { StudentProfile } from "../types";

const Dashboard = () => {
  const { loading, search } = useSelector((state: any) => state.student);
  const {
    data: students,
    isLoading: studentsLoading,
    error: studentsError,
  } = useGetStudentsQuery(null, {
    pollingInterval: 4 * 1000,
    refetchOnReconnect: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(studentsLoading));

    if (!studentsLoading && !studentsError && students) {
      const searchTerm: string = search.toLowerCase();

      const filteredStudents = students.students.filter(
        (student: StudentProfile) => {
          if (searchTerm === "") return true;

          const {
            first_name,
            last_name,
            other_name,
            index_number,
            reference_no,
            level,
            program,
          } = student;

          if (search.includes("level")) {
            const value = searchTerm.split(" ");

            return level.toString().includes(value[1]);
          }
          return (
            first_name.toLowerCase().includes(searchTerm) ||
            last_name.toLowerCase().includes(searchTerm) ||
            (other_name && other_name.toLowerCase().includes(searchTerm)) ||
            index_number.toString().includes(searchTerm) ||
            reference_no.toString().includes(searchTerm) ||
            level.toString().includes(searchTerm) ||
            program.name.toLowerCase().includes(searchTerm)
          );
        }
      );

      dispatch(setStudents(filteredStudents));
    }
  }, [dispatch, studentsLoading, studentsError, students, search]);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.37}
        backgroundColor="black"
      />
      {(studentsLoading || loading) && <Loader />}
      <div className="dashboard-container">
        <Navbar />
        <Content />
      </div>
    </>
  );
};

export default Dashboard;
