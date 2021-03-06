using Dapper;
using perma_garden_app.Models.PatchesModel;
using perma_garden_app.Models.TasksModel;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public class SqlPermaGarden : IPermaGardenRepositery<PlantsImagesRecord,
        PlantsRecord,
        PlantsInTasksRecord, 
        PatchesImagesRecord,
        PatchesRecord,
        PlantsInPatchesRecord, 
        TasksRecord, 
        TasksInPatchesRecord>
    {
        public SqlPermaGarden(string connectionString)
        {
            SqlConnection = new SqlConnection(connectionString);
        }
        private SqlConnection SqlConnection { get; }

        public async Task<IEnumerable<PlantsImagesRecord>> GetAllPlantsImages(CancellationToken token)
        {
            var command = @"SELECT
                                plantImage.PlantId
                                , plantImage.PlantImageTitle
                                , plantImage.PlantImagePicture
                            FROM
                                dbo.PlantsImages plantImage";


            return await SqlConnection.QueryAsync<PlantsImagesRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task<IEnumerable<PlantsRecord>> GetAllPlants(CancellationToken token)
        {
            var command = @"SELECT
                                plant.PlantId
                                , plant.PlantName
                                , plant.PlantStartingMethod
                                , plant.PlantSowingPeriod
                                , plant.PlantGrowingPeriod
                                , plant.PlantStartingMonths
                                , plant.PlantHarvestingMonths
                                , plantsImages.PlantImagePicture
                
                            FROM
                                dbo.Plants plant

                            INNER JOIN
                                dbo.PlantsImages plantsImages

                            ON
                                plant.PlantImagePicture = plantsImages.PlantImagePicture";


            return await SqlConnection.QueryAsync<PlantsRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task SaveNewPlant(PlantsRecord plant, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.Plants (
                                PlantName
                                , PlantStartingMethod
                                , PlantSowingPeriod
                                , PlantGrowingPeriod
                                , PlantStartingMonths
                                , PlantHarvestingMonths
                                , PlantImagePicture)

                            VALUES (
                                @PlantName
                                , @PlantStartingMethod
                                , @PlantSowingPeriod
                                , @PlantGrowingPeriod
                                , @PlantStartingMonths
                                , @PlantHarvestingMonths
                                , @PlantImagePicture)";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { plant.PlantName, plant.PlantStartingMethod, plant.PlantSowingPeriod, plant.PlantGrowingPeriod, plant.PlantStartingMonths, plant.PlantHarvestingMonths, plant.PlantImagePicture },
                    cancellationToken: token));
        }

        public async Task DeletePlant(string plantName, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.Plants
                            WHERE 
                            PlantName = @PlantName";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { PlantName = plantName },
                    cancellationToken: token));
        }

        public async Task<IEnumerable<PatchesImagesRecord>> GetAllPatchesImages(CancellationToken token)
        {
            var command = @"SELECT
                                patchImage.PatchImageId
                                , patchImage.PatchImageTitle
                                , patchImage.PatchImagePicture
                            FROM
                                dbo.PatchesImages patchImage";


            return await SqlConnection.QueryAsync<PatchesImagesRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task<IEnumerable<PatchesRecord>> GetPatchByPatchName(string patchName, CancellationToken token)
        {
            var command = @"SELECT
                                patch.PatchId
                                , patch.PatchName
                                , patch.PatchImagePicture
                            FROM
                                dbo.Patches patch

                            WHERE
                                patch.PatchName = @patchName ";

            return await SqlConnection.QueryAsync<PatchesRecord>(new CommandDefinition(command, new { patchName },
                cancellationToken: token));
        }

        public async Task<IEnumerable<PatchesRecord>> GetPatches(CancellationToken token)
        {
            var command = @"SELECT
                                patch.PatchId
                                , patch.PatchName
                                , patch.PatchImagePicture
                            FROM
                                dbo.Patches patch";


            return await SqlConnection.QueryAsync<PatchesRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task<IEnumerable<PlantsInPatchesRecord>> GetPlantsInPatches(CancellationToken token)
        {

            var command = @"SELECT
                                patch.PatchId
                                , patch.PatchName
                                , patch.PatchImagePicture
                                , plant.PlantId
                                , plant.PlantName
                                , plant.PlantGrowingPeriod
                                , plant.PlantHarvestingMonths
                                , plant.PlantImagePicture
                                , plant.PlantSowingPeriod
                                , plant.PlantStartingMethod
                                , plant.PlantStartingMonths
                                , plantsInPatches.PatchName
                                , plantsInPatches.PlantId

                            FROM
                                dbo.PlantsInPatches plantsInPatches

                            JOIN
                                dbo.Patches patch
                            ON
                                patch.PatchName = plantsInPatches.PatchName 

                            JOIN
                                dbo.Plants plant
                            ON
                                plant.PlantId = plantsInPatches.PlantId";

            return await SqlConnection.QueryAsync<PlantsInPatchesRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task<IEnumerable<TasksInPatchesRecord>> GetTasksInPatches(CancellationToken token)
        {

            var command = @"SELECT
                                patch.PatchId
                                , patch.PatchName
                                , patch.PatchImagePicture
                                , task.TaskId
                                , task.CurrentTask
                                , task.NextTask
                                , task.StartingDate
                                , task.NextDate
                                , task.TransplantDate
                                , task.FailureReasons
                                , tasksInPatches.PatchId
                                , tasksInPatches.TaskId
                
                            FROM
                                dbo.TasksInPatches tasksInPatches

                            JOIN
                                dbo.Patches patch
                            ON
                                patch.PatchId = tasksInPatches.PatchId 

                            JOIN
                                dbo.Tasks task
                            ON
                                task.TaskId = tasksInPatches.TaskId";

            return await SqlConnection.QueryAsync<TasksInPatchesRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task SaveNewPatch(PatchesRecord patch, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.Patches (
                                PatchName
                                , PatchImagePicture )

                            VALUES (
                                @PatchName
                                , @PatchImagePicture)";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { patch.PatchName, patch.PatchImagePicture},
                    cancellationToken: token));
        }

        public async Task SavePlantInPatch(PlantsInPatchesRecord plantInPatch, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.PlantsInPatches (
                                PatchName
                                , PlantId
                                , PatchId)

                            VALUES (
                                 @PatchName
                                , @PlantId
                                , @PatchId)";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { plantInPatch.PatchName, plantInPatch.PlantId, plantInPatch.PatchId},
                    cancellationToken: token));
        }

        public async Task EditPatch(PatchesRecord patch, CancellationToken token)
        {
            var command = @"UPDATE dbo.Patches

                            SET 
                                PatchName = @PatchName
                                , PatchImagePicture = @PatchImagePicture

                            WHERE 
                                PatchId = @PatchId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { patch.PatchId, patch.PatchName, patch.PatchImagePicture },
                    cancellationToken: token));
        }
        public async Task EditPatchNameInPlantsInPatches(PatchesRecord patch, CancellationToken token)
        {
            var command = @"UPDATE dbo.PlantsInPatches

                            SET 
                                PatchName = @PatchName

                            WHERE 
                                PatchId = @PatchId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { patch.PatchId, patch.PatchName },
                    cancellationToken: token));
        }

        public async Task DeletePatch(string patchName, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.Patches
                            WHERE 
                            PatchName = @PatchName";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { PatchName = patchName },
                    cancellationToken: token));
        }

        public async Task DeletePatchOfPlantsInPatches(string patchName, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.PlantsInPatches
                            WHERE 
                            PatchName = @PatchName";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { PatchName = patchName },
                    cancellationToken: token));
        }

        public async Task DeletePlantInPatch(int plantId, int patchId, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.PlantsInPatches 
                            WHERE 
                            PlantId = @PlantId AND
                            PatchId = @PatchId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { PlantId = plantId, PatchId = patchId },
                    cancellationToken: token));
        }

        public async Task SaveNewTask(TasksRecord task, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.Tasks (
                                CurrentTask
                                , NextTask
                                , StartingDate
                                , NextDate
                                , TransplantDate
                                , RealHarvestingDates
                                , FailureReasons
                                , HarvestedWeight
                                )

                            VALUES (
                                @CurrentTask
                                , @NextTask
                                , @StartingDate
                                , @NextDate
                                , @TransplantDate
                                , @RealHarvestingDates
                                , @FailureReasons
                                , @HarvestedWeight
                                );
                                Select @@IDENTITY as TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { task.CurrentTask, task.NextTask, task.StartingDate, task.NextDate, task.TransplantDate, task.RealHarvestingDates,
                        task.FailureReasons, task.HarvestedWeight},
                    cancellationToken: token));

        }

        public async Task SaveTaskInPatch(TasksInPatchesRecord taskInPatch, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.TasksInPatches (
                                PatchName
                                , TaskId
                                , PatchId)

                            VALUES (
                                 @PatchName
                                , @TaskId
                                , @PatchId)";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { taskInPatch.PatchName, taskInPatch.TaskId, taskInPatch.PatchId },
                    cancellationToken: token));
        }

        public async Task<IEnumerable<int>> GetTasksId(CancellationToken token)
        {
            var command = @"SELECT
                                task.TaskId
                            FROM
                                dbo.Tasks task";

            return await SqlConnection.QueryAsync<int>(new CommandDefinition(command,
                    cancellationToken: token));
        }

        public async Task SavePlantInTask(PlantsInTasksRecord plantInTask, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.PlantsInTasks (
                                PlantId
                                , TaskId)

                            VALUES (
                                @PlantId
                                , @TaskId)";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { plantInTask.PlantId, plantInTask.TaskId },
                    cancellationToken: token));
        }

        public async Task<IEnumerable<PlantsInTasksRecord>> GetPlantsInTasks(CancellationToken token)
        {
            var command = @"SELECT
                                plantInTask.TaskId
                                , plantInTask.PlantId
                                , plant.PlantId
                                , plant.PlantName
                                , plant.PlantGrowingPeriod
                                , plant.PlantHarvestingMonths
                                , plant.PlantImagePicture
                                , plant.PlantSowingPeriod
                                , plant.PlantStartingMethod
                                , plant.PlantStartingMonths
                
                            FROM
                                dbo.PlantsInTasks plantInTask

                            JOIN
                                dbo.Plants plant
                            ON
                                plantInTask.PlantId = plant.PlantId";

            return await SqlConnection.QueryAsync<PlantsInTasksRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task<IEnumerable<TasksRecord>> GetAllTasks(CancellationToken token)
        {
            var command = @"SELECT
                                task.TaskId
                                , task.CurrentTask
                                , task.NextTask
                                , task.StartingDate
                                , task.NextDate
                                , task.TransplantDate
                                , task.RealHarvestingDates
                                , task.FailureReasons
                                , task.HarvestedWeight
                                                
                            FROM
                                dbo.Tasks task";


            return await SqlConnection.QueryAsync<TasksRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

        public async Task SaveTaskFailureReasons(TasksRecord updatedTask, CancellationToken token)
        {
            var command = @"UPDATE dbo.Tasks

                            SET 
                                FailureReasons = @FailureReasons

                            WHERE 
                                TaskId = @TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { updatedTask.TaskId, updatedTask.FailureReasons },
                    cancellationToken: token));
        }

        public async Task SaveTaskInArchivedTasks(TasksRecord task, CancellationToken token)
        {
            var command = @"INSERT INTO dbo.ArchivedTasks (
                                TaskId
                                , CurrentTask
                                , NextTask
                                , StartingDate
                                , NextDate
                                , TransplantDate
                                , RealHarvestingDates
                                , FailureReasons
                                , HarvestedWeight
                                )

                            VALUES (
                                @TaskId
                                , @CurrentTask
                                , @NextTask
                                , @StartingDate
                                , @NextDate
                                , @TransplantDate
                                , @RealHarvestingDates
                                , @FailureReasons
                                , @HarvestedWeight
                                );";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new
                    {   task.TaskId, task.CurrentTask, task.NextTask, task.StartingDate, task.NextDate, task.TransplantDate, task.RealHarvestingDates, 
                        task.FailureReasons, task.HarvestedWeight
                    },
                    cancellationToken: token));

        }

        public async Task DeleteTask(int taskId, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.Tasks
                            WHERE 
                            TaskId = @TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { TaskId = taskId },
                    cancellationToken: token));
        }

        public async Task SaveTransplantedTask(TasksRecord updatedTask, CancellationToken token)
        {
            var command = @"UPDATE dbo.Tasks

                            SET 
                                TransplantDate = @TransplantDate,
                                CurrentTask = @CurrentTask,
                                NextTask = @NextTask,
                                NextDate = @NextDate

                            WHERE 
                                TaskId = @TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { updatedTask.TaskId, updatedTask.TransplantDate, updatedTask.CurrentTask, updatedTask.NextTask, updatedTask.NextDate },
                    cancellationToken: token));
        }

        public async Task SaveHarvestedTask(TasksRecord updatedTask, CancellationToken token)
        {
            var command = @"UPDATE dbo.Tasks

                            SET 
                                RealHarvestingDates = @RealHarvestingDates,
                                HarvestedWeight = @HarvestedWeight

                            WHERE 
                                TaskId = @TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { updatedTask.TaskId, updatedTask.RealHarvestingDates, updatedTask.HarvestedWeight },
                    cancellationToken: token));
        }

        public async Task DeleteTaskInPatches(int taskId, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.TasksInPatches
                            WHERE 
                            TaskId = @TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { TaskId = taskId },
                    cancellationToken: token));
        }

        public async Task DeleteTaskWithPlant(int taskId, CancellationToken token)
        {
            var command = @"DELETE FROM dbo.PlantsInTasks
                            WHERE 
                            TaskId = @TaskId";

            await SqlConnection.ExecuteAsync(
                new CommandDefinition(
                    command,
                    new { TaskId = taskId },
                    cancellationToken: token));
        }


    }
}