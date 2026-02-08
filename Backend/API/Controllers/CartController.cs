using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        public CartController(ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetCartById(string id)
        {
            var cart=await _cartRepository.GetCartAsync(id);
            return Ok(cart??new CustomerCart (id));
        }
        [HttpPost]
        public async Task<ActionResult<CustomerCart>>UpdateCart(CustomerCart cart)
        {
            foreach (var item in cart.Items)
            {
                var product = await _productRepository.GetByIdAsync(item.Id);

                if (product == null)
                    return BadRequest($"Product {item.ProductName} not found");

                if (item.Quantity > product.CountInStock)
                    return BadRequest($"الكمية المطلوبة غير متاحة للمنتج {item.ProductName}");
            }

            var updatedCart = await _cartRepository.UpdateCartAsync(cart);
            return Ok(updatedCart);
        }
        [HttpDelete]
        public async Task DeleteCart(string id)
        {
            await _cartRepository.DeleteCartAsync(id);  
        }
    }
}
