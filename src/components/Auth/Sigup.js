import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Sigup() {
    const navigate = useNavigate();
    const formSigup = useFormik({
        initialValues: {
            name: '',
            password: '',
            email: '',
            confirmpassword: '',
            address: '',
            phone: '',
            role: '1',
            thumbnail: 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn không được bỏ trống tên người dùng'),
            password: Yup.string()
                .min(5, 'Mật khẩu tối thiểu là 5 ký tự !')
                .required('Bạn không được bỏ trống password'),
            email: Yup.string()
                .email('Bạn phải ghi đúng định dạng email')
                .required('Bạn không được bỏ trống email'),
            confirmpassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Mật khẩu không giống nhau')
                .min(5, 'Mật khẩu tối thiểu là 5 ký tự !')
                .required('Bạn không được bỏ trống confirm password'),
        }),
        onSubmit: async (values) => {
            // Kiểm tra xem password và confirmpassword có giống nhau không
            if (values.password === values.confirmpassword) {
                try {

                    const hashedPassword = await bcrypt.hash(values.password, 10);
                    const newData = {
                        name: values.name,
                        password: hashedPassword,
                        email: values.email,
                        address: values.address,
                        phone: values.phone,
                        role: values.role,
                        thumbnail: values.thumbnail,
                    }
                    const userAdd = await axios.post('http://localhost:7000/users/add', newData);
                    if (userAdd.status === 200) {
                        toast.success('Đăng Ký Thành Công', {
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
                        navigate('/dangnhap')
                    } else {
                        console.error("Đăng ký tài khoản không thành công")
                    }
                } catch (err) {
                    console.error('lỗi khi thêm sản phẩm', err);
                }
            } else {
                // Xử lý khi password và confirmpassword không giống nhau
                console.error('Mật khẩu và xác nhận mật khẩu không giống nhau');
            }
        },
    })
    return (
        <section className="sigup">
            <div>
                <p className="title_sigup">
                    Tạo Tài Khoản
                </p>
                <form action="" onSubmit={formSigup.handleSubmit}>
                    <div>
                        <input type="text" id='name' value={formSigup.values.name} onChange={formSigup.handleChange} placeholder="Tên Người Dùng" />
                        {formSigup.errors.name && formSigup.touched.name && (<p className='text-red-600 text-[16px]'>{formSigup.errors.name}</p>)}
                    </div>
                    <div>
                        <input type="email" id='email' value={formSigup.values.email} onChange={formSigup.handleChange} placeholder="Email" />
                        {formSigup.errors.email && formSigup.touched.email && (<p className='text-red-600 text-[16px]'>{formSigup.errors.email}</p>)}
                    </div>
                    <div>
                        <input type="password" id='password' value={formSigup.values.password} onChange={formSigup.handleChange} placeholder="Mật Khẩu" />
                        {formSigup.errors.password && formSigup.touched.password && (<p className='text-red-600 text-[16px]'>{formSigup.errors.password}</p>)}
                    </div>
                    <div>
                        <input type="password" id='confirmpassword' value={formSigup.values.confirmpassword} onChange={formSigup.handleChange} placeholder="Xác Nhận Mật Khẩu" />
                        {formSigup.errors.confirmpassword && formSigup.touched.confirmpassword && (<p className='text-red-600 text-[16px]'>{formSigup.errors.confirmpassword}</p>)}
                    </div>
                    <input type="submit" value="Tạo Tài Khoản" />
                </form>
                <p className="return_home">
                    <Link to="/">Trờ về trang chủ</Link>
                </p>
            </div>
        </section>
    );
}

export default Sigup;