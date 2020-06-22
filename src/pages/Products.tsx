import React from 'react';

import { connect } from 'umi';
import ProductList from '@/components/ProductList';

// @ts-ignore
const Products = ({ dispatch, products }) => {
  function handleDelete(id: any) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// @ts-ignore
export default connect(({ products }) => ({
  products,
}))(Products);
