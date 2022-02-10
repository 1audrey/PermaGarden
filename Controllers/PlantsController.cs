using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using perma_garden_app.Models.PatchesModel;
using perma_garden_app.Models.TasksModel;

namespace perma_garden_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord, 
            PlantsRecord, 
            PatchesImagesRecord, 
            PatchesRecord, 
            PlantsInPatchesRecord, 
            TasksRecord, 
            TasksInPatchesRecord> _permaGardenRepositery;

        public PlantsController(IPermaGardenRepositery<PlantsImagesRecord, 
            PlantsRecord, 
            PatchesImagesRecord, 
            PatchesRecord, 
            PlantsInPatchesRecord, 
            TasksRecord, 
            TasksInPatchesRecord> permaGardenRepositery)
        {
            _permaGardenRepositery = permaGardenRepositery;
            
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-plants-images")]
        public async Task<IActionResult> GetPlantsImages(CancellationToken token)
        {
            var plantsImages = await _permaGardenRepositery
                .GetAllPlantsImages(token);

            return Ok(plantsImages.ToList());
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-plants")]
        public async Task<IActionResult> GetAllPlants(CancellationToken token)
        {
            var plantsImages = await _permaGardenRepositery
                .GetAllPlants(token);

            return Ok(plantsImages.ToList());
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-plant")]
        public async Task<IActionResult> SaveNewPlant([FromBody] PlantsRecord plant, CancellationToken token)
        {
                if (plant != null)
                {

                var newPlant = new PlantsRecord
                {
                    PlantName = plant.PlantName,
                    PlantStartingMethod = plant.PlantStartingMethod,
                    PlantSowingPeriod = plant.PlantSowingPeriod,
                    PlantGrowingPeriod = plant.PlantGrowingPeriod,
                    PlantStartingMonths = plant.PlantStartingMonths,
                    PlantHarvestingMonths = plant.PlantHarvestingMonths,
                    PlantImagePicture = plant.PlantImagePicture  
                };

                await _permaGardenRepositery.SaveNewPlant(newPlant, token);

                    return Ok();
                }

                return BadRequest("Plant is invalid");
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("delete-plant")]
        public async Task<IActionResult> DeletePlant( string plantName, CancellationToken token)
        {
            if (plantName != null)
            {
                await _permaGardenRepositery.DeletePlant(plantName, token);

                return Ok();
            }

            return BadRequest("Plant is invalid");
        }

    }
}
