using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ProjP2M.Models;
using ProjP2M.Services;


namespace ProjP2M.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestHouseController : ControllerBase
    {
        private readonly GustHouseService _guestHouseService;

        public GuestHouseController(GustHouseService guestHouseService)
        {
            _guestHouseService = guestHouseService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GuestHouse>>> Get()
        {
            var guestHouses = await _guestHouseService.GetAsync();
            return Ok(guestHouses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GuestHouse>> Get(string id)
        {
            var guestHouse = await _guestHouseService.GetAsync(id);

            if (guestHouse == null)
            {
                return NotFound();
            }

            return Ok(guestHouse);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GuestHouse newGuestHouse)
        {
            await _guestHouseService.CreateAsync(newGuestHouse);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] GuestHouse updatedGuestHouse)
        {
            var existingGuestHouse = await _guestHouseService.GetAsync(id);

            if (existingGuestHouse == null)
            {
                return NotFound();
            }

            updatedGuestHouse.Id = existingGuestHouse.Id;

            await _guestHouseService.UpdateAsync(id, updatedGuestHouse);

            return NoContent();
        }
       

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingGuestHouse = await _guestHouseService.GetAsync(id);

            if (existingGuestHouse == null)
            {
                return NotFound();
            }

            await _guestHouseService.RemoveAsync(id);

            return NoContent();
        }
    }
}
