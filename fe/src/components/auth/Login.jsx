import React from 'react'

const Login = () => {
    return (
        <div>

            <h1>Login to your Productr Account</h1>
            <form >
                <label>Email or Phone number</label>
                <input type="text" placeholder='Enter email or phone number' />
                <button type='submit'>Login</button>
            </form>

        </div>
    )
}

export default Login