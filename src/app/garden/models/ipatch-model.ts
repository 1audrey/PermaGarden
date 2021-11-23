import { IPlantsList } from "src/app/garden-list/models/iplants-model";
import { ITask } from "src/app/task/models/itask-model";

export interface IPatch {
  name: string,
  icon: string
  plantlist?: IPlantsList[];
  tasklist?: ITask[];
 }
