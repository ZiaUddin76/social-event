
"use client"

import { useEffect, useState } from "react"
import type { JoinedEvent } from "@/types/event"
import Link from "next/link"
import { getTokenFromClient } from "@/lib/GetTokenFromClient"

export default function JoinedEventsPage() {

    const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    useEffect(() => {
        const fetchJoinedEvents = async () => {

            const token = await getTokenFromClient()

            if (!token) {
                setError("Your session has expired. Please log in again.")
                setLoading(false)
                return
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-events`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                    credentials: "include",
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch joined events")
                }

                const data: JoinedEvent[] = await res.json()

                setJoinedEvents(data)

            } catch (error) {
                console.error(error)
                setError("Something went wrong while loading your joined events.")
            } finally {
                setLoading(false)
            }
        }

        fetchJoinedEvents()
    }, [])

    return (
        <main className="flex-1 bg-[#f8f8f8] dark:bg-background">
            <section className="mx-auto max-w-6xl px-4 py-12">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">
                        My Joined Events
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-muted-foreground">
                        Events you&apos;ve joined and are looking forward to.
                    </p>
                </div>

                <p className="mb-6 text-sm text-gray-600 dark:text-muted-foreground">
                    Total Joined Events: {joinedEvents.length}
                </p>

                {loading && (
                    <p className="py-16 text-center text-gray-500 dark:text-muted-foreground">
                        Loading your joined events...
                    </p>
                )}

                {error && (
                    <p className="py-16 text-center text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}

                {!loading && !error && joinedEvents.length === 0 && (
                    <div className="py-16 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-card-foreground">
                            No Joined Events Yet
                        </h2>

                        <p className="mt-2 text-gray-500 dark:text-muted-foreground">
                            You haven&apos;t joined any events. Explore upcoming events and get involved!
                        </p>
                    </div>
                )}

                {!loading && !error && joinedEvents.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {joinedEvents.map((event) => (
                            <div
                                key={event._id}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-border dark:bg-card"
                            >

                                <img
                                    src={event.image}
                                    alt={event.eventTitle}
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-5">

                                    <span className="text-sm font-medium text-[#bd2929]">
                                        {event.eventType}
                                    </span>

                                    <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-card-foreground">
                                        {event.eventTitle}
                                    </h2>

                                    <p className="mt-3 text-gray-500 dark:text-muted-foreground">
                                        {event.location}
                                    </p>

                                    <p className="mt-2 text-gray-500 dark:text-muted-foreground">
                                        {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>

                                    <Link
                                        href={`/events/${event.eventId}`}
                                        className="mt-5 block rounded-lg bg-[#bd2929] py-2.5 text-center font-medium text-white transition-colors hover:bg-[#a91f1f]"
                                    >
                                        View Event
                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </section>
        </main>
    )
}
