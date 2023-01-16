import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@/layouts/Grid';
import ProductCard from '../ProductCard';
import Button from '../common/Button';

import { getListProducts } from '../../services/Products';
import { useLoading } from '@/contexts/LoadingProvider';

import './index.css';

const ListProducts = (props) => {
  const { keyword } = props;
  const [products, setProducts] = useState([]);
  const { loading, setLoading } = useLoading();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getListProducts(pageNumber, keyword);
        data ? setProducts({ ...data }) : setProducts([]);
      } catch {
        alert('Error loading data, please reload the page');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [keyword, pageNumber]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="list-products">
      {
        loading
          ? (
            <p className="loading">Loading...</p>
          )
          : (
            <Grid columns="3" rowGap="large" columnGap="large">
              {products && products.map((item) => (
                <Link to={`/products/${item.id}`} key={item.id}>
                  <ProductCard product={item} />
                </Link>
              ))}
            </Grid>
          )
      }
      <Button
        type="button"
        onClick={handleLoadMore}
        className="btn-primary btn-large"
        text="load more"
      />
    </div>
  );
};

export default ListProducts;
