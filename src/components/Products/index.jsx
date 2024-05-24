import React, { useEffect, useState } from "react";
import "./style.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const fixedProducts = storedProducts.map((product) => ({
      ...product,
      images: JSON.parse(product.images),
    }));
    setProducts(fixedProducts);
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="products_pr">
      <p className="prPage">
        Pages<span>/Products</span>
      </p>
      <div className="container_products">
        <h3 className="pro3">Products</h3>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product_category">
              <img
                src={product.images[0]}
                alt={product.title}
                width={370}
                height={191}
              />
              <p className="idOfcategory">Id: {product.id}</p>
              <h3 className="nameOfcategory">Product name: {product.title}</h3>
              <h4 className="categOfcategory">
                Product category: {product.category.name}
              </h4>
              <h3 className="priceOfcategory">
                Product price: ${product.price}
              </h3>
              <p className="descOfcategory">
                Product description: {product.description}
              </p>
              <button className="btn" onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
