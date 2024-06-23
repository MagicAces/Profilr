import "../css/login.css";
import logo from "../assets/profilr_2.png";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useFetchProfileMutation } from "../redux/features/user/userApiSlice";
import Starfield from "react-starfield";
import xaminate from "../assets/xaminate.svg";
import knust from "../assets/knust.png";
import securityShade from "../assets/security_shade.png";
import Loader from "../components/Utils/Loader";
import { AUTH_URL } from "../redux/constants";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [fetchProfile, { isLoading }] = useFetchProfileMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetchProfile({}).unwrap();
        dispatch(setCredentials(res.user));
        navigate("/");
      } catch (error: any) {
        toast.error(error?.data?.message || error?.error, {
          toastId: "E1",
        });
        navigate("/login");
      }
    };

    const params = new URLSearchParams(window.location.search);
    const authSuccess = params.get("auth-success");
    const error = params.get("error");

    if (error) {
      toast.error(decodeURIComponent(error), { toastId: "E1" });
    } else if (authSuccess) {
      setLoader(true);
      fetchUserProfile();
    }
  }, [fetchProfile, dispatch, navigate]);

  const handleClick = () => {
    setLoader(true);
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }${AUTH_URL}`;
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
