import { useDispatch } from "react-redux";
import { useGetProgramsQuery } from "../redux/features/profile/profileApiSlice";
import { useEffect } from "react";
import { setPrograms } from "../redux/features/profile/profileSlice";
import Content from "../components/Create/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";

import "../css/create.css";
const Create = () => {
  const dispatch = useDispatch();
  const {
    data: programs,
    error: programsError,
    isLoading: programsLoading,
  } = useGetProgramsQuery(null, {
    pollingInterval: 5 * 1000,
    skipPollingIfUnfocused: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!programsLoading && !programsError && programs)
      dispatch(setPrograms(programs?.programs));
  }, [dispatch, programsLoading, programsError]);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.05}
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
