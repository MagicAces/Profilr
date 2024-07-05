import logo from "../assets/profilr_2.png";

// import Profile from "./Utils/Profile";
import "../css/navbar.css";
// import { useLogoutMutation } from "../redux/features/user/userApiSlice";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { logout, setIsAdmin } from "../redux/features/auth/authSlice";
// import Loader from "./Utils/Loader";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { clearProfile } from "../redux/features/profile/profileSlice";
// import { RiAdminLine } from "react-icons/ri";
// import { PiStudentFill } from "react-icons/pi";
import { TbUserPlus } from "react-icons/tb";
// import {
//   clearStudents,
// } from "../redux/features/student/studentSlice";
// import { apiSlice } from "../redux/features/apiSlice";

const Navbar = () => {
  // const [logOut, { isLoading: logoutLoader }] = useLogoutMutation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { userInfo, isAdmin } = useSelector((state: any) => state.auth);
  // const handleLogout = async (id: number) => {
  //   try {
  //     const res = await logOut({ id }).unwrap();
  //     toast.success(res.message);
  //   } catch (err: any) {
  //     console.log(err);
  //     // toast.error((err?.data?.message as string) || (err?.error as string));
  //   }
  //   dispatch(logout());
  //   dispatch(clearProfile());
  //   dispatch(clearStudents());
  //   dispatch(apiSlice.util.resetApiState());
  //   navigate("/login");
  // };

  // const handleSwitch = () => {
  //   if (!isAdmin) {
  //     const response = window.prompt("Enter the admin password:", "");

  //     if (response === import.meta.env.VITE_ADMIN_PASSWORD) {
  //       dispatch(setIsAdmin(true));
  //       navigate("/admin");
  //     } else {
  //       if (!response) return;
  //       toast.error("Invalid Password");
  //     }
  //   } else {
  //     const leave = window.confirm("Do you want to leave to the student page?");
  //     if (leave) {
  //       dispatch(setIsAdmin(false));
  //       dispatch(apiSlice.util.invalidateTags(["User"]));
  //       navigate("/");
  //     }
  //   }
  // };

  return (
    <>
      {/* {logoutLoader && <Loader />} */}
      <nav className="navbar-container">
        <img src={logo} alt="Logo" className="navbar-container-logo" />
        <div className="navbar-container-right">
          <button
            className="create-profile"
            onClick={() => navigate("/create")}
          >
            <TbUserPlus />
            <span>New</span>
          </button>
          {/* {isAdmin ? (
            <div className="switch-user" onClick={handleSwitch}>
              <PiStudentFill />
            </div>
          ) : (
            <div className="switch-user" onClick={handleSwitch}>
              <RiAdminLine />
            </div>
          )} */}
          {/* {userInfo ? (
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
          )} */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
