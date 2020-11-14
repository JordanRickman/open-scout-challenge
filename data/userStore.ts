/** User information only visible on the server side. */
export interface User {
  userId: string;
  onePagersRead: string[];
  paid: boolean;
};
export interface Users {
  [id: string]: User;
}

// In production, this data would go in some persistent datastore.
// For this mocked data point, save locally - lost between server restarts.
const users: Users = {};

// Singleton pattern for central users datastore.
export const getUsers = (): Users => {
  return users;
}