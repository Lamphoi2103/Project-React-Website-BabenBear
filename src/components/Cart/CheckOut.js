import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { xoaGH } from '../redux/Slice/cartSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
function CheckOut() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.listSP);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [subtotal, setSubtotal] = useState(0);
    console.log(subtotal);
    useEffect(() => {
        const newSubtotal = cart.reduce((total, sp) => {
            return total + sp.quantity * sp.price
        }, 0);
        setSubtotal(newSubtotal);
        formCheckout.setValues({
            ...formCheckout.values,
            total: subtotal,
        });
    }, [subtotal, cart]);
    const CheckOutbtn = async (values) => {
        console.log(values);
        try {
            const newData = {
                user: values.user,
                total: values.total,
                status: values.status,
                orderDate: values.orderDate
            }
            console.log(newData);
            const addOrder = await axios.post('http://localhost:7000/bills/add', newData);
            const orderID = addOrder.data._id
            if (addOrder.status === 201) {
                toast.success('Thanh Toán Thành Công', {
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
                detailOrder(orderID, cart);
                dispatch(xoaGH())
            }
        } catch (e) { }
    }
    const detailOrder = (orderID, cart) => {
        const url = "http://localhost:7000/orderdetails/add";
        cart.forEach(sp => {
            const infoOrder = { orderID: orderID, productID: sp._id, quantity: sp.quantity, price: sp.price }
            axios.post(url, infoOrder)
                .then(response => {
                    console.log("Đã lưu vào cơ sở dữ liệu:", response.data);
                })
                .catch(error => {
                    console.error("Lỗi khi lưu vào cơ sở dữ liệu:", error);
                    // Xử lý lỗi khi gặp vấn đề trong quá trình lưu dữ liệu
                });
        });
    }
    const formCheckout = useFormik({
        initialValues: {
            user: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            total: subtotal,
            status: 1,
            orderDate: new Date,
        },
        onSubmit: CheckOutbtn,
    })
    const handleOtherAction = () => {
        formCheckout.handleSubmit();
    };
    return (
        <>
            {/* <div className='messeger_checkout'>
            </div> */}
            <section className='checkout-box'>
                <div className='infomation-box'>
                    <p className='title_checkout'>THÔNG TIN ĐẶT HÀNG</p>
                    <form action="" className='form_checkout' onSubmit={formCheckout.handleSubmit}>
                        <div className='input_checkout'>
                            <label htmlFor="">Họ và Tên</label>
                            <input type="text" id='name' value={formCheckout.values.name} onChange={formCheckout.handleChange} placeholder='Full Name' />
                        </div>
                        <div className='input_checkout'>
                            <label htmlFor="">Số Điện Thoại</label>
                            <input className='phone_checkout' id='phone' value={formCheckout.values.phone} onChange={formCheckout.handleChange} type="number" placeholder='+84 ' />
                        </div>
                        <div className='input_checkout'>
                            <label htmlFor="">Email</label>
                            <input type="email" id='email' value={formCheckout.values.email} onChange={formCheckout.handleChange} placeholder='Email' />
                        </div>
                        <div className='input_checkout'>
                            <label htmlFor="">Địa Chỉ</label>
                            <input type="text" id='address' value={formCheckout.values.address} onChange={formCheckout.handleChange} placeholder='Address' />
                            {/* <input type="text" id='total' value={formCheckout.values.total} onChange={formCheckout.handleChange} placeholder='Address' /> */}
                        </div>
                        {/* <div className='input_checkout'>
                        <label htmlFor="">Ghi Chú</label>
                        <input type="text" placeholder='Ghi Chú' />
                    </div> */}
                    </form>
                    {/* <p className='title_checkout'>HÌNH THỨC THANH TOÁN</p>
                <div className=''>
                    <div className='option_checkout'>

                    </div>
                </div> */}
                </div>
                <div className='infomation_product_cart'>
                    <p className='title_cart_checkout'>Đơn Hàng Của Bạn</p>
                    <div className='box_product_checkout'>
                        <div className='title_product_checkout'>
                            <p>Products</p>
                            <p>Total</p>
                        </div>
                        {cart.map((sp, i) => {
                            return (
                                <div key={sp._id} className='items_product_checkout'>
                                    <p>{sp.quantity} x <Link to={'/chitiet/' + sp._id}><span className='name_product_checkout'>{sp.name}</span></Link></p>
                                    <p className='price_checkout'>{Number(sp.price).toLocaleString("vi")} VNĐ</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='product_checkout'>
                        <p>Giá</p>
                        <p>{Number(subtotal).toLocaleString("vi")} VNĐ</p>
                        <p>Tổng Tiền Thanh Toán</p>
                        <p>{Number(subtotal).toLocaleString("vi")} VNĐ</p>
                    </div>
                    <div className='checkout_btn' onClick={() => handleOtherAction()}>THANH TOÁN</div>
                    <Link to={'/sanpham'}><p className='continue_buy'>Tiếp Tục Mua Hàng</p></Link>
                    <div className='footer_check_out'>
                        <i className="fa-solid fa-phone-volume"></i>
                        <p>Hotline:  18001234</p>
                    </div>
                    <div className='footer_check_out'>
                        <i className="fa-solid fa-file-lines"></i>
                        <p>Hướng dẫn mua hàng</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CheckOut;