
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

const db = client.db("social-work")
const eventCollection = db.collection("event")
const joinedEventsCollection = db.collection("joinedEvents")

export async function POST(req: Request) {
    try {
        // 1. Verify the user's Better Auth session
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session) {
            return Response.json(
                { message: "Please log in to join this event." },
                { status: 401 }
            )
        }

        // 2. Get the event ID
        const { eventId } = await req.json()

        if (!eventId || !ObjectId.isValid(eventId)) {
            return Response.json(
                { message: "Invalid event ID." },
                { status: 400 }
            )
        }

        // 3. Connect to MongoDB
        await client.connect()

        // 4. Check whether the event exists
        const event = await eventCollection.findOne({
            _id: new ObjectId(eventId),
        })

        if (!event) {
            return Response.json(
                { message: "Event not found." },
                { status: 404 }
            )
        }

        // 5. Create a unique index to prevent duplicate registrations
        await joinedEventsCollection.createIndex(
            { eventId: 1, userId: 1 },
            { unique: true }
        )

        // 6. Save the registration
        const result = await joinedEventsCollection.insertOne({
            eventId: new ObjectId(eventId),
            userId: session.user.id,
            userEmail: session.user.email,
            joinedAt: new Date(),
        })

        return Response.json(
            {
                message: "Successfully joined the event!",
                registrationId: result.insertedId,
            },
            { status: 201 }
        )

    } catch (error: unknown) {
        // 7. Handle duplicate registrations
        if (
            error instanceof Error &&
            "code" in error &&
            error.code === 11000
        ) {
            return Response.json(
                { message: "You have already joined this event." },
                { status: 409 }
            )
        }

        console.error("Join event error:", error)

        return Response.json(
            { message: "Something went wrong. Please try again." },
            { status: 500 }
        )
    }
}
