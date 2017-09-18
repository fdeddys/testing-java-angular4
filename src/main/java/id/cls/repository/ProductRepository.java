package id.cls.repository;

import id.cls.domain.Product;
import java.util.UUID;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 * atiila consulting
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("select distinct product from Product product left join fetch product.categories")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.categories where product.id =:id")
    Product findOneWithEagerRelationships(@Param("id") UUID id);
}

