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

    public class BrandController : ControllerBase
    {
        private readonly IGenericRepository<Brand> _brandRepo;
        private readonly IMapper _mapper;

        public BrandController(
            IGenericRepository<Brand> brandRepo,
            IMapper mapper)
        {
            _brandRepo = brandRepo;
            _mapper = mapper;
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<BrandDto>>> GetBrands()
        {
            var spec = new Brands_CategoriesWithProductsSpec<Brand>();
            var brands = await _brandRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Brand>, IReadOnlyList<BrandDto>>(brands));
        }

        [HttpGet("brand/{id}")]
        public async Task<ActionResult<BrandDto>> GetBrandById(int id)
        {
            var spec = new Brands_CategoriesWithProductsSpec<Brand>(id);
            var brand = await _brandRepo.GetEntityWithSpec(spec);

            if (brand == null)
                return NotFound();

            return Ok(_mapper.Map<Brand, BrandDto>(brand));
        }
      

    }
}
