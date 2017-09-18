package id.cls.service.mapper;

import id.cls.domain.*;
import id.cls.service.dto.ProductDTO;
import org.mapstruct.*;
import java.util.UUID;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {MarketMapper.class, CategoryMapper.class, })
public interface ProductMapper extends EntityMapper <ProductDTO, Product> {

    @Mapping(source = "market.idMarket", target = "marketId")
    @Mapping(source = "market.description", target = "marketDescription")
    ProductDTO toDto(Product product); 

    @Mapping(source = "marketId", target = "market")
    Product toEntity(ProductDTO productDTO); 

    default Product fromId(UUID id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
