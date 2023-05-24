/**
 * DirectMessages type used for the direct messages db.
 */
export type TDirectMessages = {
  id?: string; // documentID
  userIDs: string[]; // die angeschriebenen Users
};
