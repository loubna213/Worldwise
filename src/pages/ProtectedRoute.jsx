import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate()

    useEffect(function() {
        if(!isAuth) navigate('/')
    }, [isAuth])

    return (
        isAuth ? children : null
    )
}

export default ProtectedRoute;