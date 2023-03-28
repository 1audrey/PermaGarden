import { IPlantsList } from "src/app/garden-list/models/iplants-model";
import { ITask } from "src/app/task/models/itask-model";

export interface IPatchShapeModel{
  patchId?: number
  patchName: string;
  shape: string;
  patchImagePicture: string;
  xPosition: number;
  yPosition: number;
  diameter?: number;
  width?: number;
  length?: number;
  rotationAngle: number
  plantList?: IPlantsList[];
  taskList?: ITask[];
}
