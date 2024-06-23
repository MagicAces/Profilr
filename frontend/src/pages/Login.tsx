import "../css/login.css";
import logo from "../assets/profilr_2.png";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useGetProfileQuery } from "../redux/features/user/userApiSlice";
import { AUTH_URL } from "../redux/constants";
import Starfield from "react-starfield";
import xaminate from "../assets/xaminate.svg";
import knust from "../assets/knust.png";
import securityShade from "../assets/security_shade.png";
import Loader from "../components/Utils/Loader";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { data, error, isLoading } = useGetProfileQuery(null, {
    skip: skip,
  });

  useEffect(() => {
    setSkip(true);
  }, []);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  useEffect(() => {
    if (error) toast.error("Server Error", { toastId: "E1" });

    if (!isLoading && !error && data) {
      dispatch(setCredentials(data?.user));
      navigate("/");
    }
  }, [dispatch, isLoading, error, navigate]);

  const handleClick = () => {
    setLoader(true);
    console.log(`${import.meta.env.VITE_SERVER_URL}/${AUTH_URL}`);

    const newWindow = window.open(
      `${import.meta.env.VITE_SERVER_URL}${AUTH_URL}`,
      "_blank",
      "width=700,height=800"
    );

    if (newWindow) {
      const timer = setInterval(async () => {
        if (newWindow.closed) {
          setSkip(false);
          setLoader(false);
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 1000);
    }
  };

  if (userInfo) return null;

  return (
    <>
      <Starfield
        starCount={3000}
        starColor={[138, 138, 138]}
        speedFactor={0.2}
        backgroundColor="black"
      />
      {(loader || isLoading) && <Loader curved={false} />}
      <div className="login-container">
        <nav className="login-container-logo">
          <img src={logo} alt="Logo" />
        </nav>
        <div className="login-container-body">
          <p>Log in to Profilr</p>
          <button onClick={handleClick} type="button" disabled={loader}>
            <FcGoogle fontSize={20} />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="login-container-footer">
          <img src={xaminate} alt={"Xaminate"} className="xaminate" />
          <img src={knust} alt={"KNUST"} className="knust" />
          <img
            src={securityShade}
            alt={"Security Shade"}
            className="securityShade"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
