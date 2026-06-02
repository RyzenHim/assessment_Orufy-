import { useState } from "react";
import Login from "./Login";
import Signup from "./Singup";

import bigHeroImg from "../../assets/mainherobg.png";
import smallHeroImg from "../../assets/card_runner.png";
import logo from "../../assets/logo.png";

const AuthLayout = () => {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div className="min-h-screen bg-[#F6F6F8] p-6">
            <div className="mx-auto flex h-[700px] max-w-[1400px] gap-20">

                {/* Left Section */}
                <div className="relative w-[520px] overflow-hidden rounded-md border border-blue-500">

                    <img
                        src={bigHeroImg}
                        alt="background"
                        className="h-full w-full object-cover"
                    />

                    <img
                        src={logo}
                        alt="logo"
                        className="absolute left-5 top-5 w-[110px]"
                    />

                    <img
                        src={smallHeroImg}
                        alt="runner"
                        className="absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2"
                    />
                </div>

                {/* Right Section */}
                <div className="flex flex-1 flex-col justify-center">

                    <div className="max-w-[420px]">
                        {showSignup ? <Signup /> : <Login />}
                    </div>

                    <div className="mt-40">
                        <button
                            onClick={() => setShowSignup((prev) => !prev)}
                            className="w-[320px] rounded-md border bg-white p-4 shadow-sm"
                        >
                            <p className="text-sm text-gray-500">
                                {showSignup
                                    ? "Already have a Productr Account?"
                                    : "Don't have a Productr Account"}
                            </p>

                            <p className="font-semibold text-[#071074]">
                                {showSignup ? "Login Here" : "SignUp Here"}
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;