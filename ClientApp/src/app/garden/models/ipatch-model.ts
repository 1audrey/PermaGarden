import { IPlantsList } from "src/app/garden-list/models/iplants-model";
import { ITask } from "src/app/task/models/itask-model";

export interface IPatch {
  patchId: number
  patchName: string;
  patchImagePicture: string;
  plantList?: IPlantsList[];
  taskList?: ITask[];
 }
