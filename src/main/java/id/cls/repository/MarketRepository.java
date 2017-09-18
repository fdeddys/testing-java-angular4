package id.cls.repository;

import id.cls.domain.Market;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Market entity.
 * atiila consulting
 */
@SuppressWarnings("unused")
@Repository
public interface MarketRepository extends JpaRepository<Market, Integer> {
}

