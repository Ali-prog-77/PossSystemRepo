import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";

const Products = ({
  categories,
  filtered,
  products,
  setProducts,
  setFiltered,
  search,
}) => {
  // const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/get-all-products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-wrapper grid grid-cols-card gap-4 object-cover">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center text-white text-2xl hover:opacity-90 min-h-[180px]"
        onClick={handleAddClick}
      >
        <PlusOutlined />
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-700 flex justify-center items-center text-white text-2xl hover:opacity-90 min-h-[180px]">
        <EditOutlined onClick={() => navigate("/products")} />
      </div>

      <AddProduct
        isModalOpen={isModalOpen}
        handleModalCancel={handleModalCancel}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
