using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace perma_garden_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord, PlantsRecord> _plantsRepositery;

        public PlantsController(IPermaGardenRepositery<PlantsImagesRecord, PlantsRecord> plantsRepositery)
        {
            _plantsRepositery = plantsRepositery;
            
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-plants-images")]
        public async Task<IActionResult> GetPlantsImages(CancellationToken token)
        {
            var plantsImages = await _plantsRepositery
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
            var plantsImages = await _plantsRepositery
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

                await _plantsRepositery.SaveNewPlant(newPlant, token);

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
                await _plantsRepositery.DeletePlant(plantName, token);

                return Ok();
            }

            return BadRequest("Plant is invalid");
        }

    }
}
