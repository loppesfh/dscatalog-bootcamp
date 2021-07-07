package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	@Query("select distinct obj from Product obj inner join obj.categories cats "
			+ "where (coalesce(:categories) is null or cats in :categories) and "  //FORMA NORMAL CONJUNTIVA
			+ "(lower(obj.name) like lower(concat('%',:name,'%')))")
	Page<Product> find(List<Category> categories, String name, Pageable pageable);
	
	@Query("select obj from Product obj join fetch obj.categories "
			+ "where obj in :products")
	List<Product> findProductWithCategories(List<Product> products);
}
