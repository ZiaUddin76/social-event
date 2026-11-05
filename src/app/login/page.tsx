
"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import {
    ArrowRight,
    HeartHandshake,
    Users,
    Eye,
    EyeOff,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc";


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isGooglePending, setIsGooglePending] = useState(false)

    const router = useRouter()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            setIsPending(true)

            const { error } = await authClient.signIn.email({
                email,
                password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            window.location.href = "/?login=success"
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsPending(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setIsGooglePending(true)

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/?login=success",
            })
        } catch {
            toast.error("Google login failed. Please try again.")
            setIsGooglePending(false)
        }
    }

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#faf8f5] px-4 py-10 dark:bg-background sm:px-6 lg:px-8">
            <div className="animate-fade-up mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#4b1717]/10 dark:bg-card lg:min-h-[680px] lg:grid-cols-2">

                {/* Left Side - Community Introduction */}
                <section className="relative flex flex-col justify-between overflow-hidden bg-[#bd2929] p-8 text-white sm:p-12 lg:p-14">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />
                    <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[50px] border-white/10 animate-float-slow" />

                    <div className="relative z-10">
                        <div className="mb-12 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#bd2929]">
                                <HeartHandshake size={25} />
                            </div>

                            <span className="text-2xl font-bold tracking-tight">
                                EventHub
                            </span>
                        </div>

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium">
                            <Users size={16} />
                            Welcome back to our community
                        </span>

                        <h1 className="mt-8 max-w-md text-4xl font-bold leading-tight sm:text-5xl">
                            Together We
                            <br />
                            <span className="text-[#ffd9a8]">Make a Difference.</span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                            Your community is waiting for you. Sign in to discover
                            upcoming events, connect with volunteers, and continue
                            creating meaningful change.
                        </p>
                    </div>

                    <div className="relative z-10 mt-14 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                            <p className="text-3xl font-bold">1500+</p>
                            <p className="mt-1 text-sm text-white/75">
                                Active volunteers
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                            <p className="text-3xl font-bold">200+</p>
                            <p className="mt-1 text-sm text-white/75">
                                Events completed
                            </p>
                        </div>
                    </div>
                </section>

                {/* Right Side - Login Form */}
                <section className="flex items-center justify-center bg-white px-6 py-12 dark:bg-card sm:px-12 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-9">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#bd2929]">
                                Welcome Back
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-card-foreground sm:text-4xl">
                                Sign in to EventHub
                            </h2>

                            <p className="mt-3 text-gray-500 dark:text-muted-foreground">
                                Continue your journey towards making a difference.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-foreground"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#bd2929] focus:bg-white focus:ring-4 focus:ring-[#bd2929]/10 dark:border-border dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground dark:focus:bg-background"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-foreground"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#bd2929] focus:bg-white focus:ring-4 focus:ring-[#bd2929]/10 dark:border-border dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground dark:focus:bg-background"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#bd2929]"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending || isGooglePending}
                                className="btn-shine group flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#bd2929]/20 transition hover:bg-[#a82020] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isPending ? "Signing In..." : "Sign In"}

                                {!isPending && (
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-200 dark:bg-border" />
                            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-muted-foreground">
                                Or continue with
                            </span>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-border" />
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isPending || isGooglePending}
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-muted"
                        >
                            <FcGoogle size={20} />
                            {isGooglePending ? "Connecting..." : "Continue with Google"}
                        </button>

                        <p className="mt-7 text-center text-sm text-gray-500 dark:text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-semibold text-[#bd2929] transition hover:text-[#921c1c] hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>

                        <p className="mt-8 text-center text-xs leading-5 text-gray-400 dark:text-muted-foreground">
                            By signing in, you continue to be part of a community
                            dedicated to making a positive impact.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default LoginPage
