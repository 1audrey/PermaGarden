import { IPlantsList } from "src/app/garden-list/models/iplants-model";

export interface ITask {
  taskId: number,
  plant: IPlantsList,
  currentTask: string,
  startingDate: string,
  nextTask: string,
  nextDate: string,
  daysDifferenceBetweenTaskAndToday: number,
  transplantDate?: string,
  realHarvestingDates?: string,
  harvestedWeight?: string,
  failureReasons?: string
 }
