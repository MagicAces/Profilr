import { useDispatch } from "react-redux";
import { useGetProgramsQuery } from "../redux/features/profile/profileApiSlice";
import { useEffect } from "react";
import {
  clearProfile,
  fillStudent,
  setPrograms,
} from "../redux/features/profile/profileSlice";
import Content from "../components/Edit/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";

import "../css/edit.css";
import { useNavigate } from "react-router";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useGetProfileQuery } from "../redux/features/user/userApiSlice";
import Loader from "../components/Utils/Loader";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useGetProfileQuery(null, {
    pollingInterval: 5 * 1000,
    refetchOnReconnect: true,
  });
  const {
    data: programs,
    error: programsError,
    isLoading: programsLoading,
  } = useGetProgramsQuery(null, {
    pollingInterval: 5 * 1000,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!userLoading && userError) {
      toast.error("Error Fetching User");
      navigate("/");
    }
    if (!userLoading && !userError && user) {
      dispatch(setCredentials(user?.user));
      const { student } = user?.user;

      dispatch(
        fillStudent({
          first_name: student?.first_name ?? "",
          last_name: student?.last_name ?? "",
          other_name: student?.other_name ?? "",
          email: student?.email ?? "",
          phone_no: student?.phone_no ?? "",
          gender: student?.gender?.toLowerCase() ?? "",
          level: student?.level?.toString() ?? "",
          semester:
            student?.courses?.length > 0 ? student?.courses[0]?.semester : 0,
          index_number: student?.index_number ?? 0,
          reference_no: student?.reference_no ?? 0,
          program_id: student?.program?.id ?? 0,
          course_ids: student?.courses?.map((course: any) => course?.id) ?? [],
          image: student?.image_url ?? "",
        })
      );
    }
  }, [dispatch, userLoading, userError, user]);

  useEffect(() => {
    if (!programsLoading && !programsError && programs)
      dispatch(setPrograms(programs?.programs));
  }, [dispatch, programsLoading, programsError]);

  useEffect(() => {
    dispatch(clearProfile());
  }, []);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.4}
        backgroundColor="black"
      />
      {userLoading && <Loader />}
      <div className="edit-container">
        <Navbar />
        {!userLoading && !userError ? (
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
