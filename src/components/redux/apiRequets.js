import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./Slice/authSlice"
import { toast } from "react-toastify";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:7000/users/login', user);
        dispatch(loginSuccess(res.data));
        toast.success('Đăng Nhập Thành Công', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                marginTop: "50px" // Thêm giá trị z-index mong muốn
            },
        });

        if (res.data.role === 1) {
            navigate('/')
        } else {
            navigate('/admin');
        }
    } catch (err) {
        dispatch(loginFailed());
        toast.error('Vui lòng kiểm tra lại Email và Password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                marginTop: "50px"
            },
        });
    }
};
export const LogoutUser = async (dispatch, navigator) => {
    dispatch(logoutStart());
    try {
        await dispatch(logoutSuccess());
        navigator('/')
    } catch (err) {
        dispatch(logoutFailed())
    }
}