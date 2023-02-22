using System.ComponentModel.DataAnnotations;

namespace perma_garden_app
{
    public class GardenArea
    {

        [Key]
        public int Id { get; set; }

        public int Length { get; set; }

        public int Width { get; set; }
    }
}
