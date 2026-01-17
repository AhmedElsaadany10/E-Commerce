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
        public ProductsWithCategoriesAndBrandsSpec(string sort ,int? brandId,int? categoryId)
            :base(x=>
                (!brandId.HasValue||x.BrandId==brandId)
                &&(!categoryId.HasValue||x.CategoryId==categoryId)
            )
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Brand);
            AddInclude(x => x.ProductImages);


            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "priceAsc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(x => x.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
        }

        public ProductsWithCategoriesAndBrandsSpec(int id) : base(x=>x.Id==id)
        {
            AddInclude(x => x.Category);
            AddInclude(x => x.Brand);
            AddInclude(x => x.ProductImages);
        }
    }
}
