using API.Dtos;
using API.Exetentions;
using API.Helpers;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class ProductController : BaseController
    {
        private readonly IProductRepository _productRepository;
        private readonly IConfiguration _config;
        public ProductController(IProductRepository productRepository,IConfiguration config)
        {
            _productRepository = productRepository;
            _config = config;
           
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts([FromQuery] PaginationParams _params)
        {
            var products= _productRepository.GetAllAsync();
            var pagedResult= await PaginationHelperExtention.CreatePagedResult(products,_params);
            var productDto = new PagedResult<ProductDto>
            {
                Items = pagedResult.Items.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    ImageUrl = string.IsNullOrEmpty(p.ImageUrl) ? $"{_config["ApiUrl"]}Images/Products/124.png" : p.ImageUrl,
                    ProductImages = p.ProductImages.Select(x => x.Url).ToList(),
                    Brand = p.Brand.Name,
                    Category = p.Category.Name
                }).ToList(),
                TotalCount = pagedResult.TotalCount,
                PageNumber = pagedResult.PageNumber,
                PageSize = pagedResult.PageSize,
            };
            return Ok(productDto);
        }
        [HttpGet ("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id) {
            var product= await _productRepository.GetByIdAsync(id);
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                ImageUrl = string.IsNullOrEmpty(product.ImageUrl) ? $"{_config["ApiUrl"]}Images/Products/124.png":product.ImageUrl,
                ProductImages =product.ProductImages.Select(x=>x.Url).ToList(),
                Brand = product.Brand.Name,
                Category = product.Category.Name
            };
        }
       
      
    }
}
