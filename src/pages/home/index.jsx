import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("https://api.escuelajs.co/api/v1/products");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return (
    <div className="home">
      <h1>Products</h1>
      <div className="container-home">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data &&
          data.length > 0 &&
          data.map(({ id, title, price, category }) => (
            <div className="products" key={id}>
              <div className="img-container">
                <img className="img" src={category.image} alt={title} />
              </div>
              <div className="text-title">
                <h3>
                  {" "}
                  <span>ID</span>: {id}
                </h3>
                <h4>
                  <span>TITLE:</span> {title}
                </h4>
                <p>
                  <span>PRICE:</span> {price}$
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
