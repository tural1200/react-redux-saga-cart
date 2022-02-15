import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeCart,
  removeFromCart,
} from "../Slices/addToCartSlice";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.cartTotalAmount).toFixed(
    2
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const removeHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const deacreaseHandler = (item) => {
    dispatch(decreaseCart(item));
  };

  const increaseHandler = (item) => {
    dispatch(addToCart(item));
  };

  const removeCartHandler = () => {
    dispatch(removeCart());
  };


  return (
    <Container fluid>
      <Container fluid className="cart-titles">
        <h3 className="product-title">products</h3>
        <h3 className="product-price">price</h3>
        <h3 className="product-qty">quantity</h3>
      </Container>
      <div className="cart-items-container">
        {cart.map((item) => (
          <div key={item.id}>
            <div className="item-container">
              <div className="product">
                <div className="product-img">
                  <img src={item.image} />
                </div>
                <div className="product-details">
                  <div className="product-title">
                    <span>{item.title}</span>
                  </div>
                  <div className="product-btn">
                    <Button onClick={() => deacreaseHandler(item)}>-</Button>
                    <Button onClick={() => removeHandler(item)}>remove</Button>
                    <Button onClick={() => increaseHandler(item)}>+</Button>
                  </div>
                </div>
              </div>
              <div className="product-price">
                <span>{item.price}$</span>
              </div>
              <div className="product-qty">
                <span>{item.productQuantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 ? (
        <Button onClick={() => removeCartHandler()}>remove cart</Button>
      ) : (
        <span>cart is empty</span>
      )}
      <div className="total-price">
        <span>Total price:</span>
        {totalPrice}$
      </div>
    </Container>
  );
}

export default Cart;
