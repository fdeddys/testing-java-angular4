package id.cls.repository;

import id.cls.domain.Uom;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Uom entity.
 * atiila consulting
 */
@SuppressWarnings("unused")
@Repository
public interface UomRepository extends JpaRepository<Uom, String> {
}

