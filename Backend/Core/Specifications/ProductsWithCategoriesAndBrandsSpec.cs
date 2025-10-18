using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductsWithCategoriesAndBrandsSpec : BaseSpecification<Product>
    {
        public ProductsWithCategoriesAndBrandsSpec()
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Brand);
            AddInclude(x=>x.ProductImages);
        }

        public ProductsWithCategoriesAndBrandsSpec(int id) : base(x=>x.Id==id)
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Brand);
            AddInclude(x => x.ProductImages);
        }
    }
}
