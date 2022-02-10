using System;
using System.Collections.Generic;

namespace perma_garden_app.Models.TasksModel
{
    public class TasksRecord
    {
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
