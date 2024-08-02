// AddCategory.js
import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddCategory = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (response.ok) {
        const newCategory = await response.json();
        message.success("Kategori başarıyla eklendi.");
        form.resetFields();
        setCategories((prevCategories) => [...prevCategories, values]);
      } else {
        message.error("Kategori eklenirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Kategori eklenirken bir hata oluştu.");
    }
    setIsAddModalOpen(false); // Modal'ı kapat
  };

  return (
    <>
      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <span>
          <PlusOutlined />
        </span>
      </li>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[{ required: true, message: "Kategori Boş Bırakılamaz!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategory;
