const Login = () => {
    return (
        <div className="min-w-full">
            <h1 className="mb-8 text-[24px] font-bold text-[#071074] leading-snug">
                Login to your Productr Account
            </h1>

            <form className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-[14px] font-medium text-gray-700">
                        Email or Phone number
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email or phone number"
                        className="h-[46px] w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-[#071074] focus:ring-1 focus:ring-[#071074]"
                    />
                </div>

                <button
                    type="submit"
                    className="h-[46px] w-full rounded-lg bg-[#071074] text-sm font-semibold text-white hover:bg-[#0a1899] transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;