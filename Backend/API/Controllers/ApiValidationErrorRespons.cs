using API.Errors;

namespace API.Controllers
{
    public class ApiValidationErrorRespons : ApiResponse
    {
        public ApiValidationErrorRespons() : base(400)
        {
        }
        public IEnumerable<String> Errors { get; set; }
    }
}
