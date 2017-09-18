package id.cls.service;

import id.cls.domain.Market;
import id.cls.repository.MarketRepository;
import id.cls.repository.search.MarketSearchRepository;
import id.cls.service.dto.MarketDTO;
import id.cls.service.mapper.MarketMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Market.
 * atiila consulting
 */

@Service
@Transactional
public class MarketService {

    private final Logger log = LoggerFactory.getLogger(MarketService.class);

    private final MarketRepository marketRepository;

    private final MarketMapper marketMapper;

    private final MarketSearchRepository marketSearchRepository;

    public MarketService(MarketRepository marketRepository, MarketMapper marketMapper, MarketSearchRepository marketSearchRepository) {
        this.marketRepository = marketRepository;
        this.marketMapper = marketMapper;
        this.marketSearchRepository = marketSearchRepository;
    }

    /**
     * Save a market.
     *
     * @param marketDTO the entity to save
     * @return the persisted entity
     */
    public MarketDTO save(MarketDTO marketDTO) {
        log.debug("Request to save Market : {}", marketDTO);
        Market market = marketMapper.toEntity(marketDTO);
        market = marketRepository.save(market);
        MarketDTO result = marketMapper.toDto(market);
        marketSearchRepository.save(market);
        return result;
    }

    /**
     *  Get all the markets.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MarketDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Markets");
        return marketRepository.findAll(pageable)
            .map(marketMapper::toDto);
    }

    /**
     *  Get one market by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public MarketDTO findOne(Integer id) {
        log.debug("Request to get Market : {}", id);
        Market market = marketRepository.findOne(id);
        return marketMapper.toDto(market);
    }

    /**
     *  Delete the  market by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Integer id) {
        log.debug("Request to delete Market : {}", id);
        marketRepository.delete(id);
        marketSearchRepository.delete(id);
    }

    /**
     * Search for the market corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MarketDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Markets for query {}", query);
        Page<Market> result = marketSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(marketMapper::toDto);
    }

    public MarketDTO processExecuteData(Integer id, String param, MarketDTO dto) {
        MarketDTO r = dto;
        if (r != null) {
            switch (id) {
                case 1:
                    break;
                default:
                    break;
            }
		}
        return r;
    }

    public Set<MarketDTO> processExecuteListData(Integer id, String param, Set<MarketDTO> dto) {
        Set<MarketDTO> r = dto;
        if (r != null) {
            switch (id) {
                case 1:
                    break;
                default:
                    break;
            }
		}
        return r;
    }    

}
