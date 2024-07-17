import { useDispatch } from "react-redux";
import { useGetProgramsQuery } from "../redux/features/profile/profileApiSlice";
import { useEffect, useState } from "react";
import {
  fillStudent,
  setPrograms,
} from "../redux/features/profile/profileSlice";
import Content from "../components/Edit/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";

import "../css/edit.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
// import { setCredentials } from "../redux/features/auth/authSlice";
// import { useGetProfileQuery, useGetStudentQuery } from "../redux/features/user/userApiSlice";
import Loader from "../components/Utils/Loader";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useGetStudentQuery } from "../redux/features/student/studentApiSlice";
import { setStudent } from "../redux/features/student/studentSlice";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  // const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: student,
    error: studentError,
    isLoading: studentLoading,
  } = useGetStudentQuery(id, {
    pollingInterval: 5 * 1000,
    refetchOnReconnect: true,
  });
  const {
    data: programs,
    error: programsError,
    isLoading: programsLoading,
  } = useGetProgramsQuery(null, {
    // pollingInterval: 5 * 1000,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!studentLoading && studentError) {
      toast.error("Error Fetching Student", { toastId: "E4" });
      // navigate("/");
    }
    if (!studentLoading && !studentError && student) {
      dispatch(setStudent(student?.student));
      const { student: newStudent } = student;

      dispatch(
        fillStudent({
          first_name: newStudent?.first_name ?? "",
          last_name: newStudent?.last_name ?? "",
          other_name: newStudent?.other_name ?? "",
          email: newStudent?.email ?? "",
          phone_no: newStudent?.phone_no ?? "",
          gender: newStudent?.gender?.toLowerCase() ?? "",
          level: newStudent?.level?.toString() ?? "",
          semester:
            newStudent?.courses?.length > 0
              ? newStudent?.courses[0]?.semester
              : 0,
          index_number: newStudent?.index_number ?? 0,
          reference_no: newStudent?.reference_no ?? 0,
          program_id: newStudent?.program?.id ?? 0,
          course_ids:
            newStudent?.courses?.map((course: any) => course?.id) ?? [],
          image: newStudent?.image_url ?? "",
          // id: student?.id ?? 0
        })
      );
    }
  }, [dispatch, studentLoading, studentError, student]);

  useEffect(() => {
    if (!programsLoading && !programsError && programs)
      dispatch(setPrograms(programs?.programs));
  }, [dispatch, programsLoading, programsError]);

  useEffect(() => {
    const response = window.prompt("Enter the edit password:", "");

    if (response === import.meta.env.VITE_ADMIN_EDIT_PASSWORD) {
      setEdit(true);
    } else {
      if (!response) toast.error("Password required");
      else toast.error("Invalid Password");
      setEdit(false);
      navigate("/student/" + id);
    }
  }, []);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.4}
        backgroundColor="black"
      />
      {studentLoading && <Loader />}
      <div className="edit-container">
        <Navbar />
        {!studentLoading && !studentError && edit ? (
          <Content />
        ) : (
          <Skeleton
            baseColor="#2C2C2C"
            highlightColor="#444444"
            height={"500px"}
            style={{
              borderRadius: "0.5rem",
              // marginTop: "0.5rem",
              padding: "1rem",
              flex: "1",
            }}
          />
        )}
      </div>
    </>
  );
};

export default Edit;
