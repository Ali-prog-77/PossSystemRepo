import React, { useState, useEffect } from "react";
import { Form, Modal, Table, Button, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditCategory = ({ categories, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue(editingCategory);
    }
  }, [editingCategory, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories/delete-category",
        {
          method: "DELETE",
          body: JSON.stringify({ categoryId: record._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== record._id)
        );
      } else {
        message.error("Kategori silinirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Kategori silinirken bir hata oluştu.");
    }
  };

  const handleFinish = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingCategory._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === editingCategory._id
              ? { ...category, ...values }
              : category
          )
        );
        handleCancel();
      } else {
        message.error("Kategori güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Kategori güncellenirken bir hata oluştu.");
    }
  };

  const columns = [
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Düzenle</Button>
          <Button danger onClick={() => handleDelete(record)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsModalOpen(true)}
      >
        <span>
          <EditOutlined className="md:text-2xl" />
        </span>
      </li>
      <Modal
        title="Kategori Düzenle"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Table columns={columns} dataSource={categories} rowKey="_id" />
        {editingCategory && (
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            style={{ marginTop: 20 }}
          >
            <Form.Item
              name="title"
              label="Kategori Başlığı"
              rules={[
                {
                  required: true,
                  message: "Kategori başlığı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                İptal
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default EditCategory;
