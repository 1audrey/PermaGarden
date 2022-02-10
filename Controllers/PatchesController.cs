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
            PatchesImagesRecord, 
            PatchesRecord, 
            PlantsInPatchesRecord,
            TasksRecord,
            TasksInPatchesRecord> _permaGardenRepositery;

        public PatchesController(IPermaGardenRepositery<PlantsImagesRecord, 
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
        [Route("all-patches")]
        public async Task<IActionResult> GetPatches(CancellationToken token)
        {
            var patches = await _permaGardenRepositery
                .GetPatches(token);

            var patchesWithPlants = await _permaGardenRepositery
                .GetPlantsInPatches(token);

            var patchesWithTasks = await _permaGardenRepositery
                .GetTasksInPatches(token);

            var singlePatches = patches.GroupBy(z => z.PatchId).Select(x => x.First()).ToList();

            var newPatches = singlePatches.Select(x => new PatchesRecord()
            {
                PatchId = x.PatchId,
                PatchName = x.PatchName,
                PatchImagePicture = x.PatchImagePicture,
                PlantList = GetPlantList(patchesWithPlants, x.PatchId),
                TaskList = GetTaskList(patchesWithTasks, x.PatchId)

        }).ToArray();          

            return Ok(newPatches);
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


        private List<TasksRecord> GetTaskList(IEnumerable<TasksInPatchesRecord> patchesWithTasks, int patchId)
        {
            var taskList = new List<TasksRecord>();

            foreach (var patch in patchesWithTasks)
            {
                if (patch.PatchId == patchId)
                {
                    var task = new TasksRecord
                    {
                        TaskId = patch.TaskId,
                        CurrentTaskName = patch.CurrentTaskName,
                        NextTaskName = patch.NextTaskName,
                        Plant = patch.Plant,
                        StartingDate = patch.StartingDate,
                        NextDate = patch.NextDate,
                        TransplantDate = patch.TransplantDate,
                        RealHarvestingDate = patch.RealHarvestingDate,
                        DaysDifferenceBetweenTaskAndToday = patch.DaysDifferenceBetweenTaskAndToday,
                        IsFirstTaskSuccess = patch.IsFirstTaskSuccess,
                        FailureReason = patch.FailureReason,
                        HarvestedWeight = patch.HarvestedWeight
                    };
                    taskList.Add(task);
                }
            }
            return taskList;
        }
    }
}
