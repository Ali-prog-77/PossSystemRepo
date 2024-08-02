import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, decrease, increase, reset } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cart.total'ı sayıya çevirin ve geçerli bir sayı olup olmadığını kontrol edin
  const total = Number(cart.total);
  const validTotal = isNaN(total) ? 0 : total;
  const taxAmount = (validTotal * cart.tax) / 100;
  const grandTotal = validTotal + taxAmount;

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-500 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-2 pt-2 overflow-y-auto py-2">
        {cart.cartItems.length === 0 ? (
          <li className="cart-item flex justify-center items-center py-8 text-gray-500">
            Sepetinizde ürün bulunmamaktadır.
          </li>
        ) : (
          cart.cartItems.map((item) => (
            <li
              key={item._id}
              className="cart-item flex justify-between items-start"
            >
              <div className="flex items-center w-full max-w-xs">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => dispatch(deleteCart({ _id: item._id }))}
                />
                <div className="cart-item-info flex flex-col ml-2 flex-grow">
                  <b className="text-base font-bold line-clamp-2">
                    {item.title}
                  </b>
                  <span>
                    {item.price} x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <Button
                  type="primary"
                  size="middle"
                  className="w-full mt-2 flex items-center justify-center !rounded-full"
                  icon={<PlusCircleOutlined />}
                  onClick={() => dispatch(increase({ _id: item._id }))}
                />
                <span className="font-bold w-6 inline-block text-center">
                  {item.quantity}
                </span>
                <Button
                  type="primary"
                  size="middle"
                  className="w-full mt-2 flex items-center justify-center !rounded-full"
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (window.confirm("Ürün Silinsin Mi?")) {
                        dispatch(decrease({ _id: item._id }));
                      }
                    } else {
                      dispatch(decrease({ _id: item._id }));
                    }
                  }}
                />
              </div>
            </li>
          )).reverse()
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{validTotal.toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-600">
              {taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-b">
            <div className="flex justify-between p-2 mt-4">
              <b className="text-xl text-green-600">Genel Toplam</b>
              <span className="text-xl">
                {grandTotal.toFixed(2)}
              </span>
            </div>
            <div className="py-2 px-2">
              <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={() => navigate("/shoppingcart")}
                disabled={cart.cartItems.length === 0}
              >
                Siparişe Git
              </Button>
            </div>
            <div className="px-2 mb-4">
              <Button
                type="primary"
                danger
                size="large"
                className="w-full"
                onClick={() => {
                  if (window.confirm("Emin Misiniz?")) {
                    dispatch(reset());
                    message.success("Sepet Başarıyla Temizlendi.");
                  }
                }}
                disabled={cart.cartItems.length === 0}
              >
                <ClearOutlined /> Temizle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
