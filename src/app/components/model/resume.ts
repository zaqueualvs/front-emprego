import {Education} from "./education";
import {ProfessionalExperience} from "./professional-experience";

export interface Resume {
  id: number;
  professionalExperiences: ProfessionalExperience[];
  educations: Education[];
}
