
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BugsController : BaseController
    {
        private readonly AppDbContext _context;

        public BugsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("not-found")]
        public ActionResult NotFoundRequest()
        {
            var data=_context.Products.Find(-1);
            if(data == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok(data);
        }
        [HttpGet("server-error")]
        public ActionResult<String> ServerError()
        {
            var data = _context.Products.Find(-1);
            return data.ToString();
        }
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }
        [HttpGet("unauthorized")]
        public ActionResult<string> GetUnauthorized()
        {
            return Unauthorized(new ApiResponse(401));
        }
    }
      
    }

