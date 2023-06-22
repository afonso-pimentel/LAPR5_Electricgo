using EletricGo.BackEnd.Authentication;
using EletricGo.BackEnd.Dtos.Warehouse;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.UserAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EletricGo.BackEnd.Controllers
{
    /// <summary>
    /// Controller for all the warehouse resources.
    /// </summary>
    [CustomAuthorize(roles: new int[] { ((int)AttributeRoles.Admin), ((int)AttributeRoles.WarehouseManager) })]
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseService _service;

        /// <summary>
        /// Initializes a new instance of <see cref="WarehouseController"/>
        /// </summary>
        /// <param name="service">The warehouse service.</param>
        public WarehouseController(IWarehouseService service)
        {
            _service = service ?? throw new ArgumentNullException($"{nameof(service)} cannot be null.");
        }

        // GET: api/<WarehouseController>
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<GetWarehouseRequestDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Get([FromQuery] bool all = false)
        {
            IList<GetWarehouseRequestDTO> availableWarehouses = all ? await _service.GetAllAsync() : await _service.GetAllActiveAsync();

            if(availableWarehouses is not null && availableWarehouses.Any())
                return Ok(availableWarehouses);

            return NoContent();
        }

        // GET api/<WarehouseController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(GetWarehouseRequestDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Get(string id)
        {
            GetWarehouseRequestDTO? warehouse = await _service.GetByIdAsync(id);

            if (warehouse is null)
                return NotFound();

            return Ok(warehouse);
        }

        // POST api/<WarehouseController>
        [HttpPost]
        public async Task<ActionResult<CreateWarehouseResponseDto>> Post([FromBody] CreateWarehouseRequestDto value)
        {
            try
            {
                var warehouse = await _service.AddAsync(value);
                return CreatedAtAction(nameof(Get), new { id = warehouse.Id }, warehouse);
            }
            catch (WarehouseException we)
            {
                return BadRequest(new { error = we.Message });
            }

        }

        // PUT api/<WarehouseController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PutWarehouseResponseDto>> Put(Guid id, [FromBody] PutWarehouseRequestDto value)
        {
            try
            {
                var warehouse = await _service.UpdateAsync(value, id);

                if (warehouse == null)
                {
                    return BadRequest();
                }
                return Ok(warehouse);
            }
            catch (WarehouseException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // DELETE api/<WarehouseController>/5
        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var warehouse = await _service.InactivateAsync(id);

                if (warehouse is null)
                    return BadRequest();
                
                return NoContent();
            }
            catch (WarehouseException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
