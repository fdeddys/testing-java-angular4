package id.cls.service.mapper;

import id.cls.domain.*;
import id.cls.service.dto.UomDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity Uom and its DTO UomDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UomMapper extends EntityMapper <UomDTO, Uom> {
    
    

    default Uom fromId(String id) {
        if (id == null) {
            return null;
        }
        Uom uom = new Uom();
        uom.setIdUom(id);
        return uom;
    }
}
