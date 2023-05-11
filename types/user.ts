export interface User {
  id: number;
  username: string;
  name: string;
  image?: string;
  email: string;
  emailVerified?: Date;
  hashedPassword?: string;
  favouriteIds: string[];

  createdAt: Date;
  updatedAt: Date;
}