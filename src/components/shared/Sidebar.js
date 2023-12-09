import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [dropdowns, setDropdowns] = useState({
        products: false,
        users: false,
        orders: false,
    });

    const toggleDropdown = (dropdown) => {
        setDropdowns((prevDropdowns) => ({
            ...prevDropdowns,
            [dropdown]: !prevDropdowns[dropdown],
        }));
    };

    return (
        <div className='flex flex-col bg-neutral-900 w-60 p-3 text-white'>
            <div className='flex items-center gap-2 py-3'>
                <span className='font-bold text-[16px]'>Babe n Bear Shop</span>
            </div>
            <div className='py-8 flex flex-1 flex-col gap-0.5'>
                <div className='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer'>
                    <i className="fa-solid fa-chart-simple"></i>
                    <Link to={'/admin'}><p>Thống Kê</p></Link>
                </div>
                <div
                    className={`flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer ${dropdowns.products && 'bg-neutral-700'}`}
                    onClick={() => toggleDropdown('products')}
                >
                    <i className="fa-solid fa-boxes-stacked"></i>
                    Sản Phẩm
                </div>

                {dropdowns.products && (
                    <ul className="left-0 rounded-md py-1">
                        <Link to="products">
                            <li className="block px-12 py-2  hover:bg-neutral-700">Danh Sách Sản Phẩm</li>
                        </Link>
                        <Link to="category">
                            <li className="block px-12 py-2  hover:bg-neutral-700">Danh Sách Loại</li>
                        </Link>
                    </ul>
                )}

                <div
                    className={`flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer ${dropdowns.users && 'bg-neutral-700'}`}
                    onClick={() => toggleDropdown('users')}
                >
                    <i className="fa-solid fa-id-card"></i>
                    Người Dùng
                </div>

                {dropdowns.users && (
                    <ul className="left-0 rounded-md py-1">
                        {/* Add Link components for User options */}
                        <Link to="users">
                            <li className="block px-12 py-2  hover:bg-neutral-700">Dánh Sách Người Dùng</li>
                        </Link>
                        {/* <Link to="users/add">
                            <li className="block px-12 py-2  hover:bg-neutral-700">Add User</li>
                        </Link> */}
                    </ul>
                )}

                <div
                    className={`flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer ${dropdowns.orders && 'bg-neutral-700'}`}
                    onClick={() => toggleDropdown('orders')}
                >
                    <i className="fa-solid fa-cart-shopping"></i>
                    Đơn Hàng
                </div>

                {dropdowns.orders && (
                    <ul className="left-0 rounded-md py-1">
                        {/* Add Link components for Order options */}
                        <Link to="orders">
                            <li className="block px-12 py-2  hover:bg-neutral-700">Danh Sách Đơn Hàng</li>
                        </Link>
                        {/* <Link to="orders/detail">
                            <li className="block px-12 py-2  hover:bg-neutral-700">Order Details</li>
                        </Link> */}
                    </ul>
                )}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                <div className='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer'>
                    <i className="fa-solid fa-gear"></i>
                    <p>Cài Đặt</p>
                </div>
                <div className='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer'>
                    <i className="fa-regular fa-circle-question"></i>
                    <p>Trợ Giúp</p>
                </div>
                <div className='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500'>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <p>Đăng Xuất</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
