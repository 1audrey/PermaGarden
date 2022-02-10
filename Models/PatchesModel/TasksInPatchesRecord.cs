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

        public string CurrentTaskName { get; set; }

        public string NextTaskName { get; set; }

        public PlantsRecord Plant { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime NextDate { get; set; }

        public DateTime TransplantDate { get; set; }

        public List<string> RealHarvestingDate { get; set; }

        public int DaysDifferenceBetweenTaskAndToday { get; set; }

        public bool IsFirstTaskSuccess { get; set; }

        public string FailureReason { get; set; }

        public int[] HarvestedWeight { get; set; }


    }
}
