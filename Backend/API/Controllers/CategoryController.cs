using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IGenericRepository<Category> _categoryRepo;
        private readonly IMapper _mapper;

        public CategoryController(
            IGenericRepository<Category> categoryRepo,
            IMapper mapper)
        {
            _categoryRepo = categoryRepo;
            _mapper = mapper;
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<CategoryDto>>> GetCategories()
        {
            var spec = new Brands_CategoriesWithProductsSpec<Category>();
            var categories = await _categoryRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Category>, IReadOnlyList<CategoryDto>>(categories));
        }

        [HttpGet("category/{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var spec = new Brands_CategoriesWithProductsSpec<Category>(id);
            var category = await _categoryRepo.GetEntityWithSpec(spec);

            if (category == null)
                return NotFound();

            return Ok(_mapper.Map<Category, CategoryDto>(category));
        }
    }
}
