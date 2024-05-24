import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [userInput, setUserInput] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    categories: false,
    price: false,
    image: false,
    description: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    const completeUserInput = {
      title: userInput.name,
      price: parseFloat(userInput.price),
      description: userInput.description,
      categoryId: parseInt(selectedCategory, 10),
      images: [userInput.image],
    };

    Object.keys(completeUserInput).forEach((key) => {
      if (!completeUserInput[key] || completeUserInput[key].length === 0) {
        setErrors((prev) => ({ ...prev, [key]: true }));
        hasError = true;
      } else {
        setErrors((prev) => ({ ...prev, [key]: false }));
      }
    });

    if (hasError) {
      console.log("Form validation failed:", completeUserInput);
      return;
    }

    console.log("Data to be submitted:", completeUserInput);

    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/products",
        completeUserInput
      );
      const newProduct = response.data;

      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setUserInput({
        name: "",
        price: "",
        image: "",
        description: "",
      });
      setSelectedCategory("");
      console.log("Product successfully created:", newProduct);

      navigate("/layout/products");
    } catch (error) {
      console.error("Error posting product:", error);
      alert("Error saving the product. Check console for more information.");
    }
  };

  return (
    <section>
      <p className={style.pages}>
        Pages<span>/Dashboard</span>
      </p>
      <div className={style.container}>
        <div className={style.title}>
          <h2 style={{ color: "white", padding: "30px" }}>Create Products</h2>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              value={userInput.name}
              className={`${style.input} ${errors.name && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              id="name"
              placeholder="Product name"
            />
            {errors.name && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="select">
            Categories:
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleChange}
              className={`${errors.categories && style.error}`}
            >
              <option value="">--Please choose an option--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categories && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="price">
            Price:
            <input
              value={userInput.price}
              className={`${style.input} ${errors.price && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, price: e.target.value }))
              }
              type="text"
              id="price"
              placeholder="Product price"
            />
            {errors.price && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>
          <label htmlFor="image">
            Image:
            <input
              value={userInput.image}
              className={`${style.input} ${errors.image && style.error}`}
              onChange={(e) =>
                setUserInput((prev) => ({ ...prev, image: e.target.value }))
              }
              type="text"
              id="image"
              placeholder="Product image link"
            />
            {errors.image && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>

          <label htmlFor="description">
            Description:
            <textarea
              value={userInput.description}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={`${style.textarea} ${
                errors.description && style.error
              }`}
              placeholder="Product Description"
            ></textarea>
            {errors.description && (
              <span className={style.errorMessage}>
                Bu joy bo'sh qolib ketti!
              </span>
            )}
          </label>

          <button type="submit" className={style.button}>
            CREATE
          </button>
        </form>
      </div>
    </section>
  );
}
