using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class BrandController : BaseController
    {
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Brand>>> GetBrandsAsync()
        {
            return await _brandRepository.GetAllAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrandById(int id) { 
        return await _brandRepository.GetByIdAsync(id);
        }
    }
}
