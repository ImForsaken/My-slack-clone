/**
 * Message type for the messages from the quill editor.
 */
export type TMessage = {
  id?: string;
  userId: string;
  userName: string;
  profilePicture: string;
  text: string;
  timestamp: number;
  type: string;
  threadId?: string;
};
