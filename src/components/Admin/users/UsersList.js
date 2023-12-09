import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


function UsersList() {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);
    const [isModalAdd, setIsModalAdd] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [selectRow, setSelectRow] = useState(null);
    const [checkPoint, setCheckPoint] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7000/users');
                setUserList(response.data);
            } catch (error) {
                setError(error);
            }
        };
        // console.log(error);
        fetchData();
    }, [checkPoint])
    // console.log(userList);
    const openModalAdd = () => {
        setIsModalAdd(true);
    }
    const closeModalAdd = () => {
        setIsModalAdd(false);
    }
    const openModalDelete = (row) => {
        setSelectRow(row);
        setIsModalDelete(true);
    }
    const closeModalDelete = () => {
        setIsModalDelete(false);
    }
    const openModalEdit = (row) => {
        setIsModalEdit(true);
        formEdit.setValues({
            _id: row._id,
            name: row.name,
            password: row.password,
            email: row.email,
            address: row.address,
            phone: row.phone,
            role: row.role,
            thumbnail: row.thumbnail,
        })
    }
    const closeModalEdit = () => {
        setIsModalEdit(false);
    }
    const formAdd = useFormik({
        initialValues: {
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
            password: Yup.string().required('Bạn không được bỏ trống password'),
            email: Yup.string().required('Bạn không được bỏ trống email'),
            address: Yup.string().required('Bạn không được bỏ trống địa chỉ'),
            phone: Yup.string().required('Bạn không được bỏ trống số điện thoại'),
            role: Yup.string().required('Bạn không được bỏ trống phân quyền người dùng'),
            thumbnail: Yup.string().required('Bạn không được bỏ trống hình ảnh người dùng'),
        }),
        onSubmit: async (values) => {
            // console.log(values);
            try {
                const hashedPassword = await bcrypt.hash(values.password, 10);
                values.password = hashedPassword;
                console.log(values);
                const userAdd = await axios.post('http://localhost:7000/users/add', values);
                console.log("Thêm sản phẩm thành công", userAdd.data);
                toast.success('Thêm Người Dùng Thành Công', {
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
                closeModalAdd();
                setCheckPoint(!checkPoint)
                formAdd.resetForm();

            } catch (error) {
                console.error('lỗi khi thêm user', error);
            }
        }
    })
    // console.log(selectRow);
    const handleDelete = async () => {
        try {
            const deleteProduct = await axios.delete(`http://localhost:7000/users/delete/${selectRow._id}`)
            if (deleteProduct.status === 200) {
                toast.success(`Xóa Người Dùng Thành Công`, {
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
                setCheckPoint(!checkPoint);
                setSelectRow(null);
                closeModalDelete();
            } else {
                console.error("Xóa Dữ Liệu Thất Bại")
            }
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu xóa:", err)
        }
    };
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
            password: Yup.string().required('Bạn không được bỏ trống password'),
            email: Yup.string().required('Bạn không được bỏ trống email'),
            address: Yup.string().required('Bạn không được bỏ trống địa chỉ'),
            phone: Yup.string().required('Bạn không được bỏ trống số điện thoại'),
            role: Yup.string().required('Bạn không được bỏ trống phân quyền người dùng'),
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
                            marginTop: "50px"
                        },
                    });
                    closeModalEdit();
                    setCheckPoint(!checkPoint);
                } else {
                    console.error("Cập nhật không thành công")
                }
            } catch (error) {
                console.error('lỗi khi sửa người dùng', error);
            }
        }
    })
    const columns = [
        {
            name: 'Tên',
            selector: row => row.name,
            sortable: true,
            maxWidth: '14%'
        },
        {
            name: 'Hình',
            selector: row => <img className='w-[80px] my-2 rounded-full' src={row.thumbnail} alt={row.name} />,
            sortable: true,
            maxWidth: '14%',
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            maxWidth: '14%',
        },
        {
            name: 'Địa Chỉ',
            selector: row => row.address,
            sortable: true,
            maxWidth: '14%',
        },
        {
            name: 'Số Điện Thoại',
            selector: row => row.phone,
            sortable: true,
            maxWidth: '14%',
        },
        {
            name: 'Vai Trò',
            selector: row => row.role === 1 ? "Người Dùng" : row.role === 2 ? "Nhân Viên" : "Admin",
            sortable: true,
            maxWidth: '14%',
        },
        {
            name: "Hành Động",
            selector: null,
            cell: (row) => [
                <i
                    onClick={() => openModalDelete(row)}
                    className="fa-regular fa-trash-can text-[15px] m-2 hover:text-red-600 "></i>,
                <i
                    onClick={() => openModalEdit(row)}
                    className="fa-solid fa-pen text-[15px] m-2 hover:text-green-600 "></i>
            ],
            maxWidth: '14%',
        }
    ]
    return (
        <>
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 relative">
                <strong className="text-gray-700 font-medium">Danh Sách Người Dùng</strong>
                <div className='my-3 flex justify-between'>
                    <div>
                        <button onClick={() => openModalAdd()} className='bg-blue-600 text-white w-20 h-8 rounded-[5px]'>Add New</button>
                        {isModalAdd && (
                            <div className=' z-50 bg-white rounded-[10px] p-5 absolute top-5 left-[50%] translate-x-[-50%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                <strong className="text-gray-700 font-bold text-[24px]">Thêm Người Dùng</strong>
                                <i className="fa-solid fa-x text-[22px] font-medium absolute top-5 right-5 cursor-pointer hover:text-red-600" onClick={() => closeModalAdd()}></i>
                                <form action="" onSubmit={formAdd.handleSubmit} className='max-w-4xl w-[800px] mx-auto mt-5'>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='mb-5'>
                                            <label htmlFor="name" className='block mb-2 text-[16px] font-medium text-gray-900'> Họ Tên</label>
                                            <input value={formAdd.values.name} onChange={formAdd.handleChange} id='name' type="text" className='bg-gray-50 border-solid border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formAdd.errors.name && formAdd.touched.name && (<p className='text-red-600 text-[16px]'>{formAdd.errors.name}</p>)}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="thumbnail" className='block mb-2 text-[16px] font-medium text-gray-900'>Hình</label>
                                            <input value={formAdd.values.thumbnail} onChange={formAdd.handleChange} id='thumbnail' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formAdd.errors.thumbnail && formAdd.touched.thumbnail && (<p className='text-red-600 text-[16px]'>{formAdd.errors.thumbnail}</p>)}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='mb-5'>
                                            <label htmlFor="password" className='block mb-2 text-[16px] font-medium text-gray-900'>Mật Khẩu</label>
                                            <input value={formAdd.values.password} onChange={formAdd.handleChange} id='password' type="password" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formAdd.errors.password && formAdd.touched.password && (<p className='text-red-600 text-[16px]'>{formAdd.errors.password}</p>)}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="email" className='block mb-2 text-[16px] font-medium text-gray-900'>Email</label>
                                            <input value={formAdd.values.email} onChange={formAdd.handleChange} id='email' type="email" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formAdd.errors.email && formAdd.touched.email && (<p className='text-red-600 text-[16px]'>{formAdd.errors.email}</p>)}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='mb-5'>
                                            <label htmlFor="phone" className='block mb-2 text-[16px] font-medium text-gray-900'>Số Điện Thoại</label>
                                            <input value={formAdd.values.phone} onChange={formAdd.handleChange} id='phone' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formAdd.errors.phone && formAdd.touched.phone && (<p className='text-red-600 text-[16px]'>{formAdd.errors.phone}</p>)}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="role" className='block mb-2 text-[16px] font-medium text-gray-900'>Vai Trò</label>
                                            <select value={formAdd.values.role} onChange={formAdd.handleChange} name="" id="role" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' >
                                                <option value={""} disabled>Chọn quyền</option>
                                                <option value={1} >Người Dùng</option>
                                                <option value={2} >Nhân Viên</option>
                                                <option value={3} >Admin</option>
                                            </select>
                                            {formAdd.errors.role && formAdd.touched.role && (<p className='text-red-600 text-[16px]'>{formAdd.errors.role}</p>)}
                                        </div>
                                    </div>
                                    <div className='mb-5'>
                                        <label htmlFor="address" className='block mb-2 text-[16px] font-medium text-gray-900'>Địa Chỉ</label>
                                        <textarea value={formAdd.values.address} onChange={formAdd.handleChange} id="address" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-solid border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Address..."></textarea>
                                        {formAdd.errors.address && formAdd.touched.address && (<p className='text-red-600 text-[16px]'>{formAdd.errors.address}</p>)}
                                    </div>
                                    <div className='mb-5'>
                                        <button type='submit' className='w-full bg-blue-600 text-[18px] text-white h-10 rounded-lg'>Thêm Người Dùng</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <DataTable
                        columns={columns}
                        data={userList}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={true}
                        pagination
                    />

                </div>
            </div>
            {isModalEdit && (
                <div className=' z-50 bg-white rounded-[10px] p-5 absolute top-20 left-[55%] translate-x-[-50%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                    <strong className="text-gray-700 font-bold text-[24px]">Sửa Người Dùng</strong>
                    <i className="fa-solid fa-x text-[22px] font-medium absolute top-5 right-5 cursor-pointer hover:text-red-600" onClick={() => closeModalEdit()}></i>
                    <form action="" onSubmit={formEdit.handleSubmit} className='max-w-4xl w-[800px] mx-auto mt-5'>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='mb-5'>
                                <label htmlFor="name" className='block mb-2 text-[16px] font-medium text-gray-900'>Họ Tên</label>
                                <input value={formEdit.values.name} onChange={formEdit.handleChange} id='name' type="text" className='bg-gray-50 border-solid border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.name && formEdit.touched.name && (<p className='text-red-600 text-[16px]'>{formEdit.errors.name}</p>)}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="thumbnail" className='block mb-2 text-[16px] font-medium text-gray-900'>Hình</label>
                                <input value={formEdit.values.thumbnail} onChange={formEdit.handleChange} id='thumbnail' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.thumbnail && formEdit.touched.thumbnail && (<p className='text-red-600 text-[16px]'>{formEdit.errors.thumbnail}</p>)}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='mb-5'>
                                <label htmlFor="password" className='block mb-2 text-[16px] font-medium text-gray-900'>Mật Khẩu</label>
                                <input value={formEdit.values.password} onChange={formEdit.handleChange} id='password' type="password" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.password && formEdit.touched.password && (<p className='text-red-600 text-[16px]'>{formEdit.errors.password}</p>)}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="email" className='block mb-2 text-[16px] font-medium text-gray-900'>Email</label>
                                <input value={formEdit.values.email} onChange={formEdit.handleChange} id='email' type="email" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.email && formEdit.touched.email && (<p className='text-red-600 text-[16px]'>{formEdit.errors.email}</p>)}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='mb-5'>
                                <label htmlFor="phone" className='block mb-2 text-[16px] font-medium text-gray-900'>Số Điện Thoại</label>
                                <input value={formEdit.values.phone} onChange={formEdit.handleChange} id='phone' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.phone && formEdit.touched.phone && (<p className='text-red-600 text-[16px]'>{formEdit.errors.phone}</p>)}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="role" className='block mb-2 text-[16px] font-medium text-gray-900'>Vai Trò</label>
                                <select value={formEdit.values.role} onChange={formEdit.handleChange} name="" id="role" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' >
                                    <option value={""} disabled>Chọn quyền</option>
                                    <option value={1} >Người Dùng</option>
                                    <option value={2} >Nhân Viên</option>
                                    <option value={3} >Admin</option>
                                </select>
                                {formEdit.errors.role && formEdit.touched.role && (<p className='text-red-600 text-[16px]'>{formEdit.errors.role}</p>)}
                            </div>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="address" className='block mb-2 text-[16px] font-medium text-gray-900'>Địa Chỉ</label>
                            <textarea value={formEdit.values.address} onChange={formEdit.handleChange} id="address" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-solid border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Address..."></textarea>
                            {formEdit.errors.address && formEdit.touched.address && (<p className='text-red-600 text-[16px]'>{formEdit.errors.address}</p>)}
                        </div>
                        <div className='mb-5'>
                            <button type='submit' className='w-full bg-blue-600 text-[18px] text-white h-10 rounded-lg'>Sửa Người Dùng</button>
                        </div>
                    </form>
                </div>
            )}
            {isModalDelete && selectRow && (
                <div className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white rounded-lg w-[400px] p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <p className='text-center px-3 font-bold text-[17px]'>Bạn có muốn xóa người dùng "{selectRow.name}"</p>
                    <div className='flex justify-between mt-5'>
                        <button onClick={closeModalDelete} className=' w-[80px] h-[45px] rounded-lg bg-red-600 m-3 text-[16px] font-semibold text-white'>Không</button>
                        <button onClick={handleDelete} className=' w-[80px] h-[45px] rounded-lg bg-green-600 m-3 text-[16px] font-semibold text-white'>Có</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default UsersList;