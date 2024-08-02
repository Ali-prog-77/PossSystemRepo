import React, { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import "./category.css";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [categoryTitle, setCategoryTitle] = useState(
    "66967225f004cc73e183d4e6"
  );

  useEffect(() => {
    if (categoryTitle === "66967225f004cc73e183d4e6") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      {categories.map((item) => (
        <li
          className="category-item"
          key={item._id}
          onClick={() => setCategoryTitle(item._id)}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <AddCategory categories={categories} setCategories={setCategories} />
      <EditCategory categories={categories} setCategories={setCategories} />
    </ul>
  );
};

export default Categories;
