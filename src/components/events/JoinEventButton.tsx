"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { ArrowUpRight } from "lucide-react"

type JoinEventButtonProps = {
    eventId: string
}


export default function JoinEventButton({ eventId }: JoinEventButtonProps) {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()
    const [isJoining, setIsJoining] = useState(false)

    const handleJoin = async () => {
        if (!session) {
            router.push(`/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`)
            toast.info("Please log in to join this event.")
            return
        }

        try {
            setIsJoining(true)

            const res = await fetch("/api/events/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ eventId }),
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 409) {
                    toast.info("You have already joined this event.")
                    return
                }

                if (res.status === 401) {
                    toast.info("Please log in to join this event.")
                    router.push(`/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`)
                    return
                }

                throw new Error(data.message || "Failed to join event.")
            }

            toast.success("You have successfully joined this event!")
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsJoining(false)
        }
    }


    return (
        <button
            type="button"
            onClick={handleJoin}
            disabled={isPending || isJoining}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-5 py-4 font-bold text-white transition-colors hover:bg-[#9e2020] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isJoining
                ? "Joining..."
                : isPending
                    ? "Checking..."
                    : "Join Event"}
            <ArrowUpRight size={19} />
        </button>
    )
}