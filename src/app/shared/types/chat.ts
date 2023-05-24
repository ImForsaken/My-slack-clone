/**
 * Channels type used in the user type.
 */
export type TChannel = {
  id: string;
  name: string;
  createdOn?: string;
};

/**
 * Direct messages type used in the user type.
 */
export type TDirectMessage = {
  chatPartnerId: string,
  chatPartnerName: string,
  dmDocId: string
}