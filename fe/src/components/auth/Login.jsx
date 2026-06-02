import React from 'react'

const Login = () => {
    return (
        <div>
            <div className='w-[363px] h-[29px] '>

                <h1>Login to your Productr Account</h1>

            </div>
            <form >
                <label>Email or Phone number</label>
                <input type="text" placeholder='Enter email or phone number' />
                <button className='bg-[#071074] border' type='submit'>Login</button>
            </form>

        </div>
    )
}

export default Login