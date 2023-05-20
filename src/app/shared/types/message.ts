export type Message = {
    id?: string,
    userId: string,
    userName: string,
    text: string,
    timestamp: string,
    threadId?: string
}