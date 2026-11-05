
import Link from "next/link"
import Image from "next/image"
import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Sparkles,
} from "lucide-react"

import type { DatabaseEvent } from "@/types/event"

const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

export default async function RecentEvents() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recent-events`,
        { cache: "no-store" }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch recent events")
    }

    const events: DatabaseEvent[] = await res.json()

    return (
        <section className="bg-[#faf8f5] py-20 dark:bg-background scroll-mt-20"
        id="recent-events">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">

                {/* Section heading */}
                <div className="reveal mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#bd2929]">
                            Make a difference together
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-[#292321] dark:text-foreground sm:text-4xl">
                            Recent upcoming events
                            <span className="text-[#bd2929]">.</span>
                        </h2>

                        <p className="mt-3 text-[#716963] dark:text-muted-foreground">
                            Discover the latest opportunities to make a positive impact.
                        </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#655d58] shadow-sm dark:bg-card dark:text-card-foreground">
                        <Sparkles size={16} className="text-[#bd2929]" />
                        {events.length} events available
                    </div>
                </div>

                {/* Event cards */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event, index) => (
                        <article
                            key={event._id}
                            style={{ animationDelay: `${index * 80}ms` }}
                            className="reveal group overflow-hidden rounded-2xl border border-[#eee5df] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#bd2929]/40 hover:shadow-xl hover:shadow-[#bd2929]/10 dark:border-border dark:bg-card dark:hover:border-[#bd2929]/50 dark:hover:shadow-[#bd2929]/5"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#bd2929] shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 dark:bg-card/90">
                                    {event.eventType}
                                </span>
                            </div>

                            {/* Card content */}
                            <div className="p-5">
                                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#bd2929]">
                                    <CalendarDays size={16} />
                                    {formatDate(event.eventDate)}
                                </div>

                                <h3 className="line-clamp-2 text-xl font-bold leading-snug text-[#292321] transition-colors group-hover:text-[#bd2929] dark:text-card-foreground">
                                    {event.title}
                                </h3>

                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#817771] dark:text-muted-foreground">
                                    {event.description}
                                </p>

                                <div className="mt-5 flex items-center gap-2 border-t border-[#f0e9e4] pt-4 text-sm text-[#716963] dark:border-border dark:text-muted-foreground">
                                    <MapPin size={16} className="shrink-0 text-[#bd2929]" />
                                    <span className="truncate">{event.location}</span>
                                </div>

                                <Link
                                    href={`/events/${event._id}`}
                                    className="btn-shine mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9e2020] active:scale-[0.98]"
                                >
                                    View Event
                                    <ArrowUpRight size={17} />
                                </Link>
                            </div>
                        </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[#dfcfc5] bg-white px-5 py-16 text-center dark:border-border dark:bg-card">
                        <CalendarDays size={40} className="mx-auto text-[#bd2929]" />

                        <h3 className="mt-5 text-xl font-bold text-[#292321] dark:text-card-foreground">
                            No upcoming events yet
                        </h3>

                        <p className="mt-2 text-sm text-[#817771] dark:text-muted-foreground">
                            Check back soon. New opportunities to make a difference are
                            always welcome.
                        </p>
                    </div>
                )}

                {/* Explore all events */}
                <div className="reveal mt-12 text-center">
                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-[#bd2929] px-7 py-3 font-semibold text-[#bd2929] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bd2929] hover:text-white dark:text-[#e05c5c] dark:hover:text-white"
                    >
                        Explore All Events
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
