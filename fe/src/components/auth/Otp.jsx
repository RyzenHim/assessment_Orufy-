import React, { useRef, useState } from 'react';

const Otp = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, '');
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
        const newOtp = Array(6).fill('');
        pasted.split('').forEach((char, i) => {
            newOtp[i] = char;
        });
        setOtp(newOtp);
        inputs.current[Math.min(pasted.length, 5)].focus();
    };

    const handleSubmit = () => {
        console.log('OTP Entered:', otp.join(''));
    };

    return (
        <div className="">
            <p className="text-sm font-medium text-gray-700 mb-3">Enter OTP</p>

            <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="w-11 h-11 text-center text-base font-medium border border-gray-300 rounded-lg outline-none focus:border-[#071074] focus:ring-1 focus:ring-[#071074] text-gray-800"
                    />
                ))}
            </div>

            {/* <button
                onClick={handleSubmit}
                className="w-full h-[46px] bg-[#071074] text-white text-sm font-semibold rounded-lg hover:bg-[#0a1899] transition-colors"
            >
                Enter your OTP
            </button> */}
        </div>
    );
};

export default Otp;