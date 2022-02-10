using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace perma_garden_app.Models.PatchesModel
{
    public class PlantsInPatchesRecord
    {
        [Key]
        public int PatchId { get; set; }

        public int PlantId { get; set; }

        public string PatchName { get; set; }

        public string PatchImagePicture { get; set; }

        public string PlantName { get; set; }

        public string PlantStartingMethod { get; set; }

        public int PlantSowingPeriod { get; set; }

        public int PlantGrowingPeriod { get; set; }

        public string PlantStartingMonths { get; set; }

        public string PlantHarvestingMonths { get; set; }

        public string PlantImagePicture { get; set; }

    }
}
