import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAdmin } = useSelector((state: any) => state.auth);

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
