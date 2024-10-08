using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= // Checks if _mediator is null
            HttpContext.RequestServices.GetService<IMediator>(); // If it is, gets an instance of IMediator from the HttpContext.RequestServices.
    }
}
