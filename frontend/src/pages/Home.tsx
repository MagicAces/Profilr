import Content from "../components/Home/Content";
import Navbar from "../components/Navbar";
import Starfield from "react-starfield";
import "../css/home.css";
import { useGetProfileQuery } from "../redux/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import Loader from "../components/Utils/Loader";
import { setLoading } from "../redux/features/profile/profileSlice";

const Home = () => {
  const { loading } = useSelector((state: any) => state.profile);
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
    
    dispatch(setLoading(userLoading));
    if (!userLoading && !userError && user)
      dispatch(setCredentials(user?.user));
  }, [dispatch, userLoading, userError, user]);

  return (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.37}
        backgroundColor="black"
      />
      {(userLoading || loading) && <Loader />}
      <div className="home-container">
        <Navbar />
        <Content />
      </div>
    </>
  );
};

export default Home;
