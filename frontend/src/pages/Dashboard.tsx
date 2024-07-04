import Starfield from "react-starfield";
import { useGetProfilesQuery } from "../redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/features/student/studentSlice";
import { setStudents } from "../redux/features/student/studentSlice";
import Loader from "../components/Utils/Loader";
import Navbar from "../components/Navbar";
import Content from "../components/Dashboard/Content";
import "../css/dashboard.css";

const Dashboard = () => {
  const {
    data: students,
    isLoading: studentsLoading,
    error: studentsError,
  } = useGetProfilesQuery(import.meta.env.VITE_ADMIN_SECRET, {
    pollingInterval: 4 * 1000,
    refetchOnReconnect: true,
  });
  const { loading } = useSelector((state: any) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(studentsLoading));

    if (!studentsLoading && !studentsError && students) {
      dispatch(setStudents(students?.students));
    }
  }, [dispatch, studentsLoading, studentsError, students]);

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
