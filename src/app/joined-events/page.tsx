"use client"

import { useEffect, useState } from "react"
import type { JoinedEvent } from "@/types/event"
import Link from "next/link"



export default function JoinedEventsPage() {


    const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                const res = await fetch("http://localhost:8000/joined-events", {
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
        <main className="flex-1 bg-[#f8f8f8]">
            <section className="max-w-6xl mx-auto px-4 py-12">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Joined Events
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Events you've joined and are looking forward to.
                    </p>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                    Total Joined Events: {joinedEvents.length}
                </p>


                {loading && (
                    <p className="text-center py-16 text-gray-500">
                        Loading your joined events...
                    </p>
                )}

                {error && (
                    <p className="text-center py-16 text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && joinedEvents.length === 0 && (
                    <div className="text-center py-16">
                        <h2 className="text-xl font-semibold text-gray-800">
                            No Joined Events Yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't joined any events. Explore upcoming events and get involved!
                        </p>
                    </div>
                )}


                {!loading && !error && joinedEvents.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {joinedEvents.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                            >

                                <img
                                    src={event.image}
                                    alt={event.eventTitle}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-5">

                                    <span className="text-sm text-[#bd2929] font-medium">
                                        {event.eventType}
                                    </span>

                                    <h2 className="text-xl font-bold text-gray-900 mt-2">
                                        {event.eventTitle}
                                    </h2>

                                    <p className="text-gray-500 mt-3">
                                        {event.location}
                                    </p>

                                    <p className="text-gray-500 mt-2">
                                        {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>

                                    <Link
                                        href={`/events/${event.eventId}`}
                                        className="mt-5 block text-center bg-[#bd2929] hover:bg-[#a91f1f] text-white py-2.5 rounded-lg font-medium transition-colors"
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