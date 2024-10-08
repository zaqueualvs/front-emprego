import {User} from "../../model/user";
import {formValidators} from "./form-validators.util";
import {NonNullableFormBuilder} from "@angular/forms";

export function editFormValidators(user: User | null, formBuilder: NonNullableFormBuilder) {

  return {
    ...formValidators(user),
    id: [user?.id],
    photo: [user?.photo],
    show: [user?.show],
    categories: [user?.categories?.map(category => category.id) || []],
    resume: formBuilder.group({
      id: [user?.resume?.id],
      educations: formBuilder.array(
        user?.resume?.educations?.map(education => formBuilder.group({
          id: [education.id],
          status: formBuilder.group({
            cod: [education?.status.cod],
            description: [education?.status.description],
          }),
          academicDegree: formBuilder.group({
            cod: [education?.academicDegree.cod],
            description: [education?.academicDegree.description],
          }),
          course: [education?.course],
          institution: [education?.institution],
          description: [education?.description],
        })) || []
      ),
      professionalExperiences: formBuilder.array(
        user?.resume?.professionalExperiences?.map(experience => formBuilder.group({
          id: [experience.id],
          position: [experience.position],
          company: [experience.company],
          description: [experience.description],
          startDate: [experience.startDate],
          endDate: [experience.endDate],
          isCurrent: [experience.isCurrent],
        })) || []
      )
    })
  };
}
