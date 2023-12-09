import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// import Product from './Product'

import { useDispatch } from "react-redux";
import { themSP } from '../redux/Slice/cartSlice';


function ListProducts() {
    let { id } = useParams();
    const dispatch = useDispatch();
    console.log(id); // id_category
    const [listProducts, setListProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        fetch("http://localhost:7000/products")
            .then(res => res.json())
            .then(data => setListProducts(data));
    }, []);
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    const handleAddToCart = (product) => {
        dispatch(themSP(product));
        setShowNotification(true);

        // Ẩn thông báo sau 5 giây
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };
    const filteredProducts = listProducts.filter(product => (
        (!id || (product.category && product.category._id === id)) &&
        (product.name && product.name.toLowerCase().includes(search.toLowerCase()) ||
            Number(product.price).toLocaleString("vi").includes(search))
    ));
    return (
        <>
            {showNotification && (
                <div className='nottification'>
                    <p>Bạn vừa thêm sản phẩm vào giỏ hàng!</p>
                </div>
            )}

            <section className="title_product">
                <center><p>Sản Phẩm</p></center>
            </section>
            <section className='action-product'>
                <div className='search-box'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="search" className='input-search' placeholder="Tìm Kiếm..." value={search} onChange={handleSearch} />
                </div>
            </section>
            <section className="products">
                {filteredProducts.map(product => (
                    !id || (product.category && product.category._id === id) ? (
                        <div className="products_item" key={product._id}>
                            <Link to={"/chitiet/" + product._id}>
                                <img src={`${product.thumbnail[0]}`} alt={product.thumbnail[0]} />

                                <div className="color">
                                    {product.color && product.color.map((style, i) => (
                                        <div style={{ backgroundColor: style }} key={i} className='color-items'></div>
                                    ))}
                                </div>
                                <div className='product-items'>
                                    <p className="name">{product.name}</p>
                                </div>
                                <p className='price'>{Number(product.price).toLocaleString("vi")} VNĐ</p>
                            </Link>
                            <div className='btn-product'>
                                <div className="addtocart_products" onClick={() => handleAddToCart(product)}>
                                    <input type="submit" value={"THÊM VÀO GIỎ HÀNG"} />
                                </div>
                                <div className='wish-list-products'>
                                    <i className="fa-regular fa-heart"></i>
                                </div>
                            </div>


                        </div>
                    ) : null
                ))}
            </section>
        </>
    );
}
export default ListProducts;
