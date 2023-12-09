import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
function UserDetail() {
    const [infoUser, setInfoUser] = useState(false);
    const [check, setCheck] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [info, setInfo] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/users/${user._id}`);
                setInfo(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchData();
    }, [check])
    const openModalEdit = () => {
        formEdit.setValues({
            _id: info._id,
            name: info.name,
            password: info.password,
            email: info.email,
            address: info.address,
            phone: info.phone,
            role: info.role,
            thumbnail: info.thumbnail,
        });
        setInfoUser(true)
    }
    const formEdit = useFormik({
        initialValues: {
            _id: '',
            name: '',
            password: '',
            email: '',
            address: '',
            phone: '',
            role: '',
            thumbnail: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn không được bỏ trống tên người dùng'),
            password: Yup.string()
                .min(5, 'Mật khẩu tối thiểu là 5 ký tự !')
                .required('Bạn không được bỏ trống password'),
            email: Yup.string()
                .email('Bạn phải ghi đúng định dạng email')
                .required('Bạn không được bỏ trống email'),
            address: Yup.string().required('Bạn không được bỏ trống địa chỉ'),
            phone: Yup.number().required('Bạn không được bỏ trống số điện thoại'),
            thumbnail: Yup.string().required('Bạn không được bỏ trống hình ảnh người dùng'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                const hashedPassword = await bcrypt.hash(values.password, 10);
                values.password = hashedPassword;
                const editUser = await axios.put(`http://localhost:7000/users/edit/${values._id}`, values);
                if (editUser.status === 200) {
                    toast.success('Sửa Người Dùng Thành Công', {
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
                    setInfoUser(false)
                    setCheck(!check);
                } else {
                    console.error("Cập nhật không thành công")
                }
            } catch (error) {
                console.error('lỗi khi sửa người dùng', error);
            }
        }
    })
    return (
        <>
            <section className='info'>
                <div>
                    <p className='title_info'>
                        Tài Khoản
                    </p>
                    <div className=''>
                        <img src={info.thumbnail} alt={info.name} />
                        <p id="logout">Đăng Xuất</p> <br />
                        <div>
                            <input type="text" value={info.name} className='name' placeholder='Username' readOnly />
                        </div>
                        {/* <div>
                            <input type="password" value={info.} className="password" placeholder="password" readOnly />
                        </div> */}
                        <div>
                            <input type="email" value={info.email} className="email" placeholder="Email" readOnly />
                        </div>
                        <div>
                            <input type="text" value={info.address} className="address" placeholder="Address" readOnly />
                        </div>
                        <div>
                            <input type="text" value={info.phone} className="phone" placeholder="Phone" readOnly />
                        </div>
                        <p onClick={() => openModalEdit()} className='edituser'>
                            Sửa Người Dùng
                        </p>
                        <Link to={'/'} className='return_home'> <p>Trở Về Trang Sản Phẩm</p></Link>
                    </div>
                </div>
            </section>
            {infoUser && (
                <section className='info absolute top-0'>
                    <div className='bg-white z-50 p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <i onClick={() => setInfoUser(!infoUser)} className="fa-solid fa-xmark float-right text-[#423f3f] text-[24px] cursor-pointer"></i>
                        <p className='title_info'>
                            Sửa Người Dùng
                        </p>
                        <form className='' onSubmit={formEdit.handleSubmit}>
                            <div className=''>
                                <input value={formEdit.values.name} onChange={formEdit.handleChange} type="text" id='name' className='name' placeholder='Username' />
                                {formEdit.errors.name && formEdit.touched.name && (<p className='text-red-600 text-[16px]'>{formEdit.errors.name}</p>)}
                            </div>
                            <div className=''>
                                <input value={formEdit.values.thumbnail} onChange={formEdit.handleChange} type="text" id='thumbnail' className='img' placeholder='Image' />
                                {formEdit.errors.thumbnail && formEdit.touched.name && (<p className='text-red-600 text-[16px]'>{formEdit.errors.thumbnail}</p>)}
                            </div>
                            <div className=''>
                                <input value={formEdit.values.password} onChange={formEdit.handleChange} type="password" id='password' className="password" placeholder="password" />
                                {formEdit.errors.password && formEdit.touched.password && (<p className='text-red-600 text-[16px]'>{formEdit.errors.password}</p>)}
                            </div>
                            <div className=''>
                                <input value={formEdit.values.email} onChange={formEdit.handleChange} type="email" id='email' className="email" placeholder="Email" />
                                {formEdit.errors.email && formEdit.touched.email && (<p className='text-red-600 text-[16px]'>{formEdit.errors.email}</p>)}
                            </div>
                            <div className=''>
                                <input value={formEdit.values.address} onChange={formEdit.handleChange} type="text" id='address' className="address" placeholder="Address" />
                                {formEdit.errors.address && formEdit.touched.address && (<p className='text-red-600 text-[16px]'>{formEdit.errors.address}</p>)}
                            </div>
                            <div className=''>
                                <input value={formEdit.values.phone} onChange={formEdit.handleChange} type="text" id='phone' className="phone" placeholder="Phone" />
                                {formEdit.errors.phone && formEdit.touched.phone && (<p className='text-red-600 text-[16px]'>{formEdit.errors.phone}</p>)}
                            </div>
                            <div>
                                <button type='submit' className='w-full h-[52px] text-white text-[18px] font-semibold bg-[#ef9a9a]'>Xác Nhận Sửa</button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
            <section className="order">
                <div >
                    <p className="title_order" id="toggleButton">
                        Đơn Hàng
                    </p>
                    <div id="" className="hidden">
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserDetail;