﻿using perma_garden_app.Models.PatchesModel;
using perma_garden_app.Models.TasksModel;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public interface IPermaGardenRepositery<TPlantsImages, TPlants, TPlantsInTasks, TPatchesShapes, TPatches, TPlantsInPatches, TTasks, TTasksInPatches>
    {
        public Task<IEnumerable<TPlantsImages>> GetAllPlantsImages(CancellationToken token);

        public Task<IEnumerable<TPlants>> GetAllPlants(CancellationToken token);

        public Task SaveNewPlant(PlantsRecord plant, CancellationToken token);

        public Task DeletePlant(string plantName, CancellationToken token);

        public Task<IEnumerable<TPatchesShapes>> GetAllPatchesImages(CancellationToken token);

        public Task<IEnumerable<TPatches>> GetPatchByPatchName(string patchName, CancellationToken token);

        public Task<IEnumerable<TPatches>> GetPatches(CancellationToken token);

        public Task<IEnumerable<TPlantsInPatches>> GetPlantsInPatches(CancellationToken token);

        public Task<IEnumerable<TTasksInPatches>> GetTasksInPatches(CancellationToken token);

        public Task SaveNewPatch(PatchesRecord patch, CancellationToken token);

        public Task SavePlantInPatch(PlantsInPatchesRecord plantInPatch, CancellationToken token);

        public Task EditPatch(PatchesRecord patch, CancellationToken token);

        public Task EditPatchNameInPlantsInPatches(PatchesRecord patch, CancellationToken token);

        public Task DeletePatch(string patchName, CancellationToken token);

        public Task DeletePatchOfPlantsInPatches(string patchName, CancellationToken token);

        public Task DeletePlantInPatch(int plantId, int patchId, CancellationToken token);

        public Task SaveNewTask(TasksRecord task, CancellationToken token);

        public Task SaveTaskInPatch(TasksInPatchesRecord plantInPatch, CancellationToken token);

        public Task<IEnumerable<int>> GetTasksId(CancellationToken token);

        public Task SavePlantInTask(PlantsInTasksRecord plantInTask, CancellationToken token);

        public Task<IEnumerable<TPlantsInTasks>> GetPlantsInTasks(CancellationToken token);

        public Task<IEnumerable<TTasks>> GetAllTasks(CancellationToken token);

        public Task SaveTaskFailureReasons(TasksRecord updatedTask, CancellationToken token);

        public Task SaveTaskInArchivedTasks(TasksRecord task, CancellationToken token);

        public Task DeleteTask(int taskId, CancellationToken token);

        public Task SaveTransplantedTask(TasksRecord updatedTask, CancellationToken token);

        public Task SaveHarvestedTask(TasksRecord updatedTask, CancellationToken token);
        
    }
}