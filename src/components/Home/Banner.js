import React, { useState } from 'react'

export default function Banner() {
    const bannerImage = [
        "banner1.png",
        "banner2.png",
        "banner3.png",
    ]
    const [banner, setBannder] = useState(0);
    function handleNextBanner() {
        setBannder((prevIndex) => (prevIndex + 1) % bannerImage.length)
    }
    function handlePrevBanner() {
        setBannder((prevIndex) => (prevIndex - 1 + bannerImage.length) % bannerImage)
    }
    return (
        <section>
            <div className='slider'>
                <img src={`/img/${bannerImage[banner]}`} alt="" />
                {/* <p>{banner}</p> */}
                <div className="button" id="header">
                    <i className="fa-solid fa-chevron-left" onClick={handlePrevBanner}></i>
                    <i className="fa-solid fa-chevron-right" onClick={handleNextBanner}></i>
                </div>
            </div>
        </section>
    )
}
