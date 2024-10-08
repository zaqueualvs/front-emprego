import {Category} from "./category";
import {Resume} from "./resume";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  resume: Resume;
  show: boolean;
  categories: Category[];
  displayExpiration: string;
  photo: File;
}
