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
                                , plantsInPatches.PatchId
                                , plantsInPatches.PlantId

                            FROM
                                dbo.PlantsInPatches plantsInPatches

                            JOIN
                                dbo.Patches patch
                            ON
                                patch.PatchId = plantsInPatches.PatchId 

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
                                , task.CurrentTaskName
                                , task.NextTaskName
                                , task.StartingDate
                                , task.NextDate
                                , task.TransplantDate
                                , task.RealHarvestingDate
                                , task.DaysDifferenceBetweenTaskAndToday
                                , task.IsFirstTaskSuccess
                                , task.FailureReasons
                                , task.HarvestedWeight
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
    }
}