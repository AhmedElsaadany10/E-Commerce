
namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

        public ApiResponse(int statusCode, string message = null, string details = null)
        {
            StatusCode = statusCode;
            Message = message??GetDefaultMessageWithStatusCode(statusCode);
            Details = details;
        }

        private string GetDefaultMessageWithStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request",
                401 => "Authorized",
                404 => "Not Found",
                500 => "Server Error",
                _ => null
            };
        }
    }
}