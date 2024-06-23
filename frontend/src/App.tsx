import { Outlet } from "react-router";
import { ToastContainer, Zoom } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > Number(expirationTime)) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  console.log(import.meta.env.VITE_SERVEr_URL);
  return (
    <>
      <ToastContainer limit={1} transition={Zoom} theme="dark" />
      <Outlet />
    </>
  );
};

export default App;
