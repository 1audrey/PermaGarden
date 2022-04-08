namespace perma_garden_app.Models.TasksModel
{
    public class PlantsInTasksRecord
    {
        public int TaskId { get; set; }

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
