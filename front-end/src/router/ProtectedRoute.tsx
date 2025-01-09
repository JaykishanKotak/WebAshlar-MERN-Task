import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.userInfo)

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
