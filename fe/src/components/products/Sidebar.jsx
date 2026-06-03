import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <img src={logo} alt='logo' />


            <input placeholder='Search' />

            <Link>Home</Link>
            <Link>Products</Link>

        </div>
    )
}

export default Sidebar