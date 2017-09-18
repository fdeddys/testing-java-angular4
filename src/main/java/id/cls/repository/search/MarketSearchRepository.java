package id.cls.repository.search;

import id.cls.domain.Market;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Market entity.
 */
public interface MarketSearchRepository extends ElasticsearchRepository<Market, Integer> {
}
