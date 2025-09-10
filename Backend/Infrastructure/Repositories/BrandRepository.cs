using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class BrandRepository : IBrandRepository
    {
        private readonly AppDbContext _context;
        public BrandRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Brand>> GetAllAsync()
        {
            return await _context.Brands.ToListAsync();
        }


        public async Task<Brand> GetByIdAsync(int id)
        {
            return await _context.Brands.FindAsync(id);
        }


    }
}
