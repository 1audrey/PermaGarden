﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public interface IPermaGardenRepositery<TPlantsImages, TPlants>
    {
        public Task<IEnumerable<TPlantsImages>> GetAllPlantsImages(CancellationToken token);

        public Task<IEnumerable<TPlants>> GetAllPlants(CancellationToken token);
    }
}