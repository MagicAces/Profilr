import { useDispatch } from "react-redux";
import { useGetProgramsQuery } from "../redux/features/profile/profileApiSlice";
import { useEffect } from "react";
import {
  setPrograms,
} from "../redux/features/profile/profileSlice";
import Content from "../components/Create/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";

import "../css/create.css";
// import { Navigate } from "react-router";
const Create = () => {
  // const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const {
    data: programs,
    error: programsError,
    isLoading: programsLoading,
  } = useGetProgramsQuery(null, {
    pollingInterval: 5 * 1000,
    refetchOnReconnect: true,
  });

  // if (userInfo?.student) return <Navigate to="/" replace />;

  useEffect(() => {
    if (!programsLoading && !programsError && programs)
      dispatch(setPrograms(programs?.programs));
  }, [dispatch, programsLoading, programsError]);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.4}
        backgroundColor="black"
      />
      <div className="create-container">
        <Navbar />
        <Content />
      </div>
    </>
  );
};

export default Create;
