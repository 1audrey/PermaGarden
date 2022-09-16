export interface ITask {
  taskId: number,
  plantId: number,
  patchId: number,
  seedsUsed: number,
  currentTask: string,
  startingDate: string,
  nextTask: string,
  nextDate: string,
  daysDifferenceBetweenTaskAndToday: number,
  transplantDate?: string,
  realHarvestingDates?: string,
  harvestedWeight?: string,
  failureReasons?: string,
  productivity: number
 }
