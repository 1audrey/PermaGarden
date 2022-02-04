using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public interface IPermaGardenRepositery<TPlantsImages, TPlants>
    {
        public Task<IEnumerable<TPlantsImages>> GetAllPlantsImages(CancellationToken token);

        public Task<IEnumerable<TPlants>> GetAllPlants(CancellationToken token);

        public Task SaveNewPlant(PlantsRecord plant, CancellationToken token);

        public Task DeletePlant(string plantName, CancellationToken token);
    }
}