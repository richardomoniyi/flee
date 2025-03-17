import React, { useState, useRef } from "react";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last digit entered
    setOtp(newOtp);

    // Move focus to next input if value entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          value={otp[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el)}
          maxLength={1}
          className="w-12 h-12 text-center border rounded text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
