package id.cls.web.rest;

import java.util.Set;
import com.codahale.metrics.annotation.Timed;
import id.cls.service.MarketService;
import id.cls.web.rest.util.HeaderUtil;
import id.cls.web.rest.util.PaginationUtil;
import id.cls.service.dto.MarketDTO;
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
 * REST controller for managing Market.
 */
@RestController
@RequestMapping("/api")
public class MarketResource {

    private final Logger log = LoggerFactory.getLogger(MarketResource.class);

    private static final String ENTITY_NAME = "market";

    private final MarketService marketService;

    public MarketResource(MarketService marketService) {
        this.marketService = marketService;
    }

    /**
     * POST  /markets : Create a new market.
     *
     * @param marketDTO the marketDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new marketDTO, or with status 400 (Bad Request) if the market has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/markets")
    @Timed
    public ResponseEntity<MarketDTO> createMarket(@RequestBody MarketDTO marketDTO) throws URISyntaxException {
        log.debug("REST request to save Market : {}", marketDTO);
        if (marketDTO.getIdMarket() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new market cannot already have an ID")).body(null);
        }
        MarketDTO result = marketService.save(marketDTO);
        return ResponseEntity.created(new URI("/api/markets/" + result.getIdMarket()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getIdMarket().toString()))
            .body(result);
    }

    /**
     * POST  /markets/execute{id}/{param} : Execute Bussiness Process market.
     *
     * @param marketDTO the marketDTO to Execute
     * @param id the id process to Execute
     * @param param the paramater process to Execute
     * @return the ResponseEntity with status Accepted and with body the  marketDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/markets/execute/{id}/{param}")
    @Timed
    public ResponseEntity<MarketDTO> executedMarket(@PathVariable Integer id, @PathVariable String param, @RequestBody MarketDTO marketDTO) throws URISyntaxException {
        log.debug("REST request to process Market : {}", marketDTO);
        MarketDTO result = marketService.processExecuteData(id, param, marketDTO);
        return new ResponseEntity<MarketDTO>(result, null, HttpStatus.OK);
    }

    /**
     * POST  /markets/execute-list{id}/{param} : Execute Bussiness Process market.
     *
     * @param marketDTO the marketDTO to Execute
     * @param id the id process to Execute
     * @param param the paramater process to Execute
     * @return the ResponseEntities with status Accepted and with body the  marketDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/markets/execute-list/{id}/{param}")
    @Timed
    public ResponseEntity<Set<MarketDTO>> executedListMarket(@PathVariable Integer id, @PathVariable String param, @RequestBody Set<MarketDTO> marketDTO) throws URISyntaxException {
        log.debug("REST request to process List Market");
        Set<MarketDTO> result = marketService.processExecuteListData(id, param, marketDTO);
        return new ResponseEntity<Set<MarketDTO>>(result, null, HttpStatus.OK);
    }

    /**
     * PUT  /markets : Updates an existing market.
     *
     * @param marketDTO the marketDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated marketDTO,
     * or with status 400 (Bad Request) if the marketDTO is not valid,
     * or with status 500 (Internal Server Error) if the marketDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/markets")
    @Timed
    public ResponseEntity<MarketDTO> updateMarket(@RequestBody MarketDTO marketDTO) throws URISyntaxException {
        log.debug("REST request to update Market : {}", marketDTO);
        if (marketDTO.getIdMarket() == null) {
            return createMarket(marketDTO);
        }
        MarketDTO result = marketService.save(marketDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, marketDTO.getIdMarket().toString()))
            .body(result);
    }

    /**
     * GET  /markets : get all the markets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of markets in body
     */
    @GetMapping("/markets")
    @Timed
    public ResponseEntity<List<MarketDTO>> getAllMarkets(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Markets");
        Page<MarketDTO> page = marketService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/markets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    

    /**
     * GET  /markets/:id : get the "id" market.
     *
     * @param id the id of the marketDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the marketDTO, or with status 404 (Not Found)
     */
    @GetMapping("/markets/{id}")
    @Timed
    public ResponseEntity<MarketDTO> getMarket(@PathVariable Integer id) {
        log.debug("REST request to get Market : {}", id);
        MarketDTO marketDTO = marketService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(marketDTO));
    }

    /**
     * DELETE  /markets/:id : delete the "id" market.
     *
     * @param id the id of the marketDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/markets/{id}")
    @Timed
    public ResponseEntity<Void> deleteMarket(@PathVariable Integer id) {
        log.debug("REST request to delete Market : {}", id);
        marketService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/markets?query=:query : search for the market corresponding
     * to the query.
     *
     * @param query the query of the market search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/markets")
    @Timed
    public ResponseEntity<List<MarketDTO>> searchMarkets(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Markets for query {}", query);
        Page<MarketDTO> page = marketService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/markets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
