const Login = () => {
    return (
        <div>
            <h1 className="mb-10 text-4xl font-bold text-[#071074]">
                Login to your Productr Account
            </h1>

            <form className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email or Phone number
                    </label>

                    <input
                        type="text"
                        placeholder="Enter email or phone number"
                        className="h-[50px] w-full rounded-md border px-4 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="h-[50px] w-full rounded-md bg-[#071074] text-white"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;