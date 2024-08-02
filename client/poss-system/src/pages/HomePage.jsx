import React, { useEffect, useState } from 'react';
import { Spin } from "antd";
import Categories from "../components/categories/Categories";
import Products from "../components/proucts/Products";
import CartTotal from "../components/cart/CartTotal";
import Header from "../components/header/Header";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search,setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all-categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all-products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
      <div className="home-page px-6 flex justify-between gap-10 md:flex-row flex-col md:pb-0 pb-24 h-screen">
      <div className="categories overflow-auto max-h-[calc(100vh-_-112px)] md:pb-72 md:mr-0 -mr-[24px]">
        <Categories categories={categories}
          setCategories={setCategories}
          setFiltered={setFiltered}
          products={products} />
      </div>
      <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
        <Products
          categories={categories}
          filtered={filtered}
          products={products}
          setProducts={setProducts}
          search={search}
        />
      </div>
      <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px]">
        <CartTotal />
      </div>
    </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default HomePage;