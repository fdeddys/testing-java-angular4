package id.cls.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;import java.util.Objects;

/**
 * atiila consulting
 * Class definition for Entity Market.
 */

@Entity
@Table(name = "market")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "market")
public class Market implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmarket")
    private Integer idMarket;

    @Column(name = "description")
    private String description;

    @Column(name = "info")
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

    public Market description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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
        Market market = (Market) o;
        if (market.idMarket == null || this.idMarket == null) {
            return false;
        }
        return Objects.equals(this.idMarket, market.idMarket);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.idMarket);
    }

    @Override
    public String toString() {
        return "Market{" +
            "idMarket=" + this.idMarket +
            ", description='" + getDescription() + "'" +
            '}';
    }
}
