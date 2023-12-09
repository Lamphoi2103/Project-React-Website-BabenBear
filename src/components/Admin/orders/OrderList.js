import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
function OrderList() {
    const [orderList, setOrderList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7000/bills');
                setOrderList(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [])
    const columns = [
        {
            name: "Tên Người Đặt",
            selector: row => row.user && row.user.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.user && row.user.email,
            sortable: true,
        },
        {
            name: " Địa Chỉ",
            selector: row => row.user && row.user.address,
            sortable: true,
        },
        {
            name: "Số Điện Thoại",
            selector: row => row.user && row.user.phone,
            sortable: true,
        },
        {
            name: "Tổng Tiền",
            selector: row => Number(row.total).toLocaleString("vi") + " VNĐ",
            sortable: true,
        },
        {
            name: "Ngày Đặt Hàng",
            selector: row => moment(row.orderDate).format('YYYY-MM-DD'),
            sortable: true,
        },
        {
            name: "Trạng Thái",
            selector: row => row.status === 0 ? "Chờ xác nhận" :
                row.status === 1 ? "Đã xác nhận" :
                    row.status === 2 ? "Đang xử lý" :
                        row.status === 3 ? "Đã gửi đi" :
                            row.status === 4 ? "Đã giao hàng" :
                                row.status === 5 ? "Đã hủy" :
                                    "Trạng thái không xác định",
            sortable: true,
        },
        {
            name: "Đơn Hàng Chi Tiết",
            selector: row => [
                <i className="fa-regular fa-eye text-[18px] text-center"></i>
            ],
            sortable: false,
        },
    ]
    return (
        <div>
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <strong className="text-gray-700 font-medium">Danh Sách Đơn Hàng</strong>
                <div className="border-x border-gray-200 rounded-sm mt-3">
                    <DataTable
                        columns={columns}
                        data={orderList}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={true}
                        pagination
                    />
                    {/* <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Total</th>
                                <th>Order Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((order) => (
                                <tr key={order._id}>
                                    <td> {order.user && order.user.name} </td>
                                    <td> {order.user && order.user.email} </td>
                                    <td className='w-[300px]'> {order.user && order.user.address} </td>
                                    <td> {order.user && order.user.phone} </td>
                                    <td> {Number(order.total).toLocaleString("vi")} VNĐ</td>
                                    <td> {new Date(order.total).toLocaleDateString("vi")} </td>
                                    <td className={`
                                    ${order.status === 0 ? 'text-blue-500' :
                                            order.status === 1 ? 'text-green-500' :
                                                order.status === 2 ? 'text-yellow-500' :
                                                    order.status === 3 ? 'text-purple-500' :
                                                        order.status === 4 ? 'text-indigo-500' :
                                                            order.status === 5 ? 'text-red-500' : 'text-gray-500'}
                                    `}>
                                        {
                                            order.status === 0 ? "Chờ xác nhận" :
                                                order.status === 1 ? "Đã xác nhận" :
                                                    order.status === 2 ? "Đang xử lý" :
                                                        order.status === 3 ? "Đã gửi đi" :
                                                            order.status === 4 ? "Đã giao hàng" :
                                                                order.status === 5 ? "Đã hủy" :
                                                                    "Trạng thái không xác định"
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
    );
}

export default OrderList;