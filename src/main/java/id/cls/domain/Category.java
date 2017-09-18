package id.cls.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * atiila consulting
 * Class definition for Entity Category.
 */

@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcategory")
    private Integer idCategory;

    @Column(name = "description")
    private String description;

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    public Integer getIdCategory() {
        return this.idCategory;
    }

    public void setIdCategory(Integer id) {
        this.idCategory = id;
    }

    public String getDescription() {
        return description;
    }

    public Category description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Category products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Category addProduct(Product product) {
        this.products.add(product);
        product.getCategories().add(this);
        return this;
    }

    public Category removeProduct(Product product) {
        this.products.remove(product);
        product.getCategories().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Category category = (Category) o;
        if (category.idCategory == null || this.idCategory == null) {
            return false;
        }
        return Objects.equals(this.idCategory, category.idCategory);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.idCategory);
    }

    @Override
    public String toString() {
        return "Category{" +
            "idCategory=" + this.idCategory +
            ", description='" + getDescription() + "'" +
            '}';
    }
}
