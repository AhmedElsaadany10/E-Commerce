using API.Dtos;
using API.Exetentions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Route("products")]
    [Route("api/")]
    [ApiController]
    public class ProductController : ControllerBase //: BaseController
    {
        private readonly IProductRepository _productRepository;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public ProductController(IProductRepository productRepository,IConfiguration config,
            IGenericRepository<Product> productRepo,IMapper mapper)
        {
            _productRepository = productRepository;
            _config = config;
            _productRepo = productRepo;
            _mapper = mapper;
        }

        [HttpGet("products")]
       // public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts([FromQuery] PaginationParams _params)
        public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts()
        {
            var spec=new ProductsWithCategoriesAndBrandsSpec();
            var products=await _productRepo.ListAsync(spec);
            return Ok(_mapper.Map< IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products));
            // var products= _productRepository.GetAllAsync();
            //  var pagedResult= await PaginationHelperExtention.CreatePagedResult(products,_params);
            // var productDto = new PagedResult<ProductDto>
            // {
            /*return products.Select(p => new ProductDto
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
            }).ToList();
               // TotalCount = pagedResult.TotalCount,
               // PageNumber = pagedResult.PageNumber,
              //  PageSize = pagedResult.PageSize,
           // };*/
           // return Ok(productDto);*/
        }
        [HttpGet ("product/{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id) {

            var spec=new ProductsWithCategoriesAndBrandsSpec(id);
            var product =await _productRepo.GetEntityWithSpec(spec);
            return _mapper.Map<Product, ProductDto>(product);
            //var product= await _productRepository.GetByIdAsync(id);
          /*  return new ProductDto
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
            };*/
        }


    }
}
