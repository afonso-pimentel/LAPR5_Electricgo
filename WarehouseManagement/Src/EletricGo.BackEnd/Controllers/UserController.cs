using EletricGo.BackEnd.Authentication;
using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.BackEnd.Dtos.User;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.UserAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EletricGo.BackEnd.Controllers
{
    [CustomAuthorize(roles: new int[] { ((int)AttributeRoles.Admin) })]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<object>> Get(string id)
        {
            throw new NotImplementedException();
        }

        // GET: api/<UserController>
        [HttpGet]
        [ProducesResponseType(typeof(IList<GetDeliveryResponseDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IList<GetUserResponseDto>>> Get()
        {
            IList<GetUserResponseDto> users = await _service.GetAllAsync();

            if (users is not null && users.Any())
                return Ok(users);

            return NoContent();
        }

        // POST: api/<UserController>/ValidateUser
        [AllowAnonymous]
        [HttpPost("ValidateUser")]
        public async Task<ActionResult<GetUserResponseDto>> ValidateUser([FromBody] ValidateUserDto userDto)
        {
            try
            {
                GetUserResponseDto user = await _service.ValidateUserAsync(userDto);

                return Ok(user);
            }
            catch (UserException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        // POST api/<UserController>
        [HttpPost]
        [ProducesResponseType(typeof(PostUserResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PostUserResponseDto>> Post([FromBody] PostUserRequestDto value)
        {
            try
            {
                var user = await _service.AddAsync(value);

                return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
            }
            catch (UserException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<object>> Delete(string id)
        {
            try
            {
                var user = await _service.AnonymizeAsync(id);

                if (user == null)
                {
                    return BadRequest();
                }
                return Ok(user);
            }
            catch (UserException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
