export type Message = {
    id?: string,
    userId: string,
    userName: string,
    profilePicture: string,
    text: string,
    timestamp: string,
    threadId?: string
}