"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // For now, this is a placeholder
      // Configure with your actual Convex auth implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard after successful login
      router.push("/app/dashboard")
    } catch (err) {
      setError("Invalid email or password")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-neutral-100">Welcome back</h1>
        <p className="text-neutral-400">Enter your credentials to access your account</p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-lg shadow-neutral-950/40">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">Email</label>
            <Input
              type="email"
              placeholder="you@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="border-neutral-800 bg-neutral-950 text-neutral-100 placeholder:text-neutral-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-300">Password</label>
              <Link
                href="#"
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="border-neutral-800 bg-neutral-950 text-neutral-100 placeholder:text-neutral-500"
            />
          </div>
          {error && (
            <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-sm text-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-neutral-300 transition hover:border-indigo-600/50 hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign in with Google
          </button>
          <div className="text-center text-sm text-neutral-400">
            Contact support to create an account
          </div>
        </form>
      </div>
    </div>
  )
}
