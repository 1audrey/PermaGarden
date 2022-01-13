import { ITask } from "src/app/task/models/itask-model";

export interface IPlantsList {
  name: string,
  startingMonths: string[],
  startingMethod: string;
  sowingPeriodInDays?: number,
  harvestingMonths: string[],
  harvestingPeriodInDays?: number,
  imageUrl: string,
}

