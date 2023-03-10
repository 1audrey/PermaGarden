using perma_garden_app.Models.TasksModel;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace perma_garden_app.Models.PatchesModel
{
    public class PatchShapeRecord
    {
        [Key]
        public int PatchId { get; set; }

        public string PatchName { get; set; }

        public string Shape { get; set; }

        public string PatchImagePicture { get; set; }

        public int xPosition { get; set; }

        public int yPosition { get; set; }

        public int Diameter { get; set; }

        public int Width { get; set; }

        public int Length { get; set; }

        public List<PlantsRecord> PlantList { get; set; }

        public List<TasksRecord> TaskList { get; set; }

    }
}
