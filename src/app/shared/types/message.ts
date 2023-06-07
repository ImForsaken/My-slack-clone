/**
 * Allgemein der Text der gepostet wird, aus der Textbox (QIll)
 */
export type TMessage = {
  id?: string;
  userId: string;
  userName: string;
  profilePicture: string;
  text: string;
  timestamp: number;
  threadId?: string;
};
