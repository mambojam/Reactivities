using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= // Checks if _mediator is null
            HttpContext.RequestServices.GetService<IMediator>(); // If it is, gets an instance of IMediator from the HttpContext.RequestServices.

        protected ActionResult HandleResult<T>(Result<T> result) 
        {
            if (result == null) return NotFound();

            if (result.IsSuccess && result.Value != null) 
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null )
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}
