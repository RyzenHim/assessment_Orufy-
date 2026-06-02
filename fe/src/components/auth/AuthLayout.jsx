import React from 'react'
import Login from './Login'

const AuthLayout = () => {


    const handlSignUp = () => {
        console.log("Clicked on the signup page ")

    }

    return (
        <div>
            <h1>This is the layout page of login</h1>
            <Login />



            <div>
                <button className='border' onClick={handlSignUp}>

                    <h1>Don’t have a Productr Account </h1>
                    <p>SignUp Here</p>
                </button>
            </div>
        </div >
    )
}

export default AuthLayout