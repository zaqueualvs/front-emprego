import {PublicUser} from "./public-user";

export interface UserPage {
  users: PublicUser[];
  totalElements: number;
  totalPages: number;
}
