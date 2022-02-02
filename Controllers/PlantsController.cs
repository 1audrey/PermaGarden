using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace perma_garden_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord, PlantsRecord> _plantsRepositery;

        public PlantsController(IPermaGardenRepositery<PlantsImagesRecord, PlantsRecord> plantsRepositery)
        {
            _plantsRepositery = plantsRepositery;
            
        }

        [HttpGet]
        [Route("all-plants-images")]
        public async Task<IActionResult> GetPlantsImages(CancellationToken token)
        {
            var plantsImages = await _plantsRepositery
                .GetAllPlantsImages(token);

            return Ok(plantsImages.ToList());
        }

        [HttpGet]
        [Route("all-plants")]
        public async Task<IActionResult> GetAllPlants(CancellationToken token)
        {
            var plantsImages = await _plantsRepositery
                .GetAllPlants(token);

            return Ok(plantsImages.ToList());
        }


    }
}
