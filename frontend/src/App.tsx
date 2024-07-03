import { Outlet } from "react-router";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    toast.clearWaitingQueue();
  });

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > Number(expirationTime)) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        limit={1}
        position={"top-center"}
        transition={Zoom}
        theme="dark"
      />
      <Outlet />
    </>
  );
};

export default App;
