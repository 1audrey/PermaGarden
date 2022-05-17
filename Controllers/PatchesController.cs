using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using perma_garden_app.Models.PatchesModel;
using perma_garden_app.Models.TasksModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatchesController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord,
            PlantsRecord,
            PlantsInTasksRecord, 
            PatchesImagesRecord, 
            PatchesRecord, 
            PlantsInPatchesRecord,
            TasksRecord,
            TasksInPatchesRecord> _permaGardenRepositery;

        public PatchesController(IPermaGardenRepositery<PlantsImagesRecord,
            PlantsRecord,
            PlantsInTasksRecord, 
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
        [Route("all-patches-shapes")]
        public async Task<IActionResult> GetPatchesShapes(CancellationToken token)
        {
            var patchesShapes = await _permaGardenRepositery
                .GetAllPatchesImages(token);

            return Ok(patchesShapes.ToList());
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("{patchName}")]
        public async Task<IActionResult> GetPatchByPatchName([FromRoute] string patchName, CancellationToken token)
        {
            var patch = await _permaGardenRepositery
                .GetPatchByPatchName(patchName, token);

            var patchesWithPlants = await _permaGardenRepositery
                .GetPlantsInPatches(token);

            var patchesWithTasks = await _permaGardenRepositery
                .GetTasksInPatches(token);

            var plantInTask = await _permaGardenRepositery
                .GetPlantsInTasks(token);

            var newPatch = patch.Select(x => new PatchesRecord()
            {
                PatchId = x.PatchId,
                PatchName = x.PatchName,
                PatchImagePicture = x.PatchImagePicture,
                PlantList = GetPlantList(patchesWithPlants, x.PatchId),
                TaskList = GetTaskList(patchesWithTasks, x.PatchId, plantInTask)
            }).ToArray();

            return Ok(newPatch);

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-patches")]
        public async Task<IActionResult> GetPatches(CancellationToken token)
        {
            var patches = await _permaGardenRepositery
                .GetPatches(token);

            var patchesWithPlants = await _permaGardenRepositery
                .GetPlantsInPatches(token);

            var patchesWithTasks = await _permaGardenRepositery
                .GetTasksInPatches(token);

            var plantInTask = await _permaGardenRepositery
                .GetPlantsInTasks(token); 

            var singlePatches = patches.GroupBy(z => z.PatchId).Select(x => x.First()).ToList();

            var newPatches = singlePatches.Select(x => new PatchesRecord()
            {
                PatchId = x.PatchId,
                PatchName = x.PatchName,
                PatchImagePicture = x.PatchImagePicture,
                PlantList = GetPlantList(patchesWithPlants, x.PatchId),
                TaskList = GetTaskList(patchesWithTasks, x.PatchId, plantInTask)

        }).ToArray();          

            return Ok(newPatches);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-patch")]
        public async Task<IActionResult> SaveNewPatch([FromBody] PatchesRecord patch, CancellationToken token)
        {
            if (patch != null)
            {

                var newPatch = new PatchesRecord
                {
                    PatchName = patch.PatchName,
                    PatchImagePicture = patch.PatchImagePicture,
                };

                await _permaGardenRepositery.SaveNewPatch(newPatch, token);          

                return Ok();
            }

            return BadRequest("Patch is invalid");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-plant-in-patch")]
        public async Task<IActionResult> SavePlantInPatch([FromBody] PlantsInPatchesRecord plantInPatch, CancellationToken token)
        {
            if (plantInPatch != null)
            {
                var newPlantInPatch = new PlantsInPatchesRecord { };

                newPlantInPatch.PlantId = plantInPatch.PlantId;
                newPlantInPatch.PatchName = plantInPatch.PatchName;
                newPlantInPatch.PatchId = plantInPatch.PatchId;

                await _permaGardenRepositery.SavePlantInPatch(newPlantInPatch, token);
                
                return Ok();
            }

            return BadRequest("Patch is invalid");
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("delete-plant-in-patch")]
        public async Task<IActionResult> DeletePlantInPatch(int plantId, int patchId, CancellationToken token)
        {
            if (plantId != 0 && patchId != 0)
            {
                await _permaGardenRepositery.DeletePlantInPatch(plantId, patchId, token);
                return Ok();
            }

            return BadRequest("PatchName is invalid");
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("edit-patch")]
        public async Task<IActionResult> EditPatch([FromBody] PatchesRecord patch, CancellationToken token)
        {
            if (patch != null)
            {
                var patches = await _permaGardenRepositery
                    .GetPatches(token);

                foreach (var existingPatch in patches)
                {
                    if (existingPatch.PatchId == patch.PatchId)
                    {
                        if (IsNameOrPictureUpdated(existingPatch, patch))
                        {
                            var editedPatch = new PatchesRecord
                            {
                                PatchId = patch.PatchId,
                                PatchName = patch.PatchName,
                                PatchImagePicture = patch.PatchImagePicture,
                            };

                            await _permaGardenRepositery.EditPatch(editedPatch, token);
                            await _permaGardenRepositery.EditPatchNameInPlantsInPatches(editedPatch, token);
                        }
                    }
                }

                return Ok();
            }

            return BadRequest("Patch is invalid");
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("delete-patch")]
        public async Task<IActionResult> DeletePatch(string patchName, CancellationToken token)
        {
            if (patchName != null)
            {
                await _permaGardenRepositery.DeletePatch(patchName, token);
                await _permaGardenRepositery.DeletePatchOfPlantsInPatches(patchName, token);

                return Ok();
            }

            return BadRequest("PatchName is invalid");
        }

        private List<PlantsRecord> GetPlantList(IEnumerable<PlantsInPatchesRecord> patchesWithPlants, int patchId)
        {
            var plantList = new List<PlantsRecord>();

            foreach (var patch in patchesWithPlants)
            {
                if (patch.PatchId == patchId)
                {
                    var plant = new PlantsRecord
                    {
                        PlantId = patch.PlantId,
                        PlantName = patch.PlantName,
                        PlantStartingMethod = patch.PlantStartingMethod,
                        PlantSowingPeriod = patch.PlantSowingPeriod,
                        PlantStartingMonths = patch.PlantStartingMonths,
                        PlantGrowingPeriod = patch.PlantGrowingPeriod,
                        PlantHarvestingMonths = patch.PlantHarvestingMonths,
                        PlantImagePicture = patch.PlantImagePicture
                    };
                    plantList.Add(plant);
                }
            }
            return plantList;
        }

        private List<TasksRecord> GetTaskList(IEnumerable<TasksInPatchesRecord> patchesWithTasks, int patchId, IEnumerable<PlantsInTasksRecord> plantInTask)
        {
            var taskList = new List<TasksRecord>();

            foreach (var patch in patchesWithTasks)
            {
                if (patch.PatchId == patchId)
                {
                    var task = new TasksRecord
                    {
                        TaskId = patch.TaskId,
                        CurrentTask = patch.CurrentTask,
                        NextTask = patch.NextTask,
                        StartingDate = patch.StartingDate,
                        NextDate = patch.NextDate,
                        TransplantDate = patch.TransplantDate,
                        Plant = GetPlantInTask(plantInTask, patch.TaskId),
                        RealHarvestingDate = patch.RealHarvestingDate,
                        IsFirstTaskSuccess = patch.IsFirstTaskSuccess,
                        FailureReasons = patch.FailureReasons,
                        HarvestedWeight = patch.HarvestedWeight
                    };
                    taskList.Add(task);
                }
            }
            return taskList;
        }

        private PlantsRecord GetPlantInTask(IEnumerable<PlantsInTasksRecord> plantInTask, int taskId)
        {
            var matchingPlant= new PlantsRecord() { };

            foreach (var plant in plantInTask)
            {
                if (plant.TaskId == taskId)
                {
                        matchingPlant.PlantId = plant.PlantId;
                        matchingPlant.PlantName = plant.PlantName;
                        matchingPlant.PlantStartingMethod = plant.PlantStartingMethod;
                        matchingPlant.PlantSowingPeriod = plant.PlantSowingPeriod;
                        matchingPlant.PlantStartingMonths = plant.PlantStartingMonths;
                        matchingPlant.PlantGrowingPeriod = plant.PlantGrowingPeriod;
                        matchingPlant.PlantHarvestingMonths = plant.PlantHarvestingMonths;
                        matchingPlant.PlantImagePicture = plant.PlantImagePicture;
                }
            }
            return matchingPlant;

        }

        private static bool IsNameOrPictureUpdated(PatchesRecord existingPatch, PatchesRecord patch)
        {
            if (existingPatch.PatchName != patch.PatchName || existingPatch.PatchImagePicture != patch.PatchImagePicture)
            {
                return true;
            }
            return false;
        }
    }
}
