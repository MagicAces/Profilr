import Content from "../components/Home/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";
import "../css/home.css";
import { useGetProfileQuery } from "../redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import Loader from "../components/Utils/Loader";
import { clearProfile } from "../redux/features/profile/profileSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useGetProfileQuery(null, {
    pollingInterval: 5 * 1000,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!userLoading && !userError && user)
      dispatch(setCredentials(user?.user));
  }, [dispatch, userLoading, userError, user]);

  useEffect(() => {
    dispatch(clearProfile());
  }, []);
  

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.37}
        backgroundColor="black"
      />
        {userLoading && <Loader />}
      <div className="home-container">
        <Navbar />
        <Content />
      </div>
    </>
  );
};

export default Home;
