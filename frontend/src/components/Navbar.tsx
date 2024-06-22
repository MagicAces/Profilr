import logo from "../assets/profilr_2.png";

import Profile from "./Utils/Profile";
import "../css/navbar.css";
import { useLogoutMutation } from "../redux/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../redux/features/auth/authSlice";
import Loader from "./Utils/Loader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { clearProfile } from "../redux/features/profile/profileSlice";

const Navbar = () => {
  const [logOut, { isLoading: logoutLoader }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  const handleLogout = async (id: number) => {
    try {
      const res = await logOut({ id }).unwrap();
      dispatch(logout());
      dispatch(clearProfile());
      toast.success(res.message);
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      toast.error((err?.data?.message as string) || (err?.error as string));
    }
  };

  return (
    <>
      {logoutLoader && <Loader />}
      <nav className="navbar-container">
        <img src={logo} alt="Logo" className="navbar-container-logo" />

        {userInfo ? (
          <Profile logout={handleLogout} />
        ) : (
          <Skeleton
            baseColor="#2C2C2C"
            highlightColor="#505050"
            width={40}
            height={40}
            style={{ borderRadius: "0.1rem" }}
            circle={true}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
