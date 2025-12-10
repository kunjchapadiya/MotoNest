import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectUserRoute = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
        return <Navigate to="/admin" replace />;
    }
    return <Outlet />;
};

export default ProtectUserRoute;
