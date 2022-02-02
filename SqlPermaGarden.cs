using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public class SqlPermaGarden : IPermaGardenRepositery<PlantsImagesRecord, PlantsRecord>
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
                                plant.PlantId = plantsImages.PlantId";


            return await SqlConnection.QueryAsync<PlantsRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

    }
}