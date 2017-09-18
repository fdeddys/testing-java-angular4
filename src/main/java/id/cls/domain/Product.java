package id.cls.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import org.springframework.data.elasticsearch.annotations.Document;

import org.hibernate.annotations.GenericGenerator;
import java.util.UUID;
import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * atiila consulting
 * Class definition for Entity Product.
 */

@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    @Column(name = "discount")
    private Float discount;

    @Column(name = "dtintro")
    private ZonedDateTime dateIntroduce;

    @ManyToOne
    @JoinColumn(name="idmarket", referencedColumnName="idmarket")
    private Market market;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_category",
               joinColumns = @JoinColumn(name="products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="categories_id", referencedColumnName="idcategory"))
    private Set<Category> categories = new HashSet<>();

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQty() {
        return qty;
    }

    public Product qty(Integer qty) {
        this.qty = qty;
        return this;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Product price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Float getDiscount() {
        return discount;
    }

    public Product discount(Float discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public ZonedDateTime getDateIntroduce() {
        return dateIntroduce;
    }

    public Product dateIntroduce(ZonedDateTime dateIntroduce) {
        this.dateIntroduce = dateIntroduce;
        return this;
    }

    public void setDateIntroduce(ZonedDateTime dateIntroduce) {
        this.dateIntroduce = dateIntroduce;
    }

    public Market getMarket() {
        return market;
    }

    public Product market(Market market) {
        this.market = market;
        return this;
    }

    public void setMarket(Market market) {
        this.market = market;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Product categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Product addCategory(Category category) {
        this.categories.add(category);
        category.getProducts().add(this);
        return this;
    }

    public Product removeCategory(Category category) {
        this.categories.remove(category);
        category.getProducts().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if (product.id == null || this.id == null) {
            return false;
        }
        return Objects.equals(this.id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id);
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + this.id +
            ", name='" + getName() + "'" +
            ", qty='" + getQty() + "'" +
            ", price='" + getPrice() + "'" +
            ", discount='" + getDiscount() + "'" +
            ", dateIntroduce='" + getDateIntroduce() + "'" +
            '}';
    }
}
