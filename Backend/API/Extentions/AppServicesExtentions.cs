using API.Controllers;
using Core.Interfaces;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Extentions
{
    public static class AppServicesExtentions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection Services)
        {
            Services.AddScoped<IBrandRepository, BrandRepository>();
            Services.AddScoped<ICategoryRepository, CategoryRepository>();
            Services.AddScoped<IProductRepository, ProductRepository>();
            Services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            Services.Configure<ApiBehaviorOptions>(options =>
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorRespons
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                }
            );
            return Services;
        }

    }
}
