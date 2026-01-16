using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;

        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware>logger,
            IHostEnvironment environment)
        {
            _next = next;
            
            _logger = logger;
            
            _environment = environment;
        }
        public async Task InvokeAsync(HttpContext Context){
            try{
                await _next(Context);
            }catch(Exception ex){
                _logger.LogError(ex,ex.Message);
               Context.Response.ContentType="application/json";
                Context.Response.StatusCode=(int) HttpStatusCode.InternalServerError;

                var response=_environment.IsDevelopment()
                    ? new ApiException((int)HttpStatusCode.InternalServerError,
                    ex.Message,
                    ex.StackTrace ?? ex.InnerException?.StackTrace ?? "No stack trace available")
                    : new ApiException((int)HttpStatusCode.InternalServerError);

                    var json=System.Text.Json.JsonSerializer.Serialize(response);
                    await Context.Response.WriteAsync(json);
            }
        }
    } 
}