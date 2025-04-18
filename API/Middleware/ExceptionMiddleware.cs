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
        public async Task InvokeAsync(HttpContext httpContext){
            try{
                await _next(httpContext);
            }catch(Exception ex){
                _logger.LogError(ex,ex.Message);
                httpContext.Response.ContentType="application/json";
                httpContext.Response.StatusCode=(int) HttpStatusCode.InternalServerError;

                var response=_environment.IsDevelopment()
                    ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message,ex.StackTrace?.ToString())
                    :new ApiException((int)HttpStatusCode.InternalServerError);

                    var json=System.Text.Json.JsonSerializer.Serialize(response);
                    await httpContext.Response.WriteAsync(json);
            }
        }
    } 
}