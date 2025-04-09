import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layout/admin-layout/AdminLayout";
import useAuth from "../../hooks/useAuth";

const AdminProtectedRoute = () => {
  const {auth} = useAuth();
  const token = localStorage.getItem("accessToken");

  console.log(auth,"====auth====");
  

  if (!token || (auth.role == !"admin" && auth.role == !"Super Admin")) {
    console.log("Not authorized");
    
      return <Navigate to="/login" />;
  }


  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminProtectedRoute;
