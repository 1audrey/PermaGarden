using Microsoft.EntityFrameworkCore;

namespace perma_garden_app.Data
{
    public class PermaGardenContext : DbContext
    {
        public PermaGardenContext(DbContextOptions<PermaGardenContext> options)
            : base(options)
        {
        }

        public DbSet<PlantsImagesRecord> PlantsImages { get; set; }
    
    }
}
