import { Modal, Form, Input, Select, Card, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateBill = ({ isModalOpen, setIsModalOpen, cartSummary }) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });

      if (res.ok) {
        message.success("Fatura başarıyla oluşturuldu");
        setIsModalOpen(false);
        dispatch(reset());
        navigate("/bills");
      } else {
        throw new Error("Fatura oluşturulamadı");
      }
    } catch (error) {
      message.error("Fatura oluşturulamadı");
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit(); // Formu gönderir ve onFinish fonksiyonunu tetikler
  };

  return (
    <>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Oluştur"
        cancelText="İptal"
        okButtonProps={{ disabled: cart.cartItems.length === 0 }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_bill"
          onFinish={onFinish}
        >
          <Form.Item
            name="customerName"
            label="Müşteri Adı"
            rules={[
              { required: true, message: "Lütfen müşteri adını giriniz" },
            ]}
          >
            <Input placeholder="Müşteri Adı Yazınız" />
          </Form.Item>
          <Form.Item
            name="customerPhoneNumber"
            label="Tel No"
            rules={[
              { required: true, message: "Lütfen telefon numarasını giriniz" },
            ]}
          >
            <Input placeholder="Tel No Yazınız" maxLength={11} />
          </Form.Item>
          <Form.Item
            name="paymentMode"
            label="Ödeme Şekli"
            rules={[
              { required: true, message: "Lütfen ödeme şeklini seçiniz" },
            ]}
          >
            <Select placeholder="Ödeme Şekli Seçin">
              <Option value="Nakit">Nakit</Option>
              <Option value="Kredi Kartı">Kredi Kartı</Option>
            </Select>
          </Form.Item>
        </Form>
        <Card className="mt-4">
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
        </Card>
      </Modal>
    </>
  );
};

export default CreateBill;
