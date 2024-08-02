import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/CartSlice";
import { message } from "antd";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Ürün Sepete Eklendi.");
  };

  console.log(cart.cartItems);
  return (
    <>
      <div
        key={item._id}
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none h-72 flex flex-col"
        onClick={handleClick}
      >
        <div className="product-img hover:opacity-90 flex-1 overflow-hidden">
          <img
            src={item.img}
            alt=""
            className="h-200 w-full object-cover"
          />
        </div>
        <div className="product-info flex flex-col p-3">
          <span className="font-bold">{item.title}</span>
          <span>{item.price}₺</span>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
