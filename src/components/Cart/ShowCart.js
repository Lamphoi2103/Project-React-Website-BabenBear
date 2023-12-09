import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { suaSL, xoaGH, xoaSP } from '../redux/Slice/cartSlice';
import { toast } from 'react-toastify';

function ShowCart() {
    const cart = useSelector(state => state.cart.listSP);
    const dispatch = useDispatch();
    console.log(cart);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const checkOut = () => {
        if (cart.length > 0) {
            navigate('/thanhtoan')
        } else {
            toast.warn('Giỏ hàng của bạn đang trống', {
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
    }
    useEffect(() => {
        const newSubtotal = cart.reduce((total, sp) => {
            return total + sp.quantity * sp.price
        }, 0);
        setSubtotal(newSubtotal);
    }, [cart])
    return (
        <section className="shopping_cart">
            <p className="title_shopping">
                Giỏ Hàng
            </p>

            <table className='table'>
                <tbody>
                    <tr>
                        <th>TÊN</th>
                        <th>GIÁ</th>
                        <th>SỐ LƯỢNG</th>
                        <th>TỔNG PHỤ</th>
                    </tr>
                    {cart.map((sp, i) => {
                        return (
                            <tr key={i}>
                                <td className='product_cart'>
                                    <img src={sp.thumbnail[0]} width="" alt="" />
                                    <div>
                                        <p className='product_name_cart'>{sp.name}</p>
                                        <p className='product_name_cart'>{sp.category.name}</p>
                                    </div>

                                </td>
                                <td className='price_cart'>{Number(sp.price).toLocaleString("vi")} VNĐ</td>
                                <td className="quantity_td">
                                    <div className="quantity_cart">
                                        {/* <i className="fa-solid fa-minus" onClick={(e) => dispatch(suaSL([sp._id, sp.quantity - 1]))}></i> */}
                                        <input type="number" className='input_showcart' defaultValue={sp.quantity} min={1}
                                            onChange={(e) => dispatch(suaSL([sp._id, e.target.value]))}
                                        />
                                        {/* <i className="fa-solid fa-plus" onClick={(e) => dispatch(suaSL([sp._id, sp.quantity + 1]))}></i> */}
                                    </div>
                                </td>
                                <td className='price_cart'>{Number(sp.quantity * sp.price).toLocaleString("vi")} VNĐ</td>
                                <td className='remove_cart'><button className="fa-solid fa-xmark" onClick={() => dispatch(xoaSP(sp._id))}></button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <div className='cart_footer'>
                <div>
                    <button className='clear_cart' onClick={() => dispatch(xoaGH())}>Clear Cart</button>
                </div>
                <div className='subtotal_box'>
                    <div className='subtotal'>
                        <p>Tổng Tiền: </p>
                        <p> {Number(subtotal).toLocaleString("vi")} VNĐ</p>
                    </div>
                    <button className='checkout_cart' onClick={() => checkOut()}>Thanh Toán</button>
                    <Link to={'/sanpham'}><p className='continue'><i className="fa-solid fa-arrow-left"></i> Tiếp tục mua hàng</p></Link>
                </div>
            </div>
        </section>
    );
}

export default ShowCart;