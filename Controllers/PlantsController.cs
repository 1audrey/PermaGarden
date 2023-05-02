using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Http;
using perma_garden_app.Models.PatchesModel;
using perma_garden_app.Models.TasksModel;
using System;

namespace perma_garden_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord,
            PlantsRecord,
            PlantsInTasksRecord, 
            PatchesImagesRecord, 
            PatchesRecord, 
            PlantsInPatchesRecord, 
            TasksRecord, 
            TasksInPatchesRecord,
            GardenArea,
            PatchShapeRecord,
            UpdatedPatchRecord> _permaGardenRepositery;

        public PlantsController(IPermaGardenRepositery<PlantsImagesRecord,
            PlantsRecord,
            PlantsInTasksRecord, 
            PatchesImagesRecord, 
            PatchesRecord, 
            PlantsInPatchesRecord, 
            TasksRecord, 
            TasksInPatchesRecord,
            GardenArea,
            PatchShapeRecord,
            UpdatedPatchRecord> permaGardenRepositery)
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
            var plants = await _permaGardenRepositery
                .GetAllPlants(token);

            return Ok(plants.ToList());
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-archived-plants")]
        public async Task<IActionResult> GetAllArchivedPlants(CancellationToken token)
        {
            var archivedPlants = await _permaGardenRepositery
                .GetAllArchivedPlants(token);

            return Ok(archivedPlants.ToList());
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("{plantName}")]
        public async Task<IActionResult> GetPlantByPlantName([FromRoute] string plantName, CancellationToken token)
        {
            var plant = await _permaGardenRepositery
                .GetPlantByPlantName(plantName, token);

            var newPlant = plant.Select(x => new PlantsRecord()
            {
                PlantId = x.PlantId,
                PlantName = x.PlantName,
                PlantStartingMethod = x.PlantStartingMethod,
                PlantSowingPeriod = x.PlantSowingPeriod,
                PlantGrowingPeriod = x.PlantGrowingPeriod,
                PlantStartingMonths = x.PlantStartingMonths,
                PlantHarvestingMonths = x.PlantHarvestingMonths,
                PlantImagePicture = x.PlantImagePicture
            }).ToArray();

            return Ok(newPlant);
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
        public async Task<IActionResult> DeletePlant(string plantName, CancellationToken token)
        {
            if (plantName != null)
            {
                await _permaGardenRepositery.DeletePlant(plantName, token);

                return Ok();
            }

            return BadRequest("Plant is invalid");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("archive-plant")]
        public async Task<IActionResult> ArchivePlant(string plantName, CancellationToken token)
        {
            if (plantName != null)
            {
                var plant = await _permaGardenRepositery
                    .GetPlantByPlantName(plantName, token);

                var newPlant = plant.Select(x => new PlantsRecord()
                {
                    PlantId = x.PlantId,
                    PlantName = x.PlantName,
                    PlantStartingMethod = x.PlantStartingMethod,
                    PlantSowingPeriod = x.PlantSowingPeriod,
                    PlantGrowingPeriod = x.PlantGrowingPeriod,
                    PlantStartingMonths = x.PlantStartingMonths,
                    PlantHarvestingMonths = x.PlantHarvestingMonths,
                    PlantImagePicture = x.PlantImagePicture
                }).ToArray();

                await _permaGardenRepositery.SavePlantInArchive(newPlant[0], token);

                return Ok();
            }

            return BadRequest("Plant is invalid");
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("{plantId}")]
        public async Task<IActionResult> GetPatchByPatchName([FromRoute] int plantId, CancellationToken token)
        {
            var plant = await _permaGardenRepositery
                .GetPlantById(plantId, token);

            return Ok(plant.ToArray());

        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("update-plant")]
        public async Task<IActionResult> UpdatePlant([FromBody] PlantsRecord plant, CancellationToken token)
        {
            if (plant != null)
            {
                var plants = await _permaGardenRepositery
                    .GetAllPlants(token);

                foreach (var existingPlant in plants)
                {
                    if (existingPlant.PlantId == plant.PlantId) {
                            var editedPlant = new PlantsRecord
                            {
                                PlantId = plant.PlantId,
                                PlantName = plant.PlantName,
                                PlantStartingMethod = plant.PlantStartingMethod,
                                PlantSowingPeriod = plant.PlantSowingPeriod,
                                PlantGrowingPeriod = plant.PlantGrowingPeriod,
                                PlantStartingMonths = plant.PlantStartingMonths,
                                PlantHarvestingMonths = plant.PlantHarvestingMonths,
                                PlantImagePicture = plant.PlantImagePicture
                            };

                         await _permaGardenRepositery.UpdatePlant(editedPlant, token);
                    }
                }

                return Ok();
            }

            return BadRequest("Patch is invalid");
        }

    }
}
