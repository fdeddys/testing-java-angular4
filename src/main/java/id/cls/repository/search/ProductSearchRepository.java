package id.cls.repository.search;

import id.cls.domain.Product;
import java.util.UUID;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Product entity.
 */
public interface ProductSearchRepository extends ElasticsearchRepository<Product, UUID> {
}
