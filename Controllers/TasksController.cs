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
           PlantsInTasksRecord,
           PatchesImagesRecord,
           PatchesRecord,
           PlantsInPatchesRecord,
           TasksRecord,
           TasksInPatchesRecord,
           GardenArea,
           PatchShapeRecord> _permaGardenRepositery;

        public TasksController(IPermaGardenRepositery<PlantsImagesRecord,
            PlantsRecord,
            PlantsInTasksRecord,
            PatchesImagesRecord,
            PatchesRecord,
            PlantsInPatchesRecord,
            TasksRecord,
            TasksInPatchesRecord,
            GardenArea,
            PatchShapeRecord> permaGardenRepositery)
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
            if (task != null)
            {
                var newTask = new TasksRecord
                {
                    PlantId = task.PlantId,
                    PatchId = task.PatchId,
                    SeedsUsed = task.SeedsUsed,
                    CurrentTask = task.CurrentTask,
                    NextTask = task.NextTask,
                    StartingDate = task.StartingDate,
                    NextDate = task.NextDate,
                    TransplantDate = task.TransplantDate,
                    RealHarvestingDates = task.RealHarvestingDates,
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

                var tasksId = await _permaGardenRepositery.GetTasksId(token);
                var lastTaskId = tasksId.Last();

                var newTaskInPatch = new TasksInPatchesRecord { };

                newTaskInPatch.PatchName = taskInPatch.PatchName;
                newTaskInPatch.PatchId = taskInPatch.PatchId;
                newTaskInPatch.TaskId = lastTaskId;

                await _permaGardenRepositery.SaveTaskInPatch(newTaskInPatch, token);

                return Ok();
            }

            return BadRequest("Task in patch is invalid");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-plant-in-task")]
        public async Task<IActionResult> SavePlantInTask([FromBody] PlantsInTasksRecord plantInTask, CancellationToken token)
        {
            if (plantInTask != null)
            {
                var tasksId = await _permaGardenRepositery.GetTasksId(token);
                var lastTaskId = tasksId.Last();

                var newPlantInTask = new PlantsInTasksRecord { };

                newPlantInTask.PlantId = plantInTask.PlantId;
                newPlantInTask.TaskId = lastTaskId;

                await _permaGardenRepositery.SavePlantInTask(newPlantInTask, token);

                return Ok();
            }

            return BadRequest("Plant in task is invalid");
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-tasks")]
        public async Task<IActionResult> GetAllTasks(CancellationToken token)
        {
            var tasks = await _permaGardenRepositery
                .GetAllTasks(token);

            return Ok(tasks.ToList());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-task-failure-reasons")]
        public async Task<IActionResult> SaveFailedTaskReason([FromBody] TasksRecord updatedTask, CancellationToken token)
        {
            if (updatedTask != null)
            {
                var tasks = await _permaGardenRepositery
                .GetAllTasks(token);

                foreach (var task in tasks)
                {
                    if (task.TaskId == updatedTask.TaskId)
                    {
                        var editedTask = new TasksRecord
                        {
                            FailureReasons = updatedTask.FailureReasons,
                            TaskId = updatedTask.TaskId
                        };

                        await _permaGardenRepositery.SaveTaskFailureReasons(editedTask, token);
                    }
                }
                return Ok();

            }
            return BadRequest("Task is invalid");

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-task-in-archived-tasks")]
        public async Task<IActionResult> SaveTaskInArchivedTasks([FromBody] TasksRecord task, CancellationToken token)
        {
            if (task != null)
            {
                var newTask = new TasksRecord
                {
                    TaskId = task.TaskId,
                    PlantId = task.PlantId,
                    PatchId = task.PatchId,
                    SeedsUsed = task.SeedsUsed,
                    CurrentTask = task.CurrentTask,
                    NextTask = task.NextTask,
                    StartingDate = task.StartingDate,
                    NextDate = task.NextDate,
                    TransplantDate = task.TransplantDate,
                    RealHarvestingDates = task.RealHarvestingDates,
                    FailureReasons = task.FailureReasons,
                    HarvestedWeight = task.HarvestedWeight,
                    Productivity = task.Productivity

                };

                await _permaGardenRepositery.SaveTaskInArchivedTasks(newTask, token);

                return Ok();
            }

            return BadRequest("Task is invalid");
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("delete-task")]
        public async Task<IActionResult> DeleteTask(int taskId, CancellationToken token)
        {
            if (taskId != null)
            {
                await _permaGardenRepositery.DeleteTask(taskId, token);

                return Ok();
            }

            return BadRequest("TaskId is invalid");
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("delete-task-in-patch")]
        public async Task<IActionResult> DeleteTaskInPatches(int taskId, CancellationToken token)
        {
            if (taskId != null)
            {
                await _permaGardenRepositery.DeleteTaskInPatches(taskId, token);

                return Ok();
            }

            return BadRequest("TaskId is invalid");
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("delete-task-with-plant")]
        public async Task<IActionResult> DeleteTaskWithPlant(int taskId, CancellationToken token)
        {
            if (taskId != null)
            {
                await _permaGardenRepositery.DeleteTaskWithPlant(taskId, token);

                return Ok();
            }

            return BadRequest("TaskId is invalid");
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-transplanted-task")]
        public async Task<IActionResult> SaveTransplantedTask([FromBody] TasksRecord updatedTask, CancellationToken token)
        {
            if (updatedTask != null)
            {
                var tasks = await _permaGardenRepositery
                .GetAllTasks(token);

                foreach (var task in tasks)
                {
                    if (task.TaskId == updatedTask.TaskId)
                    {
                        var editedTask = new TasksRecord
                        {
                            CurrentTask = updatedTask.CurrentTask,
                            NextTask = updatedTask.NextTask,
                            TransplantDate = updatedTask.TransplantDate,
                            NextDate = updatedTask.NextDate,
                            TaskId = updatedTask.TaskId
                        };

                        await _permaGardenRepositery.SaveTransplantedTask(editedTask, token);
                    }
                }
                return Ok();

            }
            return BadRequest("Task is invalid");

        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("save-harvested-task")]
        public async Task<IActionResult> SaveHarvestedTask([FromBody] TasksRecord harvestedTask, CancellationToken token)
        {
            if (harvestedTask != null)
            {
                var tasks = await _permaGardenRepositery.GetAllTasks(token);

                foreach (var task in tasks)
                {
                    if (task.TaskId == harvestedTask.TaskId)
                    {
                        var editedTask = new TasksRecord
                        {
                            HarvestedWeight = harvestedTask.HarvestedWeight,
                            RealHarvestingDates = harvestedTask.RealHarvestingDates,
                            TaskId = harvestedTask.TaskId
                        };

                        await _permaGardenRepositery.SaveHarvestedTask(editedTask, token);
                    }
                }
                return Ok();

            }
            return BadRequest("Task is invalid");

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("all-archived-tasks")]
        public async Task<IActionResult> GetAllArchivedTasks(CancellationToken token)
        {
            var tasks = await _permaGardenRepositery
                .GetAllArchivedTasks(token);

            return Ok(tasks.ToList());
        }
    }
}


       