import Content from "../components/Home/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";
import "../css/home.css";
import { useGetProfileQuery } from "../redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useGetProfileQuery(null, {
    pollingInterval: 10 * 1000,
    skipPollingIfUnfocused: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!userLoading && !userError && user)
      dispatch(setCredentials(user?.user));
  }, [dispatch, userLoading, userError]);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.2}
        backgroundColor="#121212"
      />
      <div className="home-container">
        <Navbar />
        <Content />
      </div>
    </>
  );
};

export default Home;
