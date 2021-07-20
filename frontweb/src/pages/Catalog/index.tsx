import { Product } from 'types/product';
import ProductCard from 'components/ProductCard';
import Pagination from 'components/Pagination';
import { Link } from 'react-router-dom';
import CardLoader from './CardLoader';

import './styles.css';
import { useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { useEffect } from 'react';
import { AxiosParams } from 'types/vendor/axios';
import { BASE_URL } from 'util/requests';
import axios from 'axios';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/products`,
      params: {
        page: 0,
        size: 12,
      },
    };

    setIsLoading(true);

    axios(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de Produtos</h1>
      </div>

      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to="/products/1">
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        )}

        <div className="row">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
