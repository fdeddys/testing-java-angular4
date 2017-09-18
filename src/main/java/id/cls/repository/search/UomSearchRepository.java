package id.cls.repository.search;

import id.cls.domain.Uom;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Uom entity.
 */
public interface UomSearchRepository extends ElasticsearchRepository<Uom, String> {
}
