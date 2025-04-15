
using API.Data;
using API.Errors;
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
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("server-error")]
        public ActionResult<String> ServerError()
        {
            var data = _context.Products.Find(-1);
            return data.ToString();
        }
        [HttpGet("bad-reqeust")]
        public ActionResult<string> BadRequest()
        {
            return BadRequest();
        }
      
    }
}
