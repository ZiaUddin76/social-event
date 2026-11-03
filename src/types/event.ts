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


export type JoinedEvent = {
    _id: string
    eventId: string
    eventTitle: string
    eventDate: string
    eventType: string
    image: string
    location: string
    userId: string
    userName: string
    userEmail: string
    joinedAt: string
}