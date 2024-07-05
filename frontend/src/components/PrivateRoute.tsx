import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import Starfield from "react-starfield";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { isAdmin } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");

    if (expirationTime && Number(expirationTime) < Date.now()) {
      dispatch(setIsAdmin(false));
    }

    if (!isAdmin) {
      const response = window.prompt("Enter the admin password:", "");

      if (response === import.meta.env.VITE_ADMIN_PASSWORD) {
        dispatch(setIsAdmin(true));
      } else {
        if (!response) toast.error("Password required");
        else toast.error("Invalid Password");
      }
    }
    toast.clearWaitingQueue();
  }, []);
  // return userInfo ? <Outlet /> : <Navigate to="/login" replace />;

  const handleClick = () => {
    const response = window.prompt("Enter the admin password:", "");

    if (response === import.meta.env.VITE_ADMIN_PASSWORD) {
      dispatch(setIsAdmin(true));
    } else {
      if (!response) toast.error("Password required");
      else toast.error("Invalid Password");
    }
  };
  return isAdmin ? (
    <Outlet />
  ) : (
    <>
      <Starfield
        starCount={1500}
        starColor={[138, 138, 138]}
        speedFactor={0.4}
        backgroundColor="black"
        />
        <div style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>

      <button className="continue-button" type="button" onClick={handleClick}>
        Continue
      </button>
        </div>
    </>
  );
};

export default PrivateRoute;
