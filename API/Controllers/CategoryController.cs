using API.Models;
using API.Repositories.Interfaces;
using API.Repositories.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class CategoryController : BaseController
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetBrandsAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetBrandById(int id) { 
        return await _categoryRepository.GetByIdAsync(id);
        }
    }
}
