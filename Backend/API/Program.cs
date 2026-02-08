using Infrastructure.Data;
using Infrastructure.Data.DataSeeding;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using System;
using Core.Interfaces;
using Infrastructure.Repositories;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using API.Controllers;
using API.Extentions;
using StackExchange.Redis;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AppDbContext>(options =>
           options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var configuration = ConfigurationOptions.Parse(
        builder.Configuration.GetConnectionString("Redis"),
        true
    );
    return ConnectionMultiplexer.Connect(configuration);
});

// this Function  has all Services;
builder.Services.AddAppServices();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionMiddleware>();
//app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseAuthorization();

app.UseCors("AllowAngular");
app.MapControllers();

//seed data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<AppDbContext>();
var logger = services.GetService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await SeedData.SeedAsync(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "an error accurd");
}
//end seedin data

app.Run();


