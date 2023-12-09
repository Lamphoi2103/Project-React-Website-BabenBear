import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DetailProduct() {
    let { id } = useParams();
    // console.log(id);
    const [detail, setDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);
    function handlePluss() {
        setQuantity(quantity + 1)
    }
    function handleMinus() {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }
    useEffect(() => {
        fetch("http://localhost:7000/products/" + id)
            .then(res => res.json()).then(data => setDetail(data));
    }, [id])
    // console.log(detail.thumbnail);

    return (
        <section className='detail_product'>
            <div className="img_detail">
                {detail.thumbnail && detail.thumbnail.map((img, i) => (
                    <img key={i} src={img} alt={img} />
                ))}
                {/* <img src={`../img/${detail.thumbnail}`} alt={detail.thumbnail} /> */}

                {/* <img src="./img/Rufflelyaodai.png" alt="" />
                <img src="./img/Rufflelyaodai.png" alt="" />
                <img src="./img/Rufflelyaodai.png" alt="" /> */}
            </div>
            <div className='box_content'>
                <div className="content_detail">
                    <p className="name_detail">{detail.name}</p>
                    <div className="color_detail_title">{Number(detail.price).toLocaleString("vi")} VNĐ</div>
                    <div className="color_detail">
                        {detail.color && detail.color.map((style, i) => (
                            <div style={{ backgroundColor: style }} key={i} className='color-items'></div>
                        ))}
                    </div>
                    <div className="cart">
                        <div className="quantity">
                            <i className="fa-solid fa-minus" onClick={handleMinus}></i>
                            <input className='quantity_input' type="number" value={quantity} />
                            <i className="fa-solid fa-plus" onClick={handlePluss}></i>
                        </div>
                        <div className="addtocart">
                            <input type="submit" value={"THÊM VÀO GIỎ HÀNG"} />
                        </div>
                    </div>
                    <div className="description">
                        <div className="title_description">
                            <p>Mô Tả</p>
                        </div>
                        <div className="content_description">
                            <div>
                                {`${detail.deription}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default DetailProduct;