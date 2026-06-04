import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Otp from "./Otp";
import { signUpApi, verifySignupOtpApi } from "../../services/authService";
import { storeUser } from "../../utils/session";

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        identifier: ""
    });
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(20);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!showOtp || timer === 0) {
            return undefined;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, showOtp]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const requestOtp = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            const response = await signUpApi(form);
            setShowOtp(true);
            setOtp("");
            setTimer(20);
            setInfo(response.message || "OTP sent successfully");
        } catch (apiError) {
            setError(apiError.message || "Unable to send OTP");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!showOtp) {
            await requestOtp();
            return;
        }

        if (otp.length !== 6) {
            setError("Enter the 6-digit OTP");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await verifySignupOtpApi({
                identifier: form.identifier,
                otp,
            });
            localStorage.setItem("token", response.token);
            storeUser(response.user);
            navigate("/products");
        } catch (apiError) {
            setError(apiError.message || "Unable to verify OTP");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        await requestOtp();
    };

    return (
        <div className="min-w-full">
            <h1 className="mb-8 text-[24px] font-bold text-[#071074] leading-snug">
                Create Productr Account
            </h1>

            <form onSubmit={handleSignup} className="space-y-4">
                {!showOtp ? (
                    <>
                        <div>
                            <label className="mb-1.5 block text-[14px] font-medium text-gray-700">
                                First Name
                            </label>
                            <AuthInput
                                value={form.firstName}
                                name="firstName"
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter your first name"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <AuthInput
                                value={form.lastName}
                                name="lastName"
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter your last name"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Email or Phone number
                            </label>
                            <AuthInput
                                value={form.identifier}
                                name="identifier"
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter email or phone number"
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <p className="mb-2 text-[14px] text-gray-500">
                            OTP sent to <span className="font-medium text-[#071074]">{form.identifier}</span>
                        </p>
                        <Otp value={otp} onChange={setOtp} />
                    </div>
                )}

                {info ? <p className="text-sm text-[#071074]">{info}</p> : null}
                {error ? <p className="text-sm text-[#d14d4d]">{error}</p> : null}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[46px] w-full rounded-lg bg-[#071074] text-sm font-semibold text-white transition-colors hover:bg-[#0a1899] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting
                        ? "Please wait..."
                        : showOtp
                            ? "Verify OTP"
                            : "Sign Up"}
                </button>
            </form>

            {showOtp ? (
                <div className="mt-5 flex justify-center gap-2">
                    <h1 className="text-[14px] font-medium opacity-50">
                        Didn't receive OTP?
                    </h1>

                    {timer === 0 ? (
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-[14px] font-medium text-[#071074]"
                        >
                            Resend OTP
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="cursor-not-allowed text-[14px] font-medium text-gray-400"
                        >
                            Resend in {timer}s
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
};

const AuthInput = ({ value, name, onChange, type = "text", placeholder }) => {
    return (
        <div
            onClick={(event) => {
                const input = event.currentTarget.querySelector("input");
                input?.focus();
            }}
            className="flex h-[46px] w-full cursor-text items-center rounded-lg border border-gray-300 px-4 focus-within:border-[#071074] focus-within:ring-1 focus-within:ring-[#071074]"
        >
            <input
                value={value}
                name={name}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="h-full w-full bg-transparent text-sm outline-none"
            />
        </div>
    );
};

export default Signup;
