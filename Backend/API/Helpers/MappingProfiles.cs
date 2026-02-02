using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.Name))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
                .ForMember(d => d.ProductImages, o => o.MapFrom(s => s.ProductImages.Select(u => u.Url)))
                .ForMember(d => d.ImageUrl, o => o.MapFrom<ProductImageUrlResolver>());

            CreateMap<Brand, BrandDto>()
                 .ForMember(
                     d => d.ProductsCount,
                     o => o.MapFrom(s => s.Products.Count));

            CreateMap<Category, CategoryDto>()
                .ForMember(d => d.ProductsCount,
                    o => o.MapFrom(s => s.Products.Count));
        }
    }
}
