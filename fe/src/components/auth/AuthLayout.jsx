import React from 'react'
import Login from './Login'
import { useState } from 'react'
import { useEffect } from 'react'
import Singup from './Singup'

const AuthLayout = () => {
    const [showSignup, setShowSignUp] = useState(false)


    useEffect(() => { console.log(showSignup) }, [showSignup])

    const handlSignUp = () => {
        setShowSignUp(!showSignup)
        console.log("Clicked on the signup page ", showSignup)

    }

    return (
        <div>
            <h1>This is the layout page of login</h1>


            {showSignup ? <Singup /> : <Login />}




            <div>
                <button className='border bg-white border rounded-sm' onClick={handlSignUp}>

                    <h1>Don’t have a Productr Account </h1>
                    <p>SignUp Here</p>
                </button>
            </div>
        </div >
    )
}

export default AuthLayout