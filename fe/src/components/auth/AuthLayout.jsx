import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

import bigHeroImg from "../../assets/mainherobg.png";
import smallHeroImg from "../../assets/card_runner.png";
import logo from "../../assets/logo.png";

const AuthLayout = () => {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#F0F0F5] flex items-center justify-center p-10">

            <div className="flex w-full h-full gap-10">

                <div className="relative w-1/2 h-full flex-shrink-0 rounded-2xl overflow-hidden">
                    <img
                        src={bigHeroImg}
                        alt="background"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute top-5 left-5 flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-[100px]" />
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img
                            src={smallHeroImg}
                            alt="runner"
                            className="object-cover w-[312px] h-[480px]"

                        />
                    </div>
                </div>

                <div className="flex w-1/2 h-full flex-col items-center justify-center">

                    <div className="flex justify-center min-w-3/5 h-full  mt-30 ">
                        {showSignup ? <Signup /> : <Login />}
                    </div>

                    <div className="min-w-3/5 flex items-center justify-center mb-14">
                        <button
                            onClick={() => setShowSignup((prev) => !prev)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4  shadow-sm"
                        >
                            <p className="text-[14px] text-gray-400">
                                {showSignup
                                    ? "Already have a Productr Account?"
                                    : "Don't have a Productr Account"}
                            </p>
                            <p className="text-[14px] font-semibold text-[#071074]">
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