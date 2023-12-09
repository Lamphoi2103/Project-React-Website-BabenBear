import React from 'react'
import Banner from './Banner'
import Slider from './Slider'

export default function Home() {

    return (
        <div>
            <Banner />
            <Slider />
            <section>
                <div className="title2_home">
                    <a href="/">Latest Arrivals</a>
                </div>
                <section className='arrivals'>
                    <div className='box_arl'>
                        <img src="/img/arrivals1.png" alt="" className='img_arl' />
                        <p className="title_arl">Retro Blues</p>
                        <p className="des_arl">In tune for the revival of the Y2K trend, Retro Blues brings playful and eclectic vibes into your everyday wardrobe.</p>
                    </div>
                    <div className='box_arl'>
                        <img src="/img/arrivals2.png" alt="" className='img_arl' />
                        <p className="title_arl">Retro Blues</p>
                        <p className="des_arl">In tune for the revival of the Y2K trend, Retro Blues brings playful and eclectic vibes into your everyday wardrobe.</p>
                    </div>
                    <div className='box_arl'>
                        <img src="/img/arrivals3.png" alt="" className='img_arl' />
                        <p className="title_arl">Retro Blues</p>
                        <p className="des_arl">In tune for the revival of the Y2K trend, Retro Blues brings playful and eclectic vibes into your everyday wardrobe.</p>
                    </div>
                </section>
            </section>
            <section className='category'>
                <div className='item item1'>
                    <img src="/img/category1.jpg" className='img_category' alt="" />
                    <p className="title_category">RESORT WEAR</p>
                </div>
                <div className="item item2">
                    <img src="/img/category2.jpg" className="img_category" alt="" />
                    <p className="title_category">WEDDING GUEST</p>
                </div>
                <div className="item item1">
                    <img src="/img/category3.jpg" className="img_category" alt="" />
                    <p className="title_category">FOR DAY</p>
                </div>
                <div className="item item2">
                    <img src="/img/category4.jpg" className="img_category" alt="" />
                    <p className="title_category">FOR NIGHT</p>
                </div>
            </section>
            <section className="contact_home">
                <div className="box_contact">
                    <p className="title_contact1">Subscribe to our newsletter</p>
                    <p className="title_contact2">Sign up to our newsletter and we'll keep you up to date with the latest arrivals
                    </p>
                    <center><input type="text" placeholder="Courriel" /><i className="fas fa-arrow-right-long"></i></center>
                </div>
            </section>
        </div>
    )
}
