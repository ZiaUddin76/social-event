"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/GetTokenFromClient"
import { ArrowUpRight } from "lucide-react"

const EVENT_SERVER_URL = "http://localhost:8000"

type JoinEventButtonProps = {
    eventId: string
}


export default function JoinEventButton({ eventId }: JoinEventButtonProps) {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()
    const [isJoining, setIsJoining] = useState(false)
    const [hasJoined, setHasJoined] = useState(false)

    // Check with the backend if the logged in user has already joined this event.
    useEffect(() => {
        const checkJoined = async () => {
            const token = await getTokenFromClient()

            const res = await fetch(
                `${EVENT_SERVER_URL}/event/${eventId}/joined`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                }
            )

            const data = await res.json().catch(() => null)

            if (data?.joined) {
                setHasJoined(true)
            }
        }

        if (isPending || !session) return

        checkJoined().catch(() => {})
    }, [eventId, isPending, session])

    const redirectToLogin = () => {
        router.push(`/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`)
    }

    const handleJoin = async () => {
        if (!session) {
            toast.info("Please log in to join this event.")
            redirectToLogin()
            return
        }

        try {
            setIsJoining(true)

            const token = await getTokenFromClient()

            const res = await fetch(`${EVENT_SERVER_URL}/join-event`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ eventId }),
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 409) {
                    setHasJoined(true)
                    toast.info("You have already joined this event.")
                    return
                }

                if (res.status === 401) {
                    toast.info("Please log in to join this event.")
                    redirectToLogin()
                    return
                }

                throw new Error(data.message || "Failed to join event.")
            }

            setHasJoined(true)
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
            disabled={isPending || isJoining || hasJoined}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-5 py-4 font-bold text-white transition-colors hover:bg-[#9e2020] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {hasJoined
                ? "Already joined"
                : isJoining
                    ? "Joining..."
                    : isPending
                        ? "Checking..."
                        : "Join Event"}
            <ArrowUpRight size={19} />
        </button>
    )
}
