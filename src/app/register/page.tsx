
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

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const router = useRouter()

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const photoURL = formData.get("photoURL") as string
        const password = formData.get("password") as string

        // Password validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.")
            return
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.")
            return
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.")
            return
        }

        try {
            setIsPending(true)

            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                image: photoURL,
                callbackURL: "/",
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success("Account created successfully!")

            router.push("/")
            router.refresh()
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#faf8f5] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#4b1717]/10 lg:min-h-[680px] lg:grid-cols-2">

                {/* Left Side - Community Introduction */}
                <section className="relative flex flex-col justify-between overflow-hidden bg-[#bd2929] p-8 text-white sm:p-12 lg:p-14">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />
                    <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[50px] border-white/10" />

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
                            Be part of something meaningful
                        </span>

                        <h1 className="mt-8 max-w-md text-4xl font-bold leading-tight sm:text-5xl">
                            Small Actions.
                            <br />
                            <span className="text-[#ffd9a8]">Big Changes.</span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                            Join a community of people who believe in making the world a
                            better place. Discover events, meet volunteers, and create
                            meaningful change together.
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

                {/* Right Side - Registration Form */}
                <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">
                    <div className="w-full max-w-md">
                        <div className="mb-9">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#bd2929]">
                                Get Started
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Create your account
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Your journey towards making a difference starts here.
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Full name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#bd2929] focus:bg-white focus:ring-4 focus:ring-[#bd2929]/10"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#bd2929] focus:bg-white focus:ring-4 focus:ring-[#bd2929]/10"
                                />
                            </div>

                            {/* Profile Photo */}
                            <div>
                                <label
                                    htmlFor="photoURL"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Profile photo URL
                                </label>

                                <input
                                    id="photoURL"
                                    name="photoURL"
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#bd2929] focus:bg-white focus:ring-4 focus:ring-[#bd2929]/10"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        required
                                        minLength={6}
                                        className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#bd2929] focus:bg-white focus:ring-4 focus:ring-[#bd2929]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#bd2929]"
                                        aria-label={
                                            showPassword ? "Hide password" : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>

                                <p className="mt-2 text-xs leading-5 text-gray-400">
                                    At least 6 characters, including uppercase and lowercase
                                    letters.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#bd2929]/20 transition hover:bg-[#a82020] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isPending ? "Creating Account..." : "Create Account"}

                                {!isPending && (
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                )}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-[#bd2929] transition hover:text-[#921c1c] hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>

                        <p className="mt-8 text-center text-xs leading-5 text-gray-400">
                            By creating an account, you join a community dedicated to
                            making a positive impact.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default RegisterPage
