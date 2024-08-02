import React from 'react';
import Header from '../components/header/Header';
import EditProducts from '../components/proucts/EditProducts';

const Products = () => {
    return (
        <>
          <Header></Header>
          <div className='px-6'>
            <h1 className='text-4xl font-bold text-center mb-4'>Ürünler</h1>
            </div>  
            <EditProducts></EditProducts>
        </>
    );
};

export default Products;