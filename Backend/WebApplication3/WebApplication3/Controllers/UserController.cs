using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjP2M.Models;
using ProjP2M.Services;

namespace ProjP2M.Controllers
{
  
        [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private readonly UserService service;

            public UserController(UserService _service)
            {
                service = _service;
            }

            [AllowAnonymous]
            [HttpGet]
            public ActionResult<List<User>> GetUsers()
            {
                return service.GetUsers();
            }

            [AllowAnonymous]
            [HttpGet("email/{email}")]
            public ActionResult<User> GetUserByEmail(string email)
            {
                var user = service.GetUserByEmail(email);
                if (user == null)
                {
                    return NotFound();
                }
                return (ActionResult<User>)user;
            }

            [AllowAnonymous]
            [HttpGet("{id}")]
            public ActionResult<User> GetUser(string id)
            {
                var user = service.GetUser(id);
                return user;
            }

            [AllowAnonymous]
            [HttpPost("register")]
            public ActionResult<User> Register(User user)
            {
                // Check if the user already exists
                var existingUser = service.GetUserByEmail(user.Email);
                if (existingUser != null)

                {
                    return Conflict("User already exists");
                }

                // Create the user account
                var createdUser = service.CreateUser(user);
                return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
            }


            [AllowAnonymous]
            [Route("authenticate")]
            [HttpPost]
            public ActionResult Login([FromBody] User user)
            {
                var token = service.Authenticate(user.Email, user.Password);
                if (token == null)
                {
                    return Unauthorized();
                }
                return Ok(new { token, user });
            }

            [AllowAnonymous]
            [HttpPut("{id}/profile-image")]
            public IActionResult UpdateProfileImage(string id, [FromBody] User user)
            {
                if (user == null)
                {
                    return BadRequest("Invalid request body.");
                }

                var existingUser = service.GetUser(id);
                if (existingUser == null)
                {
                    return NotFound();
                }

                existingUser.ImageUrl = user.ImageUrl;
                try
                {
                    service.UpdateUser(existingUser);
                    return Ok(existingUser);
                }
                catch (Exception)
                {
                    return StatusCode(500, "An error occurred while updating the user's profile image.");
                }
            }





        }
    }

