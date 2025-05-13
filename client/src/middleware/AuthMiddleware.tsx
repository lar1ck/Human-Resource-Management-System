import { Outlet,useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthMiddleware = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/authPage');
        }
    },[navigate, token])
    return (
        <Outlet />
    )
}

export default AuthMiddleware