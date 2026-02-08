using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly IDatabase _database;
        public CartRepository(IConnectionMultiplexer redis) {
            _database = redis.GetDatabase();         
        }
        public async Task<bool> DeleteCartAsync(string id)
        {
            return await _database.KeyDeleteAsync(id);
        }

        public async Task<CustomerCart> GetCartAsync(string id)
        {
            var data =await _database.StringGetAsync(id);
            return data.IsNullOrEmpty?null:JsonSerializer.Deserialize<CustomerCart>(data);
        }

        public async Task<CustomerCart> UpdateCartAsync(CustomerCart cart)
        {
            var data = await _database.StringSetAsync(cart.Id, 
                JsonSerializer.Serialize(cart),TimeSpan.FromDays(30));
            if (!data) return null;

            return await GetCartAsync(cart.Id);
            
        }
    }
}
