package id.cls.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Category entity.
 * atiila consulting
 */

public class CategoryDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer idCategory;

    private String description;

    public Integer getIdCategory() {
        return this.idCategory;
    }

    public void setIdCategory(Integer id) {
        this.idCategory = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getId() {
        return this.idCategory;
    }    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CategoryDTO categoryDTO = (CategoryDTO) o;
        if(categoryDTO.getIdCategory() == null || getIdCategory() == null) {
            return false;
        }
        return Objects.equals(getIdCategory(), categoryDTO.getIdCategory());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getIdCategory());
    }

    @Override
    public String toString() {
        return "CategoryDTO{" +
            "id=" + getIdCategory() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
