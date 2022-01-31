using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace perma_garden_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantsImageController : ControllerBase
    {
        private readonly IPermaGardenRepositery<PlantsImagesRecord> _plantsImages;

        public PlantsImageController(IPermaGardenRepositery<PlantsImagesRecord> plantsImages)
        {
            _plantsImages = plantsImages;
        }

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken token)
        {
            var plantsImages = await _plantsImages
                .GetAllPlantsImages(token);

            return Ok(plantsImages.ToList());
        }


    }
}
