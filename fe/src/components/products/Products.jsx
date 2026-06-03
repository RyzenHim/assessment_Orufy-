import React from 'react'
import noItems from '../../assets/Group.png'
const Products = () => {
    return (
        <div>
            <img src={noItems} alt='noItmes' />
            <h1>No Published Products</h1>
            <p>Your Published Products will appear here
                Create your first product to publish </p>
        </div>
    )
}

export default Products