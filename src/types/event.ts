export type Event = {
    title: string
    eventType: string
    description: string
    image: string
    location: string
    eventDate: string
}

export type DatabaseEvent = Event & {
    _id: string
    creatorEmail: string
    createdAt: string
}