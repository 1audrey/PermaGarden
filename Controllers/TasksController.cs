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
    public class TasksController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord,
           PlantsRecord,
           PatchesImagesRecord,
           PatchesRecord,
           PlantsInPatchesRecord,
           TasksRecord,
           TasksInPatchesRecord> _permaGardenRepositery;

        public TasksController(IPermaGardenRepositery<PlantsImagesRecord,
            PlantsRecord,
            PatchesImagesRecord,
            PatchesRecord,
            PlantsInPatchesRecord,
            TasksRecord,
            TasksInPatchesRecord> permaGardenRepositery)
        {
            _permaGardenRepositery = permaGardenRepositery;

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-task")]
        public async Task<IActionResult> SaveNewTask([FromBody] TasksRecord task, CancellationToken token)
        {
            ///need to fix issue with the date format, check if convert to string works in the controller and not the service
            if (task != null)
            {

                var newTask = new TasksRecord
                {
                    CurrentTask = task.CurrentTask,
                    NextTask = task.NextTask,
                    StartingDate = task.StartingDate,
                    NextDate = task.NextDate,
                    RealHarvestingDate = task.RealHarvestingDate,
                    DaysDifferenceBetweenTaskAndToday = task.DaysDifferenceBetweenTaskAndToday,
                    IsFirstTaskSuccess = task.IsFirstTaskSuccess,
                    FailureReasons = task.FailureReasons,
                    HarvestedWeight = task.HarvestedWeight,
                };

                await _permaGardenRepositery.SaveNewTask(newTask, token);

                return Ok();
            }

            return BadRequest("Task is invalid");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-task-in-patch")]
        public async Task<IActionResult> SaveTaskInPatch([FromBody] TasksInPatchesRecord taskInPatch, CancellationToken token)
        {
            if (taskInPatch != null)
            {
                
                var newTaskInPatch = new TasksInPatchesRecord { };

                var tasksId = await _permaGardenRepositery.GetTasksId(token);
                var lastTask = tasksId.Last();

                newTaskInPatch.TaskId = lastTask;
                newTaskInPatch.PatchName = taskInPatch.PatchName;
                newTaskInPatch.PatchId = taskInPatch.PatchId;

                await _permaGardenRepositery.SaveTaskInPatch(newTaskInPatch, token);
                              
                return Ok();
            }

            return BadRequest("Task in patch is invalid");
        }
    }
}


       