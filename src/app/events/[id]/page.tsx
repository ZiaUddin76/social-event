
import Image from "next/image"
import Link from "next/link"
import { connection } from "next/server"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
  Sparkles,
  Heart,
  Leaf,
  HandHeart,
} from "lucide-react"

import type { DatabaseEvent } from "@/types/event"
import JoinEventButton from "@/components/events/JoinEventButton"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"




export const instant = false

type EventDetailsPageProps = {
  params: Promise<{ id: string }>
}

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const formatShortDate = (date: string) => {
  const formatted = new Date(`${date}T00:00:00`)

  return {
    day: formatted.toLocaleDateString("en-US", { day: "2-digit" }),
    month: formatted.toLocaleDateString("en-US", { month: "short" }),
    year: formatted.getFullYear(),
  }
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  await connection()

  const { id } = await params



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  console.log("Event API status:", res.status)
  console.log("Event API status text:", res.statusText)

  if (!res.ok) {
    const errorDetails = await res.text()

    console.error("Event API error:", errorDetails)

    if (res.status === 404) {
      notFound()
    }

    throw new Error("Failed to fetch event")
  }

  const event: DatabaseEvent = await res.json()

  const eventDate = formatShortDate(event.eventDate)

  return (
    <main className="flex-1 bg-[#faf8f5]">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <Link
          href="/upcoming-events"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#716963] transition-colors hover:text-[#bd2929]"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Explore other events
        </Link>
      </section>

      {/* Main event section */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left: Event details */}
          <div className="min-w-0">
            {/* Event image */}
            <div className="group relative h-[300px] overflow-hidden rounded-3xl bg-[#e9ded5] sm:h-[440px]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#bd2929] shadow-lg sm:left-7 sm:top-7">
                <Sparkles size={15} />
                {event.eventType}
              </div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                  EventHub community initiative
                </p>

                <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>
              </div>
            </div>

            {/* Event description */}
            <div className="mt-8 rounded-3xl border border-[#eee5df] bg-white p-6 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#bd2929]/10 text-[#bd2929]">
                  <HandHeart size={23} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd2929]">
                    The purpose
                  </p>
                  <h2 className="text-xl font-bold text-[#292321]">
                    About this event
                  </h2>
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-[#716963]">
                {event.description}
              </p>

              <div className="mt-8 flex items-start gap-4 rounded-2xl bg-[#faf8f5] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#bd2929]/10 text-[#bd2929]">
                  <Heart size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-[#292321]">
                    Every contribution matters
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#716963]">
                    Your time, effort, and kindness can help create a positive
                    change in the community.
                  </p>
                </div>
              </div>
            </div>

            {/* Community message */}
            <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#bd2929] p-7 text-white sm:p-9">
              <div className="relative z-10 max-w-xl">
                <div className="mb-4 flex items-center gap-2 text-white/80">
                  <Leaf size={19} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">
                    Together we can
                  </span>
                </div>

                <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
                  Small actions. Stronger communities. A better tomorrow.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80">
                  Be someone who takes action. Join people who believe that
                  positive change starts with us.
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            </div>
          </div>

          {/* Right: Event information and join panel */}
          <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-3xl border border-[#eee5df] bg-white shadow-sm">
              {/* Date header */}
              <div className="flex items-center justify-between bg-[#bd2929] px-6 py-5 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                    Save the date
                  </p>
                  <p className="mt-1 text-lg font-bold">Event information</p>
                </div>

                <CalendarDays size={27} />
              </div>

              <div className="p-6">
                {/* Date display */}
                <div className="flex items-center gap-4 rounded-2xl bg-[#faf8f5] p-4">
                  <div className="flex h-[76px] w-[72px] shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
                    <span className="text-2xl font-bold text-[#bd2929]">
                      {eventDate.day}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#716963]">
                      {eventDate.month}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#292321]">
                      {eventDate.year}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#817771]">
                      {formatDate(event.eventDate)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#bd2929]/10 text-[#bd2929]">
                    <MapPin size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a49a93]">
                      Location
                    </p>
                    <p className="mt-1 break-words font-semibold text-[#292321]">
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Event type */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#bd2929]/10 text-[#bd2929]">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a49a93]">
                      Event category
                    </p>
                    <p className="mt-1 font-semibold text-[#292321]">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#bd2929]/10 text-[#bd2929]">
                    <Users size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a49a93]">
                      Organized by
                    </p>
                    <p className="mt-1 break-all font-semibold text-[#292321]">
                      {event.creatorEmail}
                    </p>
                  </div>
                </div>

                <div className="my-7 border-t border-dashed border-[#e8ded7]" />

                {/* Join section */}
                <div>
                  <p className="text-xl font-bold text-[#292321]">
                    Be part of the change.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#817771]">
                    Join this event and contribute your time and energy to
                    something meaningful.
                  </p>

                  <JoinEventButton eventId={event._id} />


                  <p className="mt-3 text-center text-xs text-[#a49a93]">
                    Login will be required to participate.
                  </p>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/upcoming-events"
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-[#e8ded7] bg-white px-5 py-4 text-sm font-semibold text-[#716963] transition-colors hover:border-[#bd2929] hover:text-[#bd2929]"
            >
              <ArrowLeft size={17} />
              Explore more events
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
