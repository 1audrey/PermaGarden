import { IPlantsList } from "src/app/garden-list/models/iplants-model";
import { IPlantInPatch } from "./iplantinpatch-model";

export interface ITaskInPatch {
  patchId: number;
  patchName: string;
  taskId: number;
}
