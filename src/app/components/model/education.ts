import {AcademicDegreeEnum} from "./academic-degree-enum";
import {StatusEnum} from "./status-enum";

export interface Education {
  id: number;
  status: StatusEnum;
  academicDegree: AcademicDegreeEnum;
  course: string;
  institution: string;
  description: string;
}
