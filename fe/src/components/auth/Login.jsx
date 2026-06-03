import { useState, useEffect } from "react";
import Otp from "./Otp";

const Login = () => {

    const [showOtp, setShowOtp] = useState(false);

    const [timer, setTimer] = useState(20);

    const [canResend, setCanResend] = useState(false);



    // LOGIN FORM SUBMIT
    const handleForm = (e) => {

        e.preventDefault();

        // API CALL HERE

        setShowOtp(true);

        setTimer(20);

        setCanResend(false);

    };



    const handleResendOtp = () => {

        // RESEND OTP API HERE

        setTimer(20);

        setCanResend(false);

    };



    // TIMER
    useEffect(() => {

        let interval;

        if (showOtp && timer > 0) {

            interval = setInterval(() => {

                setTimer((prev) => prev - 1);

            }, 1000);

        }

        if (timer === 0) {

            setCanResend(true);

        }

        return () => clearInterval(interval);

    }, [timer, showOtp]);



    return (

        <div className="min-w-full">

            <h1 className="mb-8 text-[24px] font-bold text-[#071074] leading-snug">
                Login to your Productr Account
            </h1>


            <form
                onSubmit={handleForm}
                className="space-y-4"
            >

                {
                    showOtp ? (

                        <Otp />

                    ) : (

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

                    )
                }



                <button
                    type="submit"
                    className="h-[46px] w-full rounded-lg bg-[#071074] text-sm font-semibold text-white hover:bg-[#0a1899] transition-colors"
                >

                    {
                        showOtp
                            ? "Verify OTP"
                            : "Login"
                    }

                </button>

            </form>



            {
                showOtp && (

                    <div className="mt-5 flex justify-center gap-2">

                        <h1 className="text-[14px] font-medium opacity-50">
                            Didn't receive OTP?
                        </h1>


                        {
                            canResend ? (

                                <button
                                    onClick={handleResendOtp}
                                    className="text-[14px] font-medium text-[#071074]"
                                >
                                    Resend OTP
                                </button>

                            ) : (

                                <button
                                    disabled
                                    className="cursor-not-allowed text-[14px] font-medium text-gray-400"
                                >
                                    Resend in {timer}s
                                </button>

                            )
                        }

                    </div>

                )
            }

        </div>

    );

};

export default Login;