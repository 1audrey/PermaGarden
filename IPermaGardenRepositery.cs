using perma_garden_app.Models.PatchesModel;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public interface IPermaGardenRepositery<TPlantsImages, TPlants, TPatchesShapes, TPatches, TPlantsInPatches, TTasks, TTasksInPatches>
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

    }
}