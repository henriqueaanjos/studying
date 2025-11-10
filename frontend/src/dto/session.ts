import { registerGetDTO } from "./register";

export type sessionDTO = {
  contentTypeName: string;
  contentTypeId: string;
  disciplineName: string;
  disciplineColor: string;
  durationSeconds: number;
  id: string;
  lessonId: string;
  numberContent: number;
  numberLesson: number;
  stageName: string;
  Register: registerGetDTO[];
};
