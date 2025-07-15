"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shield } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "..//ui/input"
import { Label } from "../ui/label"

export default function TwoFactorPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
        <header className="p-6">
              <Link to="/" className="inline-flex items-center gap-2">
                <img src="/logo/horizontal-logo.png" alt="InventoryPro" className="h-10 w-30" />
              </Link>
            </header>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="rounded-full bg-primary-100 p-2 ">
              <Shield className="h-6 w-6 text-primary-600 " />
            </div>
            <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
            <p className="text-bodyGray-500 ">
              Enter the verification code sent to your email or authentication app
            </p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 w-12 text-center text-lg border-bodyGray-400 focus:border-primary-500 focus:ring-primary-500"
                    />
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700"
                disabled={code.some((digit) => !digit)}
              >
                Verify
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Didn&apos;t receive a code?{" "}
              <button className="text-primary-600 hover:text-primary-700 hover:underline">Resend</button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link to="/login" className="text-primary-600 hover:text-primary-700 hover:underline">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    <footer className="p-6 border-t border-bodyGray-300 bg-boldWhite">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-bodyGray-500">
          <p>© {new Date().getFullYear()} InventoryPro. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
            <Link to="/support" className="hover:text-primary-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
