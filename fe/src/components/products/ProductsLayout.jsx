import React from 'react'
import { Link } from 'react-router-dom'
import Products from './Products'
import logo from '../../assets/logo.png'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
const ProductsLayout = () => {
    return (
        <>
            <div>


                <div className="topbar">
                    <TopBar />
                </div>

                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="body">
                    <Products />
                </div>



            </div>


        </>

    )
}

export default ProductsLayout