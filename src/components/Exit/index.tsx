import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";


export const Exit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        logout();
    },[]);
    const logout = () => {
        dispatch(authActions.logout());
        navigate('/');
    }  
    return (
        <div>
            Exit
        </div>
    )
}