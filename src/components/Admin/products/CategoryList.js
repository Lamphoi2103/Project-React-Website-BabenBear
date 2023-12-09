import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const [error, setError] = useState(null);
    const [isModalAdd, setIsModalAdd] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [selectRow, setSelectRow] = useState(null);
    const [checkPoint, setCheckPoint] = useState(false)

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
            name: row.name
        })
    }
    const closeModalEdit = () => {
        setIsModalEdit(false);
    }
    const handleDelete = async () => {
        try {
            const deleteCate = await axios.delete(`http://localhost:7000/categories/delete/${selectRow._id}`)
            if (deleteCate.status === 200) {
                toast.success(`Xóa Loại Thành Công`, {
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                ;
                const categotyResponse = await axios.get('http://localhost:7000/categories');
                setCategoryList(categotyResponse.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [checkPoint])
    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
            maxWidth: '50%'
        },
        {
            name: 'Tên Loại',
            selector: row => row.name,
            sortable: true,
            maxWidth: '50%'
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
            maxWidth: '50%'

        }
    ]
    const formAdd = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn không được bỏ trống tên loại'),
        }),
        onSubmit: async (values) => {
            // console.log(values);
            try {
                const addCate = await axios.post('http://localhost:7000/categories/add', values);
                if (addCate.status === 200) {
                    toast.success('Thêm Loại Thành Công', {
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
                    formAdd.resetForm();
                    setCheckPoint(!checkPoint)
                }
            } catch (e) {
                console.error('lỗi khi thêm loại', error);
            }
        }
    })
    const formEdit = useFormik({
        initialValues: {
            _id: '',
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn không được bỏ trống tên loại'),
        }),
        onSubmit: async (values) => {
            try {
                const editCate = await axios.put(`http://localhost:7000/categories/edit/${values._id}`, values)
                if (editCate.status === 200) {
                    toast.success('Sửa Loại Thành Công', {
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
            } catch (e) {
                console.error('lỗi khi sửa loại', error);
            }
        }
    })
    return (
        <>
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 relative">
                <strong className="text-gray-700 font-bold text-[24px]">Danh Sách Loại</strong>
                <div className='my-3 flex justify-between'>
                    <div>
                        <button className='bg-blue-600 text-white w-20 h-8 rounded-[5px]' onClick={() => openModalAdd()} >Thêm</button>

                    </div>
                </div>

                <div>
                    <DataTable
                        columns={columns}
                        data={categoryList}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={true}
                        pagination
                    />
                </div>
            </div>
            {isModalAdd && (
                <div className=' z-50 bg-white rounded-[10px] p-5 absolute top-20 left-[55%] translate-x-[-50%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                    <strong className="text-gray-700 font-bold text-[24px]">Thêm Loại</strong>
                    <i className="fa-solid fa-x text-[22px] font-medium absolute top-5 right-5 cursor-pointer hover:text-red-600" onClick={() => closeModalAdd()}></i>
                    <form action="" onSubmit={formAdd.handleSubmit} className='max-w-4xl w-[800px] mx-auto mt-5'>
                        <div className='mb-5'>
                            <label htmlFor="name" className='block mb-2 text-[16px] font-medium text-gray-900'>Tên Loại</label>
                            <input value={formAdd.values.name} onChange={formAdd.handleChange} id='name' type="text" className='bg-gray-50 border-solid border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                            {formAdd.errors.name && formAdd.touched.name && (<p className='text-red-600 text-[16px]'>{formAdd.errors.name}</p>)}
                        </div>
                        <div className='mb-5'>
                            <button type='submit' className='w-full bg-blue-600 text-[18px] text-white h-10 rounded-lg'>Thêm Loại</button>
                        </div>
                    </form>
                </div>
            )}
            {isModalDelete && selectRow && (
                <div className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white rounded-lg w-[400px] p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <p className='text-center px-3 font-bold text-[17px]'>Bạn có muốn xóa loại "{selectRow.name}"</p>
                    <div className='flex justify-between mt-5'>
                        <button onClick={closeModalDelete} className=' w-[80px] h-[45px] rounded-lg bg-red-600 m-3 text-[16px] font-semibold text-white'>Không</button>
                        <button onClick={handleDelete} className=' w-[80px] h-[45px] rounded-lg bg-green-600 m-3 text-[16px] font-semibold text-white'>Có</button>
                    </div>
                </div>
            )}
            {isModalEdit && (
                <div className=' z-50 bg-white rounded-[10px] p-5 absolute top-20 left-[55%] translate-x-[-50%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                    <strong className="text-gray-700 font-bold text-[24px]">Sửa Loại</strong>
                    <i className="fa-solid fa-x text-[22px] font-medium absolute top-5 right-5 cursor-pointer hover:text-red-600" onClick={() => closeModalEdit()}></i>
                    <form action="" onSubmit={formEdit.handleSubmit} className='max-w-4xl w-[800px] mx-auto mt-5'>
                        <div className='mb-5'>
                            <label htmlFor="name" className='block mb-2 text-[16px] font-medium text-gray-900'>Tên Loại</label>
                            <input value={formEdit.values.name} onChange={formEdit.handleChange} id='name' type="text" className='bg-gray-50 border-solid border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                            {formEdit.errors.name && formEdit.touched.name && (<p className='text-red-600 text-[16px]'>{formEdit.errors.name}</p>)}
                        </div>
                        <div className='mb-5'>
                            <button type='submit' className='w-full bg-blue-600 text-[18px] text-white h-10 rounded-lg'>Sửa Loại</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default CategoryList;