import {Category} from "./category";
import {Resume} from "./resume";

export interface PublicUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  resume?: Resume;
  categories?: Category[];
  photo: File;
}
