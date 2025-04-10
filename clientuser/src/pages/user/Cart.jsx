import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import UserService from "../../services/user-api-services/UserService";

const Cart = () => {
  const { getCartPageData, handleRemoveFromCart, handleCartQuantityChange } =
    UserService();

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCartPageData();

      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
    } catch (err) {}
  };

  const handleRemove = async (productId) => {
    try {
      const response = await handleRemoveFromCart(productId);

      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
    } catch (err) {}
  };

  const handleQuantityChange = async (change, quantity, productId) => {
    const newQuantity = quantity + change;

    if (newQuantity < 1) return; // Prevent quantity below 1
    console.log("handleQuantityChange");

    try {
      const data = {
        userId: "67bffce8e7dae9e3c14f3c15",
        quantity: newQuantity,
      };

      const response = await handleCartQuantityChange(productId, data);
      console.log(response.cart, "===response");
      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
    } catch (err) {}
  };

  return (
    <div>
      <div className="page-wrapper">
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: 'url("assets/images/page-header-bg.jpg")',
            }}
          >
            <div className="container">
              <h1 className="page-title">
                Shopping Cart<span>Shop</span>
              </h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}

          <div className="page-content">
            <div className="cart">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <table className="table table-cart table-mobile">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((data) => (
                          <tr key={data._id}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <a href="#">
                                    <img
                                      src={data?.product?.images[0]}
                                      alt="Product image"
                                    />
                                  </a>
                                </figure>
                                <h3 className="product-title">
                                  <a href="#">{data?.product?.name}</a>
                                </h3>
                                {/* End .product-title */}
                              </div>
                              {/* End .product */}
                            </td>
                            <td className="price-col">
                              ₹ {data?.product?.sale_price}
                            </td>
                            <td className="quantity-col">
                              <div className="cart-product-quantity d-flex align-items-center justify-content-center gap-2">
                                <span
                                  className="quantity-btn"
                                  onClick={() =>
                                    handleQuantityChange(
                                      -1,
                                      data.quantity,
                                      data.product._id
                                    )
                                  }
                                >
                                  -
                                </span>
                                <span className="quantity-value">
                                  {data.quantity}
                                </span>
                                <span
                                  className="quantity-btn"
                                  onClick={() =>
                                    handleQuantityChange(
                                      1,
                                      data.quantity,
                                      data.product._id
                                    )
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </td>
                            <td className="total-col">
                              ₹ {data.quantity * data.product.sale_price}
                            </td>
                            <td className="remove-col">
                              <button
                                className="btn-remove"
                                onClick={() => handleRemove(data.product._id)}
                              >
                                <i className="icon-close" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* End .table table-wishlist */}
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary summary-cart">
                      <h3 className="summary-title">Cart Total</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>₹ {cartTotal}</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="free-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="free-shipping"
                                >
                                  Free Shipping
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>₹ 0.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="standart-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="standart-shipping"
                                >
                                  Standart:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>₹ 0.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="express-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="express-shipping"
                                >
                                  Express:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>₹ 0.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}

                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>₹ {cartTotal}</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <Link
                        to="/checkout"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        PROCEED TO CHECKOUT
                      </Link>
                    </div>
                    {/* End .summary */}
                    <Link
                      to="/"
                      className="btn btn-outline-dark-2 btn-block mb-3"
                    >
                      <span>CONTINUE SHOPPING</span>
                      <i className="icon-refresh" />
                    </Link>
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </div>
            {/* End .cart */}
          </div>
          {/* End .page-content */}
        </main>
        {/* End .main */}
      </div>
      {/* End .page-wrapper */}
      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up" />
      </button>

      {/* Plugins JS File */}
      {/* Main JS File */}
      {/* molla/cart.html  22 Nov 2019 09:55:06 GMT */}
    </div>
  );
};

export default Cart;
