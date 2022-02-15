import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getItemsFetch } from "./Slices/productsSlice";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Cart from "./Components/Cart";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
