using System;
using System.ComponentModel.DataAnnotations;

namespace perma_garden_app
{
    public class PatchesImagesRecord
    {
        [Key]
        public int PatchImageId { get; set; }

        public string PatchImageTitle { get; set; }

        public string PatchImagePicture { get; set; }


    }
}