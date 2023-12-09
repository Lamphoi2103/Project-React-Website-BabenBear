import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
export const ProtectedRoute = () => {
    const status = useSelector(state => state.auth.login.status);
    console.log(status);
    console.log("daDangNhap=", status);
    if (!status) return <Navigate to="/dangnhap" />
    else return (<Outlet />);
};

