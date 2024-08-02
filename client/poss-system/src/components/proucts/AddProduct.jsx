// AddProduct.js
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

const AddProduct = ({ isModalOpen, handleModalCancel, setProducts }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/categories/get-all-categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/add-product",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        message.success("Ürün başarıyla eklendi.");
        form.resetFields();
        setProducts((prevProducts) => [...prevProducts, values ]);
        handleModalCancel();
      } else {
        message.error("Ürün eklenirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Ürün eklenirken bir hata oluştu.");
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isModalOpen}
      onCancel={handleModalCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün adı giriniz!" }]}
        >
          <Input placeholder="Ürün Adı Giriniz" />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[{ required: true, message: "Ürün görseli linkini giriniz!" }]}
        >
          <Input placeholder="Ürün Görseli Linkini Giriniz" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[{ required: true, message: "Ürün fiyatı giriniz!" }]}
        >
          <Input placeholder="Ürün Fiyatı Giriniz" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Kategori"
          rules={[{ required: true, message: "Kategori seçiniz!" }]}
        >
          <Select placeholder="Kategori Seçiniz">
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
