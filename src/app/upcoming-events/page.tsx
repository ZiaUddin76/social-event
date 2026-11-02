
import Link from "next/link"
import Image from "next/image"
import { connection } from "next/server"
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
  Sparkles,
} from "lucide-react"

import type { DatabaseEvent } from "@/types/event"

export const instant = false

const getToday = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function UpcomingEventsPage() {
  await connection()

  const res = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }

  const events: DatabaseEvent[] = await res.json()

  // Show only events whose dates are today or in the future.
  const upcomingEvents = events
    .filter((event) => event.eventDate >= getToday())
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))

  return (
    <main className="flex-1 bg-[#faf8f5]">
      {/* Intro section */}
      <section className="relative overflow-hidden border-b border-[#eadfd7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8c9c5] bg-white px-4 py-2 text-sm font-medium text-[#bd2929]">
              <Sparkles size={16} />
              Discover opportunities to make a difference
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#292321] sm:text-5xl lg:text-6xl">
              Be part of something{" "}
              <span className="text-[#bd2929]">meaningful.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#716963] sm:text-lg">
              Every small action creates a bigger impact. Discover upcoming
              community events, meet people who care, and help build a better
              tomorrow.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6 text-sm text-[#655d58]">
              <span className="flex items-center gap-2">
                <Users size={18} className="text-[#bd2929]" />
                Make new connections
              </span>

              <span className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#bd2929]" />
                Create real impact
              </span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#bd2929]/5 blur-3xl" />
      </section>

      {/* Events section */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#bd2929]">
              Find your next opportunity
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#292321] sm:text-4xl">
              Upcoming events<span className="text-[#bd2929]">.</span>
            </h2>

            <p className="mt-3 text-[#716963]">
              Find an event that matches your passion.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#655d58] shadow-sm">
            <CalendarDays size={16} className="text-[#bd2929]" />
            {upcomingEvents.length} events available
          </div>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#eee5df] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#bd2929] shadow-sm">
                    {event.eventType}
                  </span>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#bd2929]">
                    <CalendarDays size={16} />
                    {formatDate(event.eventDate)}
                  </div>

                  <h3 className="line-clamp-2 text-xl font-bold leading-snug text-[#292321] transition-colors group-hover:text-[#bd2929]">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#817771]">
                    {event.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-[#f0e9e4] pt-4 text-sm text-[#716963]">
                    <MapPin size={16} className="shrink-0 text-[#bd2929]" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd2929] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9e2020]"
                  >
                    View Event
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#dfcfc5] bg-white px-5 py-16 text-center">
            <CalendarDays size={40} className="mx-auto text-[#bd2929]" />

            <h3 className="mt-5 text-xl font-bold text-[#292321]">
              No upcoming events yet
            </h3>

            <p className="mt-2 text-sm text-[#817771]">
              Check back soon. New opportunities to make a difference are
              always welcome.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
