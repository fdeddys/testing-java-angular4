package id.cls.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Market entity.
 * atiila consulting
 */

public class MarketDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer idMarket;

    private String description;

    private String info;

    public Integer getIdMarket() {
        return this.idMarket;
    }

    public void setIdMarket(Integer id) {
        this.idMarket = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getId() {
        return this.idMarket;
    }

    public String getInfo() {
        return this.info;
    }

    public void setInfo(String value) {
        this.info = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MarketDTO marketDTO = (MarketDTO) o;
        if(marketDTO.getIdMarket() == null || getIdMarket() == null) {
            return false;
        }
        return Objects.equals(getIdMarket(), marketDTO.getIdMarket());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getIdMarket());
    }

    @Override
    public String toString() {
        return "MarketDTO{" +
            "id=" + getIdMarket() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
