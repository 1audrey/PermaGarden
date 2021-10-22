import { IPlantsList } from "src/app/garden-list/models/iplants-model";

export interface IPatch {
  name: string,
  shape: string,
  icon: string
  plantlist?: IPlantsList[];
 }
