package id.cls.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;import java.util.Objects;

/**
 * atiila consulting
 * Class definition for Entity Uom.
 */

@Entity
@Table(name = "uom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "uom")
public class Uom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.annotation.Id
    @Column(name = "iduom")
    private String idUom;

    @Column(name = "description")
    private String description;

    @Column(name = "abbreviation")
    private String abbreviation;

    public String getIdUom() {
        return this.idUom;
    }

    public void setIdUom(String id) {
        this.idUom = id;
    }

    public String getDescription() {
        return description;
    }

    public Uom description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public Uom abbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
        return this;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Uom uom = (Uom) o;
        if (uom.idUom == null || this.idUom == null) {
            return false;
        }
        return Objects.equals(this.idUom, uom.idUom);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.idUom);
    }

    @Override
    public String toString() {
        return "Uom{" +
            "idUom=" + this.idUom +
            ", description='" + getDescription() + "'" +
            ", abbreviation='" + getAbbreviation() + "'" +
            '}';
    }
}
