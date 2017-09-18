package id.cls.service;

import id.cls.domain.Uom;
import id.cls.repository.UomRepository;
import id.cls.repository.search.UomSearchRepository;
import id.cls.service.dto.UomDTO;
import id.cls.service.mapper.UomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Uom.
 * atiila consulting
 */

@Service
@Transactional
public class UomService {

    private final Logger log = LoggerFactory.getLogger(UomService.class);

    private final UomRepository uomRepository;

    private final UomMapper uomMapper;

    private final UomSearchRepository uomSearchRepository;

    public UomService(UomRepository uomRepository, UomMapper uomMapper, UomSearchRepository uomSearchRepository) {
        this.uomRepository = uomRepository;
        this.uomMapper = uomMapper;
        this.uomSearchRepository = uomSearchRepository;
    }

    /**
     * Save a uom.
     *
     * @param uomDTO the entity to save
     * @return the persisted entity
     */
    public UomDTO save(UomDTO uomDTO) {
        log.debug("Request to save Uom : {}", uomDTO);
        Uom uom = uomMapper.toEntity(uomDTO);
        uom = uomRepository.save(uom);
        UomDTO result = uomMapper.toDto(uom);
        uomSearchRepository.save(uom);
        return result;
    }

    /**
     *  Get all the uoms.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UomDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Uoms");
        return uomRepository.findAll(pageable)
            .map(uomMapper::toDto);
    }

    /**
     *  Get one uom by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public UomDTO findOne(String id) {
        log.debug("Request to get Uom : {}", id);
        Uom uom = uomRepository.findOne(id);
        return uomMapper.toDto(uom);
    }

    /**
     *  Delete the  uom by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Uom : {}", id);
        uomRepository.delete(id);
        uomSearchRepository.delete(id);
    }

    /**
     * Search for the uom corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UomDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Uoms for query {}", query);
        Page<Uom> result = uomSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(uomMapper::toDto);
    }

    public UomDTO processExecuteData(Integer id, String param, UomDTO dto) {
        UomDTO r = dto;
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

    public Set<UomDTO> processExecuteListData(Integer id, String param, Set<UomDTO> dto) {
        Set<UomDTO> r = dto;
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
