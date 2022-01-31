using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace perma_garden_app
{
    public class SqlPermaGarden : IPermaGardenRepositery<PlantsImagesRecord>
    {
        public SqlPermaGarden(string connectionString)
        {
            SqlConnection = new SqlConnection(connectionString);
        }
        private SqlConnection SqlConnection { get; }

        public async Task<IEnumerable<PlantsImagesRecord>> GetAllPlantsImages(CancellationToken token)
        {
            var command = @"SELECT
                                plantImage.PlantImageId
                                , plantImage.PlantImageTitle
                                , plantImage.PlantImagePicture
                            FROM
                                dbo.PlantsImages plantImage";


            return await SqlConnection.QueryAsync<PlantsImagesRecord>(new CommandDefinition(command,
                cancellationToken: token));
        }

    }
}