import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const url = "https://ecomm-backend-mocha.vercel.app/"
  // const url = "http://localhost:5000/"

  const addProduct = async () => {
    
    console.log(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.log(name, price, category, company);
    const userData = JSON.parse(localStorage.getItem("user"));
   
    // let obj = {             
    //   "key": value,
    //   key2: value2,
    // };
//array of objects
    // let arr = [
    //   { key: value, key2: value2 },
    //   { key: value, key2: value2 },
    // ];

    let data = {
      name: name,
      price: price,
      category: category,
      company: company,
      userID: userData._id,
    };

    let result = await fetch(url+"add-product", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputbox"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputbox"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputbox"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputbox"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProduct} className="appbutton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
