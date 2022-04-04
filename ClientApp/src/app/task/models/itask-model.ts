import { IPlantsList } from "src/app/garden-list/models/iplants-model";

export interface ITask {
  taskId: number,
  patchName: string,
  plant: IPlantsList,
  currentTask: string,
  startingDate: string,
  nextTask: string,
  nextDate: string,
  daysDifferenceBetweenTaskAndToday: number,
  realHarvestingDate?: string[],
  firstTaskSuccess?: boolean,
  failure?: string
  harvestingWeight?: number[]
 }
