using perma_garden_app.Models.TasksModel;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace perma_garden_app
{
    public class PatchesRecord
    {
        [Key]
        public int PatchId { get; set; }

        public string PatchName { get; set; }

        public string PatchImagePicture { get; set; }

        public List<PlantsRecord> PlantList { get; set; }

        public List<TasksRecord> TaskList { get; set; }

    }
}