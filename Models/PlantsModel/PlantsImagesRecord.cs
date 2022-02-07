using System;
using System.ComponentModel.DataAnnotations;

namespace perma_garden_app
{
    public class PlantsImagesRecord
    {
        [Key]
        public int PlantId { get; set; }

        public string PlantImageTitle { get; set; }

        public string PlantImagePicture { get; set; }

 
    }
}