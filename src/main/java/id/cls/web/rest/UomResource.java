package id.cls.web.rest;

import java.util.Set;
import com.codahale.metrics.annotation.Timed;
import id.cls.service.UomService;
import id.cls.web.rest.util.HeaderUtil;
import id.cls.web.rest.util.PaginationUtil;
import id.cls.service.dto.UomDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Uom.
 */
@RestController
@RequestMapping("/api")
public class UomResource {

    private final Logger log = LoggerFactory.getLogger(UomResource.class);

    private static final String ENTITY_NAME = "uom";

    private final UomService uomService;

    public UomResource(UomService uomService) {
        this.uomService = uomService;
    }

    /**
     * POST  /uoms : Create a new uom.
     *
     * @param uomDTO the uomDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new uomDTO, or with status 400 (Bad Request) if the uom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/uoms")
    @Timed
    public ResponseEntity<UomDTO> createUom(@RequestBody UomDTO uomDTO) throws URISyntaxException {
        log.debug("REST request to save Uom : {}", uomDTO);
        if (uomDTO.getIdUom() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new uom cannot already have an ID")).body(null);
        }
        UomDTO result = uomService.save(uomDTO);
        return ResponseEntity.created(new URI("/api/uoms/" + result.getIdUom()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getIdUom().toString()))
            .body(result);
    }

    /**
     * POST  /uoms/execute{id}/{param} : Execute Bussiness Process uom.
     *
     * @param uomDTO the uomDTO to Execute
     * @param id the id process to Execute
     * @param param the paramater process to Execute
     * @return the ResponseEntity with status Accepted and with body the  uomDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/uoms/execute/{id}/{param}")
    @Timed
    public ResponseEntity<UomDTO> executedUom(@PathVariable Integer id, @PathVariable String param, @RequestBody UomDTO uomDTO) throws URISyntaxException {
        log.debug("REST request to process Uom : {}", uomDTO);
        UomDTO result = uomService.processExecuteData(id, param, uomDTO);
        return new ResponseEntity<UomDTO>(result, null, HttpStatus.OK);
    }

    /**
     * POST  /uoms/execute-list{id}/{param} : Execute Bussiness Process uom.
     *
     * @param uomDTO the uomDTO to Execute
     * @param id the id process to Execute
     * @param param the paramater process to Execute
     * @return the ResponseEntities with status Accepted and with body the  uomDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/uoms/execute-list/{id}/{param}")
    @Timed
    public ResponseEntity<Set<UomDTO>> executedListUom(@PathVariable Integer id, @PathVariable String param, @RequestBody Set<UomDTO> uomDTO) throws URISyntaxException {
        log.debug("REST request to process List Uom");
        Set<UomDTO> result = uomService.processExecuteListData(id, param, uomDTO);
        return new ResponseEntity<Set<UomDTO>>(result, null, HttpStatus.OK);
    }

    /**
     * PUT  /uoms : Updates an existing uom.
     *
     * @param uomDTO the uomDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated uomDTO,
     * or with status 400 (Bad Request) if the uomDTO is not valid,
     * or with status 500 (Internal Server Error) if the uomDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/uoms")
    @Timed
    public ResponseEntity<UomDTO> updateUom(@RequestBody UomDTO uomDTO) throws URISyntaxException {
        log.debug("REST request to update Uom : {}", uomDTO);
        if (uomDTO.getIdUom() == null) {
            return createUom(uomDTO);
        }
        UomDTO result = uomService.save(uomDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, uomDTO.getIdUom().toString()))
            .body(result);
    }

    /**
     * GET  /uoms : get all the uoms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of uoms in body
     */
    @GetMapping("/uoms")
    @Timed
    public ResponseEntity<List<UomDTO>> getAllUoms(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Uoms");
        Page<UomDTO> page = uomService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/uoms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    

    /**
     * GET  /uoms/:id : get the "id" uom.
     *
     * @param id the id of the uomDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the uomDTO, or with status 404 (Not Found)
     */
    @GetMapping("/uoms/{id}")
    @Timed
    public ResponseEntity<UomDTO> getUom(@PathVariable String id) {
        log.debug("REST request to get Uom : {}", id);
        UomDTO uomDTO = uomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(uomDTO));
    }

    /**
     * DELETE  /uoms/:id : delete the "id" uom.
     *
     * @param id the id of the uomDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/uoms/{id}")
    @Timed
    public ResponseEntity<Void> deleteUom(@PathVariable String id) {
        log.debug("REST request to delete Uom : {}", id);
        uomService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/uoms?query=:query : search for the uom corresponding
     * to the query.
     *
     * @param query the query of the uom search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/uoms")
    @Timed
    public ResponseEntity<List<UomDTO>> searchUoms(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Uoms for query {}", query);
        Page<UomDTO> page = uomService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/uoms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
