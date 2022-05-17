using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace perma_garden_app.Models.PatchesModel
{
    public class TasksInPatchesRecord
    {
        [Key]
        public int PatchId { get; set; }

        public string PatchName { get; set; }

        public string PatchImagePicture { get; set; }

        public int TaskId { get; set; }

        public string CurrentTask { get; set; }

        public string NextTask { get; set; }

        public PlantsRecord Plant { get; set; }

        public string StartingDate { get; set; }

        public string NextDate { get; set; }

        public string TransplantDate { get; set; }

        public string RealHarvestingDate { get; set; }

        public bool IsFirstTaskSuccess { get; set; }

        public string FailureReasons { get; set; }

        public int HarvestedWeight { get; set; }


    }
}
