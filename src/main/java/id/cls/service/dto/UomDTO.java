package id.cls.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Uom entity.
 * atiila consulting
 */

public class UomDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String idUom;

    private String description;

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

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }
    
    public String getId() {
        return this.idUom;
    }    

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UomDTO uomDTO = (UomDTO) o;
        if(uomDTO.getIdUom() == null || getIdUom() == null) {
            return false;
        }
        return Objects.equals(getIdUom(), uomDTO.getIdUom());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getIdUom());
    }

    @Override
    public String toString() {
        return "UomDTO{" +
            "id=" + getIdUom() +
            ", description='" + getDescription() + "'" +
            ", abbreviation='" + getAbbreviation() + "'" +
            "}";
    }
}
