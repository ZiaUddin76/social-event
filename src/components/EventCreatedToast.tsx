
"use client"

import { useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

const EventCreatedToastContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const hasShownToast = useRef(false)

    useEffect(() => {
        const created = searchParams.get("created")

        if (created === "success" && !hasShownToast.current) {
            hasShownToast.current = true
            toast.success("Event created successfully!")
            router.replace("/upcoming-events")
        }
    }, [searchParams, router])

    return null
}

const EventCreatedToast = () => {
    return (
        <Suspense fallback={null}>
            <EventCreatedToastContent />
        </Suspense>
    )
}

export default EventCreatedToast