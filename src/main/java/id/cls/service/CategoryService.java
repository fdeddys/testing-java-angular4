package id.cls.service;

import id.cls.domain.Category;
import id.cls.repository.CategoryRepository;
import id.cls.repository.search.CategorySearchRepository;
import id.cls.service.dto.CategoryDTO;
import id.cls.service.mapper.CategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Category.
 * atiila consulting
 */

@Service
@Transactional
public class CategoryService {

    private final Logger log = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    private final CategorySearchRepository categorySearchRepository;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper, CategorySearchRepository categorySearchRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.categorySearchRepository = categorySearchRepository;
    }

    /**
     * Save a category.
     *
     * @param categoryDTO the entity to save
     * @return the persisted entity
     */
    public CategoryDTO save(CategoryDTO categoryDTO) {
        log.debug("Request to save Category : {}", categoryDTO);
        Category category = categoryMapper.toEntity(categoryDTO);
        category = categoryRepository.save(category);
        CategoryDTO result = categoryMapper.toDto(category);
        categorySearchRepository.save(category);
        return result;
    }

    /**
     *  Get all the categories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Categories");
        return categoryRepository.findAll(pageable)
            .map(categoryMapper::toDto);
    }

    /**
     *  Get one category by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public CategoryDTO findOne(Integer id) {
        log.debug("Request to get Category : {}", id);
        Category category = categoryRepository.findOne(id);
        return categoryMapper.toDto(category);
    }

    /**
     *  Delete the  category by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Integer id) {
        log.debug("Request to delete Category : {}", id);
        categoryRepository.delete(id);
        categorySearchRepository.delete(id);
    }

    /**
     * Search for the category corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CategoryDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Categories for query {}", query);
        Page<Category> result = categorySearchRepository.search(queryStringQuery(query), pageable);
        return result.map(categoryMapper::toDto);
    }

    public CategoryDTO processExecuteData(Integer id, String param, CategoryDTO dto) {
        CategoryDTO r = dto;
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

    public Set<CategoryDTO> processExecuteListData(Integer id, String param, Set<CategoryDTO> dto) {
        Set<CategoryDTO> r = dto;
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
