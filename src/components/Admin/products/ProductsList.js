import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import moment from 'moment';

function ProductsList() {
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [isModalAdd, setIsModalAdd] = useState(false);
    const [checkPoint, setCheckPoint] = useState(true);
    const [error, setError] = useState(null);
    const [selectRow, setSelectRow] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);


    // console.log(selectRow);
    const openModal = (row) => {
        setSelectRow(row)
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }
    const formEdit = useFormik({
        initialValues: {
            _id: '',
            name: '',
            thumbnail: '',
            price: '',
            date_time: '',
            category: '',
            color: '',
            deription: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn không được bỏ trống tên sản phẩm'),
            thumbnail: Yup.string().required('Bạn không được bỏ trống ảnh sản phẩm'),
            price: Yup.number().required('Bạn không được bỏ trống giá sản phẩm'),
            date_time: Yup.date().required('Bạn không được bỏ trống ngày thêm sản phẩm'),
            category: Yup.string().required('Bạn không được bỏ trống danh mục sản phẩm'),
            color: Yup.array().required('Bạn không được bỏ trống màu sản phẩm'),
            deription: Yup.string().required('Bạn không được bỏ trống mô tả sản phẩm'),
        }),
        onSubmit: async (values) => {
            try {
                const thumbnailArray = values.thumbnail.split(';');
                values.thumbnail = thumbnailArray;
                const editproduct = await axios.put(`http://localhost:7000/products/edit/${values._id}`, values);
                if (editproduct.status === 200) {
                    toast.success('Sửa Sản Phẩm Thành Công', {
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
                    closeModalEdit();
                    setCheckPoint(!checkPoint)
                } else {
                    console.error("Cập nhật không thành công")
                }
            } catch (error) {
                console.error('lỗi khi sửa sản phẩm', error);
            }
        }
    });
    const openModalEdit = (row) => {
        setModalIsOpenEdit(true);
        // setSelectRow(row);
        console.log(row);
        formEdit.setValues({
            _id: row._id,
            name: row.name,
            thumbnail: String(row.thumbnail),
            price: row.price,
            date_time: moment(row.date_time).format('YYYY-MM-DD'),
            category: row.category._id,
            color: row.color,
            deription: row.deription,
        })
    }
    const closeModalEdit = () => {
        setModalIsOpenEdit(false);
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            thumbnail: '',
            price: '',
            date_time: '',
            category: '',
            color: '',
            deription: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn không được bỏ trống tên sản phẩm'),
            thumbnail: Yup.string().required('Bạn không được bỏ trống ảnh sản phẩm'),
            price: Yup.number().required('Bạn không được bỏ trống giá sản phẩm'),
            date_time: Yup.date().required('Bạn không được bỏ trống ngày thêm sản phẩm'),
            category: Yup.string().required('Bạn không được bỏ trống danh mục sản phẩm'),
            color: Yup.string().required('Bạn không được bỏ trống màu sản phẩm'),
            deription: Yup.string().required('Bạn không được bỏ trống mô tả sản phẩm'),
        }),
        onSubmit: async (values) => {

            // console.log(values);
            try {
                const thumbnailArray = values.thumbnail.split(';');
                values.thumbnail = thumbnailArray;
                const addproduct = await axios.post('http://localhost:7000/products/add', values);
                console.log("Thêm sản phẩm thành công", addproduct.data);
                toast.success('Thêm Sản Phẩm Thành Công', {
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
                setIsModalAdd(!isModalAdd);
                setCheckPoint(!checkPoint)
                formik.resetForm();

            } catch (error) {
                console.error('lỗi khi thêm sản phẩm', error);
            }
        }
    })
    const handleAdd = () => {
        setIsModalAdd(!isModalAdd);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7000/products');
                setProductList(response.data);
                // console.log(123);
                const categotyResponse = await axios.get('http://localhost:7000/categories');
                setCategoryList(categotyResponse.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [checkPoint])
    // console.log(categoryList);
    // console.log(productList);
    const handleDelete = async () => {
        try {
            const deleteProduct = await axios.delete(`http://localhost:7000/products/delete/${selectRow._id}`)
            if (deleteProduct.status === 200) {
                toast.success(`Xóa Sản Phẩm Thành Công`, {
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
                closeModal();
            } else {
                console.error("Xóa Dữ Liệu Thất Bại")
            }
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu xóa:", err)
        }
    };
    const columns = [
        {
            name: "Tên",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Loại",
            selector: row => row.category.name,
            sortable: true
        },
        {
            name: "Ảnh",
            selector: row => <img src={row.thumbnail[0]} alt={row.name} className='w-[100px] rounded-sm py-5' />,
            sortable: true
        },
        {
            name: "Giá",
            selector: row => Number(row.price).toLocaleString("vi") + " VNĐ",
            sortable: true
        },
        {
            name: "Ngày Tạo",
            selector: row => moment(row.date_time).format('YYYY-MM-DD'),
            sortable: true
        },
        {
            name: "Hành Động",
            selector: null,
            cell: (row) => [
                <i
                    // onClick={() => handleDelete(row)}
                    onClick={() => openModal(row)}
                    className="fa-regular fa-trash-can text-[15px] m-2 hover:text-red-600 "></i>,
                <i
                    onClick={() => openModalEdit(row)}
                    className="fa-solid fa-pen text-[15px] m-2 hover:text-green-600 "></i>
            ]
        }
    ]
    return (
        <>

            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 relative">
                <strong className="text-gray-700 font-bold text-[24px]">Danh Sách Sản Phẩm</strong>

                <div className='my-3 flex justify-between'>
                    <div>
                        <button className='bg-blue-600 text-white w-20 h-8 rounded-[5px]' onClick={() => handleAdd()}>Thêm</button>
                        {isModalAdd && (
                            <div className=' z-50 bg-white rounded-[10px] p-5 absolute top-5 left-[50%] translate-x-[-50%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                <strong className="text-gray-700 font-bold text-[24px]">Thêm Sản Phẩm</strong>
                                <i className="fa-solid fa-x text-[22px] font-medium absolute top-5 right-5 cursor-pointer hover:text-red-600" onClick={() => handleAdd()}></i>
                                <form action="" onSubmit={formik.handleSubmit} className='max-w-4xl w-[800px] mx-auto mt-5'>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='mb-5'>
                                            <label htmlFor="name" className='block mb-2 text-[16px] font-medium text-gray-900'>Tên Sản Phẩm</label>
                                            <input value={formik.values.name} onChange={formik.handleChange} id='name' type="text" className='bg-gray-50 border-solid border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formik.errors.name && formik.touched.name && (<p className='text-red-600 text-[16px]'>{formik.errors.name}</p>)}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="thumbnail" className='block mb-2 text-[16px] font-medium text-gray-900'>Hình Sản Phẩm</label>
                                            <input value={formik.values.thumbnail} onChange={formik.handleChange} id='thumbnail' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formik.errors.thumbnail && formik.touched.thumbnail && (<p className='text-red-600 text-[16px]'>{formik.errors.thumbnail}</p>)}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='mb-5'>
                                            <label htmlFor="price" className='block mb-2 text-[16px] font-medium text-gray-900'>Giá</label>
                                            <input value={formik.values.price} onChange={formik.handleChange} id='price' type="number" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formik.errors.price && formik.touched.price && (<p className='text-red-600 text-[16px]'>{formik.errors.price}</p>)}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="date_time" className='block mb-2 text-[16px] font-medium text-gray-900'>Ngày</label>
                                            <input value={formik.values.date_time} onChange={formik.handleChange} id='date_time' type="date" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formik.errors.date_time && formik.touched.date_time && (<p className='text-red-600 text-[16px]'>{formik.errors.date_time}</p>)}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='mb-5'>
                                            <label htmlFor="category" className='block mb-2 text-[16px] font-medium text-gray-900'>Loại</label>
                                            <select value={formik.values.category} onChange={formik.handleChange} name="" id="category" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' >
                                                <option value={""} disabled>Chọn Danh Mục</option>
                                                {categoryList.map((cate) => (
                                                    <option key={cate._id} value={cate._id}>{cate.name}</option>
                                                ))}
                                            </select>
                                            {formik.errors.category && formik.touched.category && (<p className='text-red-600 text-[16px]'>{formik.errors.category}</p>)}
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="color" className='block mb-2 text-[16px] font-medium text-gray-900'>Màu Sắc</label>
                                            <input value={formik.values.color} onChange={formik.handleChange} id='color' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                            {formik.errors.color && formik.touched.color && (<p className='text-red-600 text-[16px]'>{formik.errors.color}</p>)}
                                        </div>
                                    </div>
                                    <div className='mb-5'>
                                        <label htmlFor="deription" className='block mb-2 text-[16px] font-medium text-gray-900'>Mô Tả</label>
                                        <textarea value={formik.values.deription} onChange={formik.handleChange} id="deription" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-solid border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description..."></textarea>
                                        {formik.errors.deription && formik.touched.deription && (<p className='text-red-600 text-[16px]'>{formik.errors.deription}</p>)}
                                    </div>
                                    <div className='mb-5'>
                                        <button type='submit' className='w-full bg-blue-600 text-[18px] text-white h-10 rounded-lg'>Thêm Sản Phẩm</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <DataTable
                        columns={columns}
                        data={productList}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={true}
                        pagination
                    />

                </div>
            </div>
            {modalIsOpenEdit && (
                <div className=' z-50 bg-white rounded-[10px] p-5 absolute top-20 left-[55%] translate-x-[-50%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                    <strong className="text-gray-700 font-bold text-[24px]">Sửa Sản Phẩm</strong>
                    <i className="fa-solid fa-x text-[22px] font-medium absolute top-5 right-5 cursor-pointer hover:text-red-600" onClick={() => closeModalEdit()}></i>
                    <form action="" onSubmit={formEdit.handleSubmit} className='max-w-4xl w-[800px] mx-auto mt-5'>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='mb-5'>
                                <label htmlFor="name" className='block mb-2 text-[16px] font-medium text-gray-900'>Tên Sản Phẩm</label>
                                <input value={formEdit.values.name} onChange={formEdit.handleChange} id='name' type="text" className='bg-gray-50 border-solid border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.name && formEdit.touched.name && (<p className='text-red-600 text-[16px]'>{formEdit.errors.name}</p>)}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="thumbnail" className='block mb-2 text-[16px] font-medium text-gray-900'>Hình Sản Phẩm</label>
                                <input value={formEdit.values.thumbnail} onChange={formEdit.handleChange} id='thumbnail' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.thumbnail && formEdit.touched.thumbnail && (<p className='text-red-600 text-[16px]'>{formEdit.errors.thumbnail}</p>)}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='mb-5'>
                                <label htmlFor="price" className='block mb-2 text-[16px] font-medium text-gray-900'>Giá</label>
                                <input value={formEdit.values.price} onChange={formEdit.handleChange} id='price' type="number" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.price && formEdit.touched.price && (<p className='text-red-600 text-[16px]'>{formEdit.errors.price}</p>)}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="date_time" className='block mb-2 text-[16px] font-medium text-gray-900'>Ngày Tạo</label>
                                <input value={formEdit.values.date_time} onChange={formEdit.handleChange} id='date_time' type="date" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.date_time && formEdit.touched.date_time && (<p className='text-red-600 text-[16px]'>{formEdit.errors.date_time}</p>)}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='mb-5'>
                                <label htmlFor="category" className='block mb-2 text-[16px] font-medium text-gray-900'>Loại</label>
                                <select value={formEdit.values.category} onChange={formEdit.handleChange} name="" id="category" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' >
                                    <option value={""} disabled>Chọn Danh Mục</option>
                                    {categoryList.map((cate) => (
                                        <option key={cate._id} value={cate._id}>{cate.name}</option>
                                    ))}
                                </select>
                                {formEdit.errors.category && formEdit.touched.category && (<p className='text-red-600 text-[16px]'>{formEdit.errors.category}</p>)}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="color" className='block mb-2 text-[16px] font-medium text-gray-900'>Màu Sắc</label>
                                <input value={formEdit.values.color} onChange={formEdit.handleChange} id='color' type="text" className='bg-gray-50 border-solid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                                {formEdit.errors.color && formEdit.touched.color && (<p className='text-red-600 text-[16px]'>{formEdit.errors.color}</p>)}
                            </div>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="deription" className='block mb-2 text-[16px] font-medium text-gray-900'>Mô Tả</label>
                            <textarea value={formEdit.values.deription} onChange={formEdit.handleChange} id="deription" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-solid border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description..."></textarea>
                            {formEdit.errors.deription && formEdit.touched.deription && (<p className='text-red-600 text-[16px]'>{formEdit.errors.deription}</p>)}
                        </div>
                        <div className='mb-5'>
                            <button type='submit' className='w-full bg-blue-600 text-[18px] text-white h-10 rounded-lg'>Sửa Sản Phẩm</button>
                        </div>
                    </form>
                </div>
            )}
            {modalIsOpen && selectRow && (
                <div className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white rounded-lg w-[400px] p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <p className='text-center px-3 font-bold text-[17px]'>Bạn có muốn xóa sản phẩm "{selectRow.name}"</p>
                    <div className='flex justify-between mt-5'>
                        <button onClick={closeModal} className=' w-[80px] h-[45px] rounded-lg bg-red-600 m-3 text-[16px] font-semibold text-white'>Không</button>
                        <button onClick={handleDelete} className=' w-[80px] h-[45px] rounded-lg bg-green-600 m-3 text-[16px] font-semibold text-white'>Có</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductsList;