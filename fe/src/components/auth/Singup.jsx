const Signup = () => {
    const handleSignup = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1 className="mb-8 text-4xl font-bold text-[#071074]">
                Create Productr Account
            </h1>

            <form onSubmit={handleSignup} className="space-y-4">

                <div>
                    <label className="mb-2 block text-sm">
                        First Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your first name"
                        className="h-[50px] w-full rounded-md border px-4"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm">
                        Last Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your last name"
                        className="h-[50px] w-full rounded-md border px-4"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm">
                        Email or Phone number
                    </label>

                    <input
                        type="text"
                        placeholder="Enter email or phone number"
                        className="h-[50px] w-full rounded-md border px-4"
                    />
                </div>

                <button
                    type="submit"
                    className="h-[50px] w-full rounded-md bg-[#071074] text-white"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;