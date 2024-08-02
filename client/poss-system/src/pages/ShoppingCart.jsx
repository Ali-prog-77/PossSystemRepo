import { Button, Card, Table, message } from "antd";
import React, { useState, useEffect } from "react"; // useEffect import edilmediği için hata alıyorsunuz
import CreateBill from "../components/cart/CreateBill";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, decrease, increase, reset } from "../redux/CartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const ShoppingCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Cart Items:", cart.cartItems);
  }, [cart.cartItems]);

  const columns = [
    {
      title: "Resim Görseli",
      dataIndex: "img",
      key: "img",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
      width: 100,
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi.");
                  }
                } else {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
      width: 120,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
      width: 120,
    },
    {
      title: "Sil",
      render: (__, record) => {
        return (
          <Button
            type="link"
            danger
            onClick={() => dispatch(deleteCart(record))}
          >
            SİL
          </Button>
        );
      },
      width: 120,
    },
  ];

  const cartSummary = {
    subtotal: cart.total,
    tax: (cart.total * 0.08).toFixed(2),
    total: (cart.total * 1.08).toFixed(2),
  };

  return (
    <>
      <Header />

      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
        />

        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cartSummary.subtotal}₺</span>
            </div>

            <div className="flex justify-between my-2">
              <span>KDV %8</span>
              <span className="text-red-600">{cartSummary.tax}₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>{cartSummary.total}₺</b>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                className="mt-2 w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Siparişi Oluştur
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <CreateBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cartSummary={cartSummary}
      />
    </>
  );
};

export default ShoppingCart;
