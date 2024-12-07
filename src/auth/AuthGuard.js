import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ allowedTypes }) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const type = user?.type

    const location = useLocation()
    
    return (
        allowedTypes?.find( allowedType => allowedType == type )
            ? <Outlet />
            : user
                ? <Navigate to="/app/denied"  state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default AuthGuard;