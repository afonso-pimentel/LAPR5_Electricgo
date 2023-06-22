using System.Text;
using System.Web;
using EletricGo.BackEnd.Authentication;
using EletricGo.BackEnd.Dtos;
using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EletricGo.BackEnd.Controllers
{
    [CustomAuthorize(roles: new int[] { ((int)AttributeRoles.Admin), ((int)AttributeRoles.WarehouseManager) })]
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryService _service;
        public DeliveryController(IDeliveryService service)
        {
            _service = service;
        }

        // GET: api/<DeliveryController>
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IList<GetDeliveryResponseDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IList<GetDeliveryResponseDto>>> Get()
        {
            IList<GetDeliveryResponseDto> deliveries = (IList<GetDeliveryResponseDto>)await _service.GetAllAsync();

            if(deliveries is not null && deliveries.Any())
            {

                return Ok(deliveries);
            }

            return NoContent();
        }

        // GET api/<DeliveryController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(GetDeliveryResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetDeliveryResponseDto>> Get(string id)
        {
            var delivery = await _service.GetByIdAsync(id);

            if (delivery == null)
            {
                return NotFound();
            }

            return Ok(delivery);
        }


        // GET api/<DeliveryController>/5
        [HttpGet("date/{date}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(GetDeliveryResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<GetDeliveryResponseDto>>> GetByDate(string date)
        {
            var delivery = await _service.GetAllByDateAsync(DateTime.Parse(date));

            if (delivery is null || !delivery.Any())
            {
                return NoContent();
            }

            return Ok(delivery);
        }

        // POST api/<DeliveryController>
        [HttpPost]
        public async Task<ActionResult<PostDeliveryResponseDto>> Post([FromBody] PostDeliveryRequestDto value)
        {
            try
            {
                var delivery = await _service.AddAsync(value);

                return CreatedAtAction(nameof(Get), new { id = delivery.Id }, delivery);

            }
            catch (DeliveryException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT api/<DeliveryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            throw new NotImplementedException();
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Patch([FromBody] PatchDeliveryDateRequestDTO requestDTO)
        {
            try
            {
                PatchDeliveryDateResponseDTO response = await _service.UpdateAsync(requestDTO);

                if (!response.Success)
                    return BadRequest(response.ErrorMessage);

                return Ok();

            } catch(DeliveryException exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // DELETE api/<DeliveryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
