import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setdata] = useState([]);
  const [cart, setcart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setdata(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCartHandler = (item) => {
    setcart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setcart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="w-full">
      <nav className="bg-black text-white py-3 flex justify-between items-center rounded-full px-5 sm:px-3 m-4">
        <h1 className="text-3xl ml-3 sm:text-4xl">Looto</h1>
        <ul className="hidden sm:flex gap-10 text-lg sm:text-xl">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button
          className="relative bg-gray-500 px-4 sm:px-6 py-2 text-lg sm:text-2xl rounded-full"
          onClick={toggleCart}
        >
          Cart <i className="fa-solid fa-cart-shopping"></i>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-sm">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      <div className="p-5 flex flex-wrap gap-5 justify-around items-center">
        {data.map((elem) => (
          <div key={elem.id}>
            <div className="bg-white flex flex-col items-center w-[300px] p-3 rounded-xl hover:scale-105 border shadow-2xl">
              <img src={elem.image} className="h-40 hover:scale-105" alt="" />
              <h2 className="text-sm">{elem.title}</h2>
              <p className="text-xl mb-10">${elem.price}</p>
              <button
                className="bg-black w-full p-3 rounded-lg text-white"
                onClick={() => addToCartHandler(elem)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white w-[80%] max-h-[80%] overflow-auto rounded-lg p-5 relative">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full absolute top-5 right-5"
              onClick={toggleCart}
            >
              Close
            </button>
            <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((elem, index) => (
                  <div key={index} className="flex items-center justify-between mb-4 border-b pb-4">
                    <div className="flex items-center">
                      <img src={elem.image} className="h-20 mr-4" alt="" />
                      <div>
                        <h2 className="text-lg">{elem.title}</h2>
                        <p className="text-xl">${elem.price}</p>
                      </div>
                    </div>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-lg"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">
                    Total: ${calculateTotalPrice()}
                  </h3>
                  <button className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
