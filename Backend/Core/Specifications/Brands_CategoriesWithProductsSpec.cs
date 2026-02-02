using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class Brands_CategoriesWithProductsSpec<T>
    : BaseSpecification<T>
    where T : BaseEntity, IHasProducts
    {
        public Brands_CategoriesWithProductsSpec()
        {
            AddInclude(x => x.Products);
        }

        public Brands_CategoriesWithProductsSpec(int id)
            : base(x => x.Id == id)
        {
            AddInclude(x => x.Products);
        }
    }

}
