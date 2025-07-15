"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
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
              <Mail className="h-6 w-6 text-primary-600 " />
            </div>
            <h1 className="text-3xl font-bold">Forgot password?</h1>
            <p className="text-bodyGray-500 ">
              No problem. Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>
          <div className="mt-8">
            {isSubmitted ? (
              <Alert className="border-primary-600 bg-primary-50 text-primary-700 ">
                <AlertTitle className="font-medium">Check your email</AlertTitle>
                <AlertDescription>
                  We&apos;ve sent a password reset link to {email}. Please check your inbox.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-bodyGray-400 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                  Send Reset Link
                </Button>
              </form>
            )}
            <div className="mt-6 text-center text-sm">
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
