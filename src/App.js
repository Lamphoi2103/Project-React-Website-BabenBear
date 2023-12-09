import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListProducts from './components/Products/ListProducts';
import DetailProduct from './components/Detail/DetailProduct';
import Login from './components/Auth/Login';
import Sigup from './components/Auth/Sigup';
import ShowCart from './components/Cart/ShowCart';
import CheckOut from './components/Cart/CheckOut';
import LayoutHome from './components/Home/LayoutHome';
import Layout from './components/shared/Layout';
import Dasboard from './components/Admin/Dasboard';
import ProductsList from './components/Admin/products/ProductsList';
import UsersList from './components/Admin/users/UsersList';
import OrderList from './components/Admin/orders/OrderList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import UserDetail from './components/Detail/UserDetail';
import LoginAdmin from './components/Admin/Auth/LoginAdmin';
import CategoryList from './components/Admin/products/CategoryList';


function App() {
  const statusLogin = useSelector(state => state.auth.login.status)
  const role = useSelector(state => state.auth.login.currentUser)
  console.log(statusLogin);
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutHome />}>
            <Route index exact element={<Home />} />
            <Route path="/sanpham" element={<ListProducts />} />
            <Route path="/category/:id" element={<ListProducts />} />
            <Route path="/chitiet/:id" element={<DetailProduct />} />
            <Route path="/dangnhap" element={<Login />} />
            <Route path="/dangky" element={<Sigup />} />
            <Route path="/giohang" element={<ShowCart />} />
            <Route path="/thanhtoan" element={statusLogin === true ? <CheckOut /> : <Navigate to={'/dangnhap'} />} />
            <Route path="/information" element={statusLogin === true ? <UserDetail /> : <Navigate to={'/dangnhap'} />} />
          </Route>
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/admin/*" element={statusLogin === true && (role.role === 2 || role.role === 3) ? <Layout /> : <Navigate to={'/login'} />}>
            <Route index element={<Dasboard />} />
            <Route path='products' element={<ProductsList />} />
            <Route path='category' element={<CategoryList />} />
            <Route path='users' element={<UsersList />} />
            <Route path='orders' element={<OrderList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
