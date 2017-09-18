package id.cls.web.rest;

import java.util.Set;
import com.codahale.metrics.annotation.Timed;
import id.cls.service.CategoryService;
import id.cls.web.rest.util.HeaderUtil;
import id.cls.web.rest.util.PaginationUtil;
import id.cls.service.dto.CategoryDTO;
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
 * REST controller for managing Category.
 */
@RestController
@RequestMapping("/api")
public class CategoryResource {

    private final Logger log = LoggerFactory.getLogger(CategoryResource.class);

    private static final String ENTITY_NAME = "category";

    private final CategoryService categoryService;

    public CategoryResource(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * POST  /categories : Create a new category.
     *
     * @param categoryDTO the categoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoryDTO, or with status 400 (Bad Request) if the category has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories")
    @Timed
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) throws URISyntaxException {
        log.debug("REST request to save Category : {}", categoryDTO);
        if (categoryDTO.getIdCategory() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new category cannot already have an ID")).body(null);
        }
        CategoryDTO result = categoryService.save(categoryDTO);
        return ResponseEntity.created(new URI("/api/categories/" + result.getIdCategory()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getIdCategory().toString()))
            .body(result);
    }

    /**
     * POST  /categories/execute{id}/{param} : Execute Bussiness Process category.
     *
     * @param categoryDTO the categoryDTO to Execute
     * @param id the id process to Execute
     * @param param the paramater process to Execute
     * @return the ResponseEntity with status Accepted and with body the  categoryDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories/execute/{id}/{param}")
    @Timed
    public ResponseEntity<CategoryDTO> executedCategory(@PathVariable Integer id, @PathVariable String param, @RequestBody CategoryDTO categoryDTO) throws URISyntaxException {
        log.debug("REST request to process Category : {}", categoryDTO);
        CategoryDTO result = categoryService.processExecuteData(id, param, categoryDTO);
        return new ResponseEntity<CategoryDTO>(result, null, HttpStatus.OK);
    }

    /**
     * POST  /categories/execute-list{id}/{param} : Execute Bussiness Process category.
     *
     * @param categoryDTO the categoryDTO to Execute
     * @param id the id process to Execute
     * @param param the paramater process to Execute
     * @return the ResponseEntities with status Accepted and with body the  categoryDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories/execute-list/{id}/{param}")
    @Timed
    public ResponseEntity<Set<CategoryDTO>> executedListCategory(@PathVariable Integer id, @PathVariable String param, @RequestBody Set<CategoryDTO> categoryDTO) throws URISyntaxException {
        log.debug("REST request to process List Category");
        Set<CategoryDTO> result = categoryService.processExecuteListData(id, param, categoryDTO);
        return new ResponseEntity<Set<CategoryDTO>>(result, null, HttpStatus.OK);
    }

    /**
     * PUT  /categories : Updates an existing category.
     *
     * @param categoryDTO the categoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoryDTO,
     * or with status 400 (Bad Request) if the categoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the categoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categories")
    @Timed
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO categoryDTO) throws URISyntaxException {
        log.debug("REST request to update Category : {}", categoryDTO);
        if (categoryDTO.getIdCategory() == null) {
            return createCategory(categoryDTO);
        }
        CategoryDTO result = categoryService.save(categoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoryDTO.getIdCategory().toString()))
            .body(result);
    }

    /**
     * GET  /categories : get all the categories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of categories in body
     */
    @GetMapping("/categories")
    @Timed
    public ResponseEntity<List<CategoryDTO>> getAllCategories(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Categories");
        Page<CategoryDTO> page = categoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    

    /**
     * GET  /categories/:id : get the "id" category.
     *
     * @param id the id of the categoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/categories/{id}")
    @Timed
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable Integer id) {
        log.debug("REST request to get Category : {}", id);
        CategoryDTO categoryDTO = categoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(categoryDTO));
    }

    /**
     * DELETE  /categories/:id : delete the "id" category.
     *
     * @param id the id of the categoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        log.debug("REST request to delete Category : {}", id);
        categoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/categories?query=:query : search for the category corresponding
     * to the query.
     *
     * @param query the query of the category search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/categories")
    @Timed
    public ResponseEntity<List<CategoryDTO>> searchCategories(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Categories for query {}", query);
        Page<CategoryDTO> page = categoryService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
