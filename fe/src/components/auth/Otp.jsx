import { useEffect, useRef } from 'react';

const Otp = ({ value, onChange }) => {
    const inputs = useRef([]);
    const otp = value.padEnd(6, '').slice(0, 6).split('');

    useEffect(() => {
        if (value.length === 6) {
            inputs.current[5]?.blur();
        }
    }, [value]);

    const updateOtpAtIndex = (index, digit) => {
        const next = [...otp];
        next[index] = digit;
        onChange(next.join('').trim());
    };

    const handleChange = (e, index) => {
        const digit = e.target.value.replace(/\D/g, '').slice(-1);
        updateOtpAtIndex(index, digit);

        if (digit && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key !== 'Backspace') {
            return;
        }

        if (otp[index]) {
            updateOtpAtIndex(index, '');
            return;
        }

        if (index > 0) {
            inputs.current[index - 1]?.focus();
            updateOtpAtIndex(index - 1, '');
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        onChange(pasted);
        inputs.current[Math.min(pasted.length, 5)]?.focus();
    };

    return (
        <div>
            <p className="mb-3 text-sm font-medium text-gray-700">Enter OTP</p>

            <div className="mb-6 flex justify-between gap-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="h-11 w-11 rounded-lg border border-gray-300 text-center text-base font-medium text-gray-800 outline-none focus:border-[#071074] focus:ring-1 focus:ring-[#071074]"
                    />
                ))}
            </div>
        </div>
    );
};

export default Otp;
