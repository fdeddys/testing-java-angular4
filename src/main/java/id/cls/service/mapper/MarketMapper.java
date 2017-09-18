package id.cls.service.mapper;

import id.cls.domain.*;
import id.cls.service.dto.MarketDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity Market and its DTO MarketDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MarketMapper extends EntityMapper <MarketDTO, Market> {
    
    

    default Market fromId(Integer id) {
        if (id == null) {
            return null;
        }
        Market market = new Market();
        market.setIdMarket(id);
        return market;
    }
}
