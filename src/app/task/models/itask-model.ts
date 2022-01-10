import { IPlantsList } from "src/app/garden-list/models/iplants-model";

export interface ITask {
  patchName: string,
  plant: IPlantsList,
  action: string,
  startingDate: Date,
  nextTask: string,
  nextDate: Date,
  daysDifferenceBetweenTaskAndToday: number,
  realHarvestingDate?: Date,
  transplantDate?: Date,
  firstTaskSuccess?: boolean,
  failure?: string
  harvestingWeight?: number

 }
