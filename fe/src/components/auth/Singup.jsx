import React from 'react'

const Singup = () => {
    const handleSignUp = async (e) => {
        e.preventDefault()



    }

    return (



        <div >

            <h1>Create Productr Acount</h1>
            <form onSubmit={handleSignUp} >
                <label>First Name</label>
                <input className='border p-3 bg-[#FFFFFF]' type='text' placeholder='Enter your first name' />
                <label>Last Name</label>
                <input className='border p-3 bg-[#FFFFFF]' type='text' placeholder='Enter your last name' />
                <label>Email or Phone number</label>
                <input className='border p-3 bg-[#FFFFFF]' type="text" placeholder='Enter email or phone number' />
                <button className='bg-[#071074] border' type='submit'>SignUp</button>
            </form>

        </div>
    )
}

export default Singup