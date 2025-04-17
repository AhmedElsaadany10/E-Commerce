using API.Data;
using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Services
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductImages)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        // we used IQueryable to apply filtering, sorting,
        // and pagination on the database side efficiently before executing the query
        public IQueryable<Product> GetAllAsync()
        {
            return  _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include (p => p.ProductImages)
                .AsQueryable(); 
            // ToListAsync()  used with IEnumrable  
        }
    }
}
