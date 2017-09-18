package id.cls.service.mapper;

import id.cls.domain.*;
import id.cls.service.dto.CategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity Category and its DTO CategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CategoryMapper extends EntityMapper <CategoryDTO, Category> {
    
    @Mapping(target = "products", ignore = true)
    Category toEntity(CategoryDTO categoryDTO); 

    default Category fromId(Integer id) {
        if (id == null) {
            return null;
        }
        Category category = new Category();
        category.setIdCategory(id);
        return category;
    }
}
