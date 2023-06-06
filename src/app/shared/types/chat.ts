/**
 * Channels type used in the user type.
 */
export type TChannel = {
  id?: string;
  name: string;
  createdOn?: string; // createdFromUserID = ID
  status: 'public' | 'private';
};

/**
 * Direct messages type used in the user type.
 */
export type TDirectMessage = {
  chatPartnerID: string;
  chatPartnerName: string;
  dmDocID: string;
};
