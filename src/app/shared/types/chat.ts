/**
 * Channels type used in the user type.
 */
export type TChannel = {
  id: string;
  name: string;
  createdOn?: string; // createdFromUserID = ID
};

/**
 * Direct messages type used in the user type.
 */
export type TDirectMessage = {
  chatPartnerId: string;
  chatPartnerName: string;
  dmDocId: string;
};
