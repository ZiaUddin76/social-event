
"use client"

import { useEffect, useState, type FormEvent } from "react"
import {
    CalendarDays,
    MapPin,
    Tag,
    Pencil,
    Trash2,
    X,
    LoaderCircle,
    ImageIcon,
} from "lucide-react"
import { toast } from "sonner"
import type { DatabaseEvent } from "@/types/event"
import { getTokenFromClient } from "@/lib/GetTokenFromClient"

type EventFormData = Pick<
    DatabaseEvent,
    "title" | "eventType" | "description" | "image" | "location" | "eventDate"
>

const API_URL = process.env.NEXT_PUBLIC_API_URL

const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Community Service",
    "Education",
    "Other",
]

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

const getDateInputValue = (date: string) => {
    return date.slice(0, 10)
}

// Get tomorrow's date for the date input and validation.
const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
    const day = String(tomorrow.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

// Check whether the URL actually loads an image.
const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image()

        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)

        img.src = url
    })
}

export default function ManageEventsPage() {
    const [events, setEvents] = useState<DatabaseEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedEvent, setSelectedEvent] = useState<DatabaseEvent | null>(null)
    const [updating, setUpdating] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const [formData, setFormData] = useState<EventFormData>({
        title: "",
        eventType: "",
        description: "",
        image: "",
        location: "",
        eventDate: "",
    })

    // Fetch the user's events
    useEffect(() => {
        const fetchMyEvents = async () => {

            const token = await getTokenFromClient()

            if (!token) {
                setError("Your session has expired. Please log in again.")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError("")

                const res = await fetch(`${API_URL}/my-events`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                    credentials: "include",
                })

                if (!res.ok) {
                    throw new Error("Failed to load your events.")
                }

                const data: DatabaseEvent[] = await res.json()
                setEvents(data)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                )
            } finally {
                setLoading(false)
            }
        }

        fetchMyEvents()
    }, [])

    // Open edit modal
    const handleEdit = (event: DatabaseEvent) => {
        setSelectedEvent(event)

        setFormData({
            title: event.title,
            eventType: event.eventType,
            description: event.description,
            image: event.image,
            location: event.location,
            eventDate: getDateInputValue(event.eventDate),
        })
    }

    // Update form fields
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Update event
    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!selectedEvent) return

        // Validate title
        const title = formData.title.trim()

        if (!title) {
            toast.error("Please enter an event title.")
            return
        }

        if (title.length < 5 || title.length > 100) {
            toast.error("Title must be between 5 and 100 characters.")
            return
        }

        // Validate event type
        if (!eventTypes.includes(formData.eventType)) {
            toast.error("Please select a valid event type.")
            return
        }

        // Validate description
        const description = formData.description.trim()

        if (!description) {
            toast.error("Please enter an event description.")
            return
        }

        if (description.length < 20 || description.length > 1000) {
            toast.error(
                "Description must be between 20 and 1000 characters."
            )
            return
        }

        // Validate location
        const location = formData.location.trim()

        if (!location) {
            toast.error("Please enter an event location.")
            return
        }

        if (location.length < 3 || location.length > 150) {
            toast.error("Location must be between 3 and 150 characters.")
            return
        }

        // Validate image URL
        const image = formData.image.trim()

        if (!image) {
            toast.error("Please enter an image URL.")
            return
        }

        try {
            const imageUrl = new URL(image)

            if (
                imageUrl.protocol !== "http:" &&
                imageUrl.protocol !== "https:"
            ) {
                throw new Error("Invalid image URL")
            }
        } catch {
            toast.error("Please enter a valid image URL.")
            return
        }

        // Check whether the URL actually loads an image
        const isValidImage = await validateImageUrl(image)

        if (!isValidImage) {
            toast.error("This URL does not load a valid image.")
            return
        }

        // Validate event date
        const minimumDate = getTomorrowDate()

        if (!formData.eventDate || formData.eventDate < minimumDate) {
            toast.error("Please select a valid future event date.")
            return
        }

        // Prepare validated event data
        const updatedData: EventFormData = {
            title,
            eventType: formData.eventType,
            description,
            image,
            location,
            eventDate: formData.eventDate,
        }

        try {
            setUpdating(true)

            const token = await getTokenFromClient()

            if (!token) {
                toast.error("Your session has expired. Please log in again.")
                return
            }

            const res = await fetch(
                `${API_URL}/update-event/${selectedEvent._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedData),
                }
            )

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to update event.")
            }

            setEvents((prev) =>
                prev
                    .map((event) =>
                        event._id === selectedEvent._id
                            ? { ...event, ...updatedData }
                            : event
                    )
                    .sort(
                        (a, b) =>
                            new Date(a.eventDate).getTime() -
                            new Date(b.eventDate).getTime()
                    )
            )

            setSelectedEvent(null)
            toast.success("Event updated successfully!")
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            )
        } finally {
            setUpdating(false)
        }
    }

    // Delete event
    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        )

        if (!confirmed) return

        try {
            setDeletingId(id)

            const token = await getTokenFromClient()

            if (!token) {
                toast.error("Your session has expired. Please log in again.")
                return
            }

            const res = await fetch(`${API_URL}/delete-event/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                },
                credentials: "include",
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete event.")
            }

            setEvents((prev) => prev.filter((event) => event._id !== id))

            toast.success("Event deleted successfully!")
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            )
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <main className="min-h-screen bg-[#faf8f6] px-4 py-12 dark:bg-background sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Page Header */}
                <div className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#bd2929]">
                        Your Dashboard
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground sm:text-4xl">
                        Manage Events
                    </h1>

                    <p className="mt-3 max-w-2xl text-gray-600 dark:text-muted-foreground">
                        Manage the events you have created. You can update
                        event information or remove events whenever needed.
                    </p>
                </div>

                {/* Event Count */}
                {!loading && !error && (
                    <div className="mb-7 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-card-foreground">
                            Your Events
                        </h2>

                        <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-[#bd2929] dark:bg-red-950/30">
                            {events.length}{" "}
                            {events.length === 1 ? "Event" : "Events"}
                        </span>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                        <LoaderCircle className="h-9 w-9 animate-spin text-[#bd2929]" />
                        <p className="text-gray-500 dark:text-muted-foreground">Loading your events...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
                        <p className="font-medium text-red-700 dark:text-red-300">{error}</p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-[#bd2929] px-5 py-2 text-sm font-semibold text-white hover:bg-red-800"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && events.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-border dark:bg-card">
                        <CalendarDays className="mx-auto mb-4 h-12 w-12 text-gray-400" />

                        <h2 className="text-xl font-semibold text-gray-800 dark:text-card-foreground">
                            No Events Yet
                        </h2>

                        <p className="mt-2 text-gray-500 dark:text-muted-foreground">
                            You haven&apos;t created any events yet.
                        </p>

                        <a
                            href="/create-event"
                            className="mt-6 inline-block rounded-lg bg-[#bd2929] px-6 py-3 font-semibold text-white transition hover:bg-red-800"
                        >
                            Create Your First Event
                        </a>
                    </div>
                )}

                {/* Events Grid */}
                {!loading && !error && events.length > 0 && (
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <article
                                key={event._id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-border dark:bg-card"
                            >
                                {/* Event Image */}
                                <div className="relative h-52 bg-gray-100 dark:bg-muted">
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#bd2929] shadow dark:bg-card">
                                        {event.eventType}
                                    </span>
                                </div>

                                {/* Event Information */}
                                <div className="p-5">
                                    <h3 className="mb-3 line-clamp-1 text-xl font-bold text-gray-900 dark:text-card-foreground">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-3 text-sm text-gray-600 dark:text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 shrink-0 text-[#bd2929]" />
                                            {event.location}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 shrink-0 text-[#bd2929]" />
                                            {formatDate(event.eventDate)}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 shrink-0 text-[#bd2929]" />
                                            {event.eventType}
                                        </p>
                                    </div>

                                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-muted-foreground">
                                        {event.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5 dark:border-border">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#bd2929] px-3 py-2.5 text-sm font-semibold text-[#bd2929] transition hover:bg-red-50 dark:hover:bg-red-950/30"
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            disabled={deletingId === event._id}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                                        >
                                            {deletingId === event._id ? (
                                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Event Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
                    <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:border dark:border-border dark:bg-card">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-border">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-card-foreground">
                                    Edit Event
                                </h2>

                                <p className="mt-1 text-sm text-gray-500 dark:text-muted-foreground">
                                    Update your event information.
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                disabled={updating}
                                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground"
                                aria-label="Close edit modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Edit Form */}
                        <form onSubmit={handleUpdate} className="space-y-5 p-6">

                            {/* Event Title */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-card-foreground">
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    minLength={5}
                                    maxLength={100}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-red-100 dark:border-border dark:bg-background dark:text-foreground"
                                />

                                <p className="mt-1 text-xs text-gray-500 dark:text-muted-foreground">
                                    5–100 characters.
                                </p>
                            </div>

                            {/* Event Type */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-card-foreground">
                                    Event Type
                                </label>

                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#bd2929] focus:ring-2 focus:ring-red-100 dark:border-border dark:bg-background dark:text-foreground"
                                >
                                    <option value="">Select event type</option>

                                    {eventTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Event Image URL */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-card-foreground">
                                    Event Image URL
                                </label>

                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#bd2929] focus:ring-2 focus:ring-red-100 dark:border-border dark:bg-background dark:text-foreground"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-card-foreground">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    minLength={3}
                                    maxLength={150}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#bd2929] focus:ring-2 focus:ring-red-100 dark:border-border dark:bg-background dark:text-foreground"
                                />

                                <p className="mt-1 text-xs text-gray-500 dark:text-muted-foreground">
                                    3–150 characters.
                                </p>
                            </div>

                            {/* Event Date */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-card-foreground">
                                    Event Date
                                </label>

                                <input
                                    type="date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    min={getTomorrowDate()}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#bd2929] focus:ring-2 focus:ring-red-100 dark:border-border dark:bg-background dark:text-foreground"
                                />

                                <p className="mt-1 text-xs text-gray-500 dark:text-muted-foreground">
                                    Events must be scheduled for a future date.
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-card-foreground">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    minLength={20}
                                    maxLength={1000}
                                    required
                                    rows={4}
                                    className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#bd2929] focus:ring-2 focus:ring-red-100 dark:border-border dark:bg-background dark:text-foreground"
                                />

                                <p className="mt-1 text-xs text-gray-500 dark:text-muted-foreground">
                                    20–1000 characters.
                                </p>
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 dark:border-border sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setSelectedEvent(null)}
                                    disabled={updating}
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-border dark:text-card-foreground dark:hover:bg-muted"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-[#bd2929] px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {updating && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    {updating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}
