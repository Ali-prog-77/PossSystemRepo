import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, message, Space, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all-products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
    }
  }, [editingProduct, form]);

  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/delete-product",
        {
          method: "DELETE",
          body: JSON.stringify({ productId: record._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (response.ok) {
        message.success("Ürün başarıyla silindi.");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== record._id)
        );
      } else {
        message.error("Ürün silinirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Ürün silinirken bir hata oluştu.");
    }
  };

  const handleFinish = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/update-product",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, productId: editingProduct._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (response.ok) {
        message.success("Ürün başarıyla güncellendi.");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProduct._id
              ? { ...product, ...values }
              : product
          )
        );
        setEditingProduct(null);
        form.resetFields();
        setIsModalVisible(false);
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Ürün güncellenirken bir hata oluştu.");
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (text) => <img src={text} alt="Product" style={{ width: 100 }} />
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />}>
            Düzenle
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <Table columns={columns} dataSource={products} rowKey="_id" bordered />

        <Modal
          title="Ürünü Düzenle"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            initialValues={editingProduct}
          >
            <Form.Item
              name="title"
              label="Ürün Adı"
              rules={[
                {
                  required: true,
                  message: "Ürün adı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="img"
              label="Ürün Görseli"
              rules={[
                {
                  required: true,
                  message: "Ürün görseli boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Ürün Fiyatı"
              rules={[
                {
                  required: true,
                  message: "Ürün fiyatı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Kategori"
              rules={[
                {
                  required: true,
                  message: "Kategori boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
              <Button
                onClick={() => setIsModalVisible(false)}
                style={{ marginLeft: 8 }}
              >
                İptal
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default EditProducts;
