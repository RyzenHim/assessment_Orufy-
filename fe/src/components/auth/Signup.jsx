import { useState } from "react";
import { signUpApi } from "../../services/authService";

const Signup = () => {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        identifier: ""
    })



    const handleChange = (e) => {

        const { name, value } = e.target

        setForm((prev) => ({

            ...prev, [name]: value

        }))


    }

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(form)

        signUpApi(form)


    };

    return (
        <div className="min-w-full" >
            <h1 className="mb-8 text-[24px] font-bold text-[#071074] leading-snug">
                Create Productr Account
            </h1>

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-[14px] font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        value={form.firstName}
                        name="firstName"
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your first name"
                        className="h-[46px] w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-[#071074] focus:ring-1 focus:ring-[#071074]"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        value={form.lastName}
                        name="lastName"
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your last name"
                        className="h-[46px] w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-[#071074] focus:ring-1 focus:ring-[#071074]"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email or Phone number
                    </label>
                    <input
                        value={form.identifier}
                        name="identifier"
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter email or phone number"
                        className="h-[46px] w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-[#071074] focus:ring-1 focus:ring-[#071074]"
                    />
                </div>

                <button
                    type="submit"
                    className="h-[46px] w-full rounded-lg bg-[#071074] text-sm font-semibold text-white hover:bg-[#0a1899] transition-colors"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;