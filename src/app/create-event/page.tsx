
"use client"

import { useState, type FormEvent } from "react"
import {
    CalendarDays,
    ImageIcon,
    MapPin,
    Tag,
    Type,
    FileText,
    ArrowRight,
    HeartHandshake,
} from "lucide-react"
import { toast } from "sonner"
import type { Event } from "@/types/event"
import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/GetTokenFromClient"

const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Community Service",
    "Education",
    "Other",
]

export default function CreateEventPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [minEventDate, setMinEventDate] = useState("")

    const [formData, setFormData] = useState<Event>({
        title: "",
        eventType: "",
        description: "",
        image: "",
        location: "",
        eventDate: "",
    })

    // Calculate tomorrow when the user focuses on the date field.
    const updateMinEventDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        const year = tomorrow.getFullYear()
        const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
        const day = String(tomorrow.getDate()).padStart(2, "0")

        setMinEventDate(`${year}-${month}-${day}`)
    }

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

    // Check whether the URL actually loads an image.
    const validateImageUrl = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image()

            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)

            img.src = url
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const token = await getTokenFromClient()

        if (!token) {
            toast.error("Your session has expired. Please log in again.")
            return
        }

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
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        const year = tomorrow.getFullYear()
        const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
        const day = String(tomorrow.getDate()).padStart(2, "0")

        const minimumDate = `${year}-${month}-${day}`

        if (!formData.eventDate || formData.eventDate < minimumDate) {
            toast.error("Please select a valid future event date.")
            return
        }

        setIsSubmitting(true)

        try {
            // Prepare trimmed event data
            const eventData: Event = {
                title,
                eventType: formData.eventType,
                description,
                image,
                location,
                eventDate: formData.eventDate,
            }

            // Send event data to backend
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify(eventData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to create event")
            }

            console.log(data)



            toast.success("Event created successfully!")

            // Reset form after successful submission
            setFormData({
                title: "",
                eventType: "",
                description: "",
                image: "",
                location: "",
                eventDate: "",
            })

        } catch (error) {
            console.error(error)

            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong. Please try again.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#faf8f5] px-4 py-12">
            <div className="mx-auto max-w-6xl">
                {/* Page Heading */}
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-block rounded-full bg-[#bd2929]/10 px-4 py-2 text-sm font-semibold text-[#bd2929]">
                        Make a Difference
                    </span>

                    <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
                        Create an Event
                    </h1>

                    <p className="mx-auto max-w-xl text-gray-600">
                        Bring people together, inspire positive change, and
                        make your community a better place.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                    {/* Event Form */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Event Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                                >
                                    <Type size={17} />
                                    Event Title
                                </label>

                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Community Cleaning Day"
                                    minLength={5}
                                    maxLength={100}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    5–100 characters.
                                </p>
                            </div>

                            {/* Event Type */}
                            <div>
                                <label
                                    htmlFor="eventType"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                                >
                                    <Tag size={17} />
                                    Event Type
                                </label>

                                <select
                                    id="eventType"
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                >
                                    <option value="" disabled>
                                        Select an event type
                                    </option>

                                    {eventTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                                >
                                    <FileText size={17} />
                                    Event Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell people what this event is about..."
                                    rows={5}
                                    minLength={20}
                                    maxLength={1000}
                                    required
                                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    20–1000 characters.
                                </p>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                                >
                                    <ImageIcon size={17} />
                                    Thumbnail Image URL
                                </label>

                                <input
                                    id="image"
                                    name="image"
                                    type="url"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                />

                                {formData.image.trim() && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-sm font-medium text-gray-600">
                                            Image Preview
                                        </p>

                                        <img
                                            src={formData.image}
                                            alt="Event thumbnail preview"
                                            className="h-48 w-full rounded-xl border border-gray-200 object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none"
                                            }}
                                            onLoad={(e) => {
                                                e.currentTarget.style.display = "block"
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label
                                    htmlFor="location"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                                >
                                    <MapPin size={17} />
                                    Event Location
                                </label>

                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter event location"
                                    minLength={3}
                                    maxLength={150}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    3–150 characters.
                                </p>
                            </div>

                            {/* Event Date */}
                            <div>
                                <label
                                    htmlFor="eventDate"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                                >
                                    <CalendarDays size={17} />
                                    Event Date
                                </label>

                                <input
                                    id="eventDate"
                                    name="eventDate"
                                    type="date"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    onFocus={updateMinEventDate}
                                    min={minEventDate || undefined}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#bd2929] focus:ring-2 focus:ring-[#bd2929]/10"
                                />

                                <p className="mt-2 text-xs text-gray-500">
                                    Events must be scheduled for a future date.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#bd2929] px-6 py-3.5 font-semibold text-white transition hover:bg-[#a92121] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Creating Event..." : "Create Event"}

                                {!isSubmitting && <ArrowRight size={18} />}
                            </button>
                        </form>
                    </div>

                    {/* Side Information */}
                    <aside className="h-fit rounded-2xl bg-[#bd2929] p-7 text-white">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/15">
                            <HeartHandshake size={30} />
                        </div>

                        <h2 className="mb-3 text-2xl font-bold">
                            Make an Impact
                        </h2>

                        <p className="mb-7 leading-relaxed text-white/85">
                            Every great change starts with a small action.
                            Create an event and invite others to join you in
                            making a meaningful difference.
                        </p>

                        <div className="space-y-5">
                            <div>
                                <p className="font-semibold">
                                    Bring People Together
                                </p>
                                <p className="mt-1 text-sm text-white/75">
                                    Connect with people who share your passion.
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Create Positive Change
                                </p>
                                <p className="mt-1 text-sm text-white/75">
                                    Turn your ideas into meaningful action.
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Inspire Others
                                </p>
                                <p className="mt-1 text-sm text-white/75">
                                    Encourage your community to participate.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}
