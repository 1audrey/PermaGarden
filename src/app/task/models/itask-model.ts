import { IPlantsList } from "src/app/garden-list/models/iplants-model";

export interface ITask {
  name: string,
  plant: IPlantsList,
  action: string,
  startingDate: Date,
  nextTask: string,
  nextDate: Date,
 }
