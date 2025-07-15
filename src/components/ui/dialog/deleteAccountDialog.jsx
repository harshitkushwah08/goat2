import React, { useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Trash2, X } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';

const DeleteAccountDialog = ({ isOpen, onClose, fullName, onDelete }) => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleOtpChange = (e, idx) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (idx < 5) inputsRef.current[idx + 1].focus();
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[idx] = '';
      setOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) inputsRef.current[idx - 1].focus();
    else if (e.key === 'ArrowLeft' && idx > 0) inputsRef.current[idx - 1].focus();
    else if (e.key === 'ArrowRight' && idx < 5) inputsRef.current[idx + 1].focus();
  };

  const handleDelete = () => {
    const code = otp.join('');
    onDelete({ password, name, otp: code });
    setPassword('');
    setName('');
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
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <Dialog.Title className="text-lg font-semibold text-bodyGray-900">Delete Account</Dialog.Title>
                </div>
                <button onClick={onClose} className="text-bodyGray-500 hover:text-bodyGray-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-bodyGray-500 mb-4">
                This action is irreversible. Please confirm your identity.
              </p>

              <div className="space-y-3 mb-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`Type your full name (${fullName})`}
                />
              </div>

              <p className="text-xs text-bodyGray-500 mb-2">Enter the 6-digit OTP sent to your email & phone:</p>
              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => inputsRef.current[idx] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-10 h-10 text-center border border-bodyGray-300 rounded-lg text-lg font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition"
                  />
                ))}
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Confirm Delete
              </Button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteAccountDialog;
