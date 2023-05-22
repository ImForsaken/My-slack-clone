import { TChat } from './chat';

export type TUser = {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
  isOnline: boolean;
  channels: TChat[];
  directMessages: TChat[];
};
