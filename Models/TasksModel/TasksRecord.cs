using System;
using System.Collections.Generic;

namespace perma_garden_app.Models.TasksModel
{
    public class TasksRecord
    {
        public int TaskId { get; set; }

        public string CurrentTask { get; set; }

        public string NextTask { get; set; }

        public PlantsRecord Plant { get; set; }

        public string StartingDate { get; set; }

        public string NextDate { get; set; }

        public string TransplantDate { get; set; }

        public string RealHarvestingDates { get; set; }

        public string FailureReasons { get; set; }

        public string HarvestedWeight { get; set; }

    }
}
