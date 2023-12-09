import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function LayoutHome() {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default LayoutHome;