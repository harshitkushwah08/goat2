import React, { useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Key } from 'lucide-react';
import { Button } from '../button';

const OtpDialog = ({
  isOpen,
  onClose,
  title = "Verify OTP",
  description = "Please enter the 6-digit OTP sent to your registered mobile number.",
  onSubmit,
  icon = <Key className="h-5 w-5 text-primary-600" />
}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to next input
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    onSubmit(code); // parent handles toast etc.
    setOtp(new Array(6).fill(''));
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg border border-bodyGray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {icon}
                  <Dialog.Title className="text-lg font-semibold text-bodyGray-900">
                    {title}
                  </Dialog.Title>
                </div>
                <button
                  onClick={onClose}
                  className="text-bodyGray-500 hover:text-bodyGray-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-bodyGray-500 mb-4">{description}</p>

              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputsRef.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center border border-bodyGray-300 rounded-lg text-lg font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition"
                  />
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-primary-600 hover:bg-primary-700"
              >
                <Key className="w-4 h-4 mr-2" /> Submit OTP
              </Button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OtpDialog;
