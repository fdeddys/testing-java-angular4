package id.cls.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the Product entity.
 * atiila consulting
 */

public class ProductDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private UUID id;

    private String name;

    private Integer qty;

    private BigDecimal price;

    private Float discount;

    private ZonedDateTime dateIntroduce;

    private Integer marketId;

    private String marketDescription;

    private String marketInfo;

    private Set<CategoryDTO> categories = new HashSet<>();

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public ZonedDateTime getDateIntroduce() {
        return dateIntroduce;
    }

    public void setDateIntroduce(ZonedDateTime dateIntroduce) {
        this.dateIntroduce = dateIntroduce;
    }

    public Integer getMarketId() {
        return marketId;
    }

    public void setMarketId(Integer marketId) {
        this.marketId = marketId;
    }

    public String getMarketDescription() {
        return marketDescription;
    }

    public void setMarketInfo(String marketInfo) {
        this.marketInfo = marketInfo;
    }

    public String getMarketInfo() {
        return marketInfo;
    }

    public void setMarketDescription(String marketDescription) {
        this.marketDescription = marketDescription;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDTO> categories) {
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

        ProductDTO productDTO = (ProductDTO) o;
        if(productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", qty='" + getQty() + "'" +
            ", price='" + getPrice() + "'" +
            ", discount='" + getDiscount() + "'" +
            ", dateIntroduce='" + getDateIntroduce() + "'" +
            "}";
    }
}
