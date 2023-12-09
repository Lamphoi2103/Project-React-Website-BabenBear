import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoutUser } from '../redux/apiRequets';
function Header() {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const [listCategories, setListCategories] = useState([])
    const [account, setAccount] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:7000/categories")
            .then(res => res.json()).then(data => setListCategories(data))
    }, [])
    // Kiểm tra xem URL có phải là '/' không
    const isHomePage = location.pathname === '/';

    // Màu chữ
    const textColor = isHomePage || isHovered ? '#ffffff' : '#423f3f';
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    // Hàm xử lý khi di chuột rời đi
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleAccount = () => {
        setAccount(!account);
    }
    const handleLogout = () => {
        LogoutUser(dispatch)
    }
    return (
        <>
            <header className="header" style={{ color: textColor }} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <a href="/" className="logo">Babe n Bear</a>
                <nav className="navbar">
                    <ul>
                        <li> <Link to={"/"}>Trang Chủ</Link></li>
                        <li>
                            <Link to="/sanpham">Sản Phẩm</Link>
                            <ul>
                                {listCategories.map((category) =>
                                    <li key={category._id}><Link to={"/category/" + category._id}>{category.name}</Link></li>
                                )}
                            </ul>
                        </li>
                        <li><a href="/#">Dịp Lễ</a></li>
                        <li><a href="/#">Thương Hiệu</a></li>
                        <li><a href="/#">Bộ Sưu Tập Mới</a></li>
                        <li><a href="/#">Sản Phẩm Mới</a></li>
                        {/* <li><a href="/#">Isnpiration</a></li> */}
                    </ul>
                    {/* <Link to="/">Trang Chủ</Link>
                    <Link to="/sanpham">Sản Phẩm</Link>
                    <a href="/#">Occasions</a>
                    <a href="/#">Brands</a>
                    <a href="/#">New Collections</a>
                    <a href="/#">New Arrivals</a>
                    <a href="/#">Isnpiration</a> */}
                </nav>
                <div className="icons">
                    <div>
                        {user ? (
                            <button className="account_icon" onClick={handleAccount}>{user.name}</button>
                        ) : (
                            <button className="account_icon" onClick={handleAccount}>Tài Khoản</button>
                        )}
                        {account && (
                            <div className='account_box'>
                                {user ? (
                                    <>
                                        <p className='account_text'>Đơn Hàng</p>
                                        <Link to={'/information'}><p className='account_text'>Chỉnh Sửa Thông Tin </p>  </Link>
                                        {/* <p className='account_text'>List of stores</p> */}
                                        <p className='account_text cursor-pointer' onClick={handleLogout}>Đăng Xuất</p>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/dangnhap"><button className="login_header">Đăng Nhập</button></Link>
                                        <Link to={"/dangky"}><button className="sigin_header">Đăng Ký</button></Link>
                                    </>
                                )}

                            </div>
                        )}
                    </div>

                    <div className="fas fa-search" id="search-btn"></div>


                    <Link to={"/giohang"}>
                        <div className='cart-icon'>
                            <i className="fas fa-shopping-basket" id="cart-btn"></i>
                            {/* <div className="product-count">3</div> */}
                        </div>
                    </Link>
                </div>
            </header>
        </>
    )
}
export default Header;
