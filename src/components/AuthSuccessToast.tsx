
"use client"

import { useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

const AuthSuccessToastContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const hasShownToast = useRef(false)

    useEffect(() => {
        const login = searchParams.get("login")
        const register = searchParams.get("register")

        if (login === "success" && !hasShownToast.current) {
            hasShownToast.current = true
            toast.success("Login successful!")
            router.replace("/")
        }

        if (register === "success" && !hasShownToast.current) {
            hasShownToast.current = true
            toast.success("Account created successfully!")
            router.replace("/")
        }
    }, [searchParams, router])

    return null
}

const AuthSuccessToast = () => {
    return (
        <Suspense fallback={null}>
            <AuthSuccessToastContent />
        </Suspense>
    )
}

export default AuthSuccessToast
