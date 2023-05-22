import { Chat } from './chat';

export type TUser = {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
  channels: Chat[];
  directMessages: Chat[];
  isOnline: boolean;
};
