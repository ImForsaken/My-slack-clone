import { TChannel, TDirectMessage } from './chat';

/**
 * Type for a user of the application.
 */
export type TUser = {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
  isOnline: boolean;
  channels: TChannel[];
  directMessages: TDirectMessage[];
};
