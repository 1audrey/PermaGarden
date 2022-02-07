using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public class SqlPermaGarden : IPermaGardenRepositery<PlantsImagesRecord, PlantsRecord, PatchesImagesRecord>
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

    }
}