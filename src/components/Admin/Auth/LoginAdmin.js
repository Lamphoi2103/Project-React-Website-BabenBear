import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { loginUser } from '../redux/apiRequets';
import * as Yup from 'yup';
import { loginUser } from '../../redux/apiRequets';

function LoginAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Bạn phải ghi đúng định dạng email')
                .required('Bạn không được bỏ trống email'),
            password: Yup.string()
                .min(5, 'Mật khẩu tối thiểu là 5 ký tự !')
                .required('Bạn không được bỏ trống password'),
        }),

        onSubmit: async (values) => {
            const neuUser = {
                email: values.email,
                password: values.password
            }
            loginUser(neuUser, dispatch, navigate)
        }
    })
    return (
        <section className="login">
            <div className='w-[500px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-8 '>
                <p className="title_loginadmin">
                    Đăng Nhập
                </p>
                <form action="" onSubmit={formLogin.handleSubmit}>
                    <div>
                        <input type="email" id='email' value={formLogin.values.email} onChange={formLogin.handleChange} placeholder="Email" />
                        {formLogin.errors.email && formLogin.touched.email && (<p className='text-red-600 text-[16px]'>{formLogin.errors.email}</p>)}
                    </div>
                    <div>
                        <input type="password" id='password' value={formLogin.values.password} onChange={formLogin.handleChange} placeholder="Mật Khẩu" /> <br />
                        {formLogin.errors.password && formLogin.touched.password && (<p className='text-red-600 text-[16px]'>{formLogin.errors.password}</p>)}
                    </div>
                    <p className="forgot_pw">
                        <a href="/">Forgot your password</a>
                    </p>
                    <input type="submit" value="ĐĂNG NHẬP" />
                </form>
            </div>
        </section>
    );
}

export default LoginAdmin;