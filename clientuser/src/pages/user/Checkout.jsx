import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import UserService from "../../services/user-api-services/UserService";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    getCartPageData,
    postOrder,
    postAddress,
    getAddress,
    checkPorductAvailability,
  } = UserService();

  const [products, setProducts] = useState([]);
  const [allAddress, setAllAddress] = useState([]);

  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: true,
  });

  const [orderData, setOrderData] = useState({
    paymentMethod: "UPI",
    totalPrice: "",
  });

  useEffect(() => {
    setOrderData((prevState) => ({
      ...prevState, // Spread previous state
      totalPrice: total,
    }));
  }, [address, products, total]);

  useEffect(() => {
    getData();
    fetchAddress();
  }, []);

  const getData = async () => {
    try {
      const response = await getCartPageData();
      setProducts(response?.cart);
      setTotal(response?.cartTotal);
      setAddress((prevState) => ({
        ...prevState, // Spread previous state
        ...response?.address,
      }));
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({
      ...address,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchAddress = async () => {
    console.log("fetchAddress");

    try {
      const response = await getAddress();
      setAllAddress(response?.address);
    } catch (error) {}
  };

  const handleSubmitAddress = async () => {
    try {
      const response = await postAddress(address);
      console.log("Address added successfully:", response);

      if (response.success) {
        toast.success("Address added successfully");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const sendOrder = async () => {
    try {
      const response = await postOrder({ paymentMethod });

      if (response?.success) {
        console.log("Order placed successfully:", response);

        if (response?.paymentMethod == "UPI") {
          console.log("Razorpay Order =========  ", response?.razorpayOrder);

          handlePayment(response?.razorpayOrder);
        } else {
          console.log("COD Order =========  ", response);

          navigate("/order-success");
        }
      }
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (data) => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert(
          "Failed to load Razorpay SDK. Please check your internet connection."
        );
        return;
      }

      // Initialize Razorpay
      const options = {
        key: "rzp_test_zVBhrL4CVfIezv", // Replace with Razorpay Key ID
        amount: data.amount,
        currency: "INR",
        name: "Your E-commerce",
        description: "Purchase Description",
        order_id: data.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          alert("Payment Successful!");
          // Call backend to verify payment (optional)
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  console.log(products, "===========products");

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

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
                Checkout<span>Shop</span>
              </h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav"></nav>
          {/* End .breadcrumb-nav */}

          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="cart-bottom">
                  <div className="cart-discount">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          required
                          placeholder="coupon code"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary-2"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
                        {/* .End .input-group-append */}
                      </div>
                      {/* End .input-group */}
                    </form>
                  </div>
                  {/* End .cart-discount */}
                </div>
                {/* End .cart-bottom */}
              </div>
            </div>
          </div>

          <div className="page-content">
            <div className="checkout">
              <div className="container">
                <form action="#">
                  <div className="row">
                    <aside className="col-lg-3">
                      <div className="summary">
                        <h3 className="summary-title">Your Order</h3>
                        {/* End .summary-title */}
                        <table className="table table-summary">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products?.map((product, index) => (
                              <tr>
                                <td>
                                  <a href="#">{product.product.name}</a>
                                </td>
                                <td>
                                  ₹{" "}
                                  {product.product.sale_price *
                                    product?.quantity}
                                </td>
                              </tr>
                            ))}
                            <tr className="summary-subtotal">
                              <td>Subtotal:</td>
                              <td>₹ {total}</td>
                            </tr>
                            {/* End .summary-subtotal */}
                            <tr>
                              <td>Shipping:</td>
                              <td>Free shipping</td>
                            </tr>
                            <tr className="summary-total">
                              <td>Total:</td>
                              <td>${total}</td>
                            </tr>
                            {/* End .summary-total */}
                          </tbody>
                        </table>
                        {/* End .table table-summary */}
                        <div
                          className="accordion-summary"
                          id="accordion-payment"
                        >
                          <div className="space-y-3">
                            <label className="flex items-center space-x-3 text-gray-700">
                              <input
                                type="radio"
                                name="payment"
                                value="gpay"
                                checked={paymentMethod === "UPI"}
                                onChange={() => setPaymentMethod("UPI")}
                                className="form-radio h-4 w-4 text-blue-500"
                              />
                              <span>Google Pay / Phone Pay</span>
                            </label>

                            <label className="flex items-center space-x-3 text-gray-700">
                              <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === "COD"}
                                onChange={() => setPaymentMethod("COD")}
                                className="form-radio h-4 w-4 text-blue-500"
                              />
                              <span>Cash on Delivery</span>
                            </label>
                          </div>
                          {/* End .card */}
                        </div>
                        {/* End .accordion */}

                        <button
                          type="button"
                          className="btn btn-outline-primary-2 btn-order btn-block"
                          onClick={() => sendOrder()}
                        >
                          <span className="btn-text">Place Order</span>
                          <span className="btn-hover-text">
                            Proceed to Checkout
                          </span>
                        </button>
                      </div>
                      {/* End .summary */}
                    </aside>
                    {/* End .col-lg-3 */}
                    <div className="col-lg-4">
                      <h2 className="checkout-title">Billing Details</h2>
                      {/* End .checkout-title */}
                      <div className="row">
                        <div className="col-sm-6">
                          <label>Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                        <div className="col-sm-6">
                          <label>Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                      </div>
                      {/* End .row */}
                      <label>Country *</label>
                      <input
                        type="text"
                        name="country"
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                      <label>Street address *</label>
                      <input
                        type="text"
                        name="street"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="House number and Street name"
                        required
                      />
                      <div className="row">
                        <div className="col-sm-6">
                          <label>Town / City *</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                        <div className="col-sm-6">
                          <label>State *</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                      </div>
                      {/* End .row */}
                      <div className="row">
                        <div className="col-sm-6">
                          <label>Postcode / ZIP *</label>
                          <input
                            type="text"
                            name="zip"
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                        <div className="col-sm-6">
                          <label>Email address *</label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                      </div>
                      {/* End .row */}

                      <div className="container-fluid bg-light py-2">
                        <div className="d-flex justify-content-center ">
                          <div
                            className="text-white  text-center"
                            style={{ width: "150px" }}
                          >
                            <button
                              type="button"
                              onClick={handleSubmitAddress}
                              className="btn btn-outline-primary-2 btn-order btn-block"
                            >
                              SAVE ADDRESS
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End .col-lg-5 */}

                    {allAddress?.map((address, index) => {
                      if (address.isDefault) {
                        return (
                          <div className="col-lg-4" key={index}>
                            <div className="card card-dashboard">
                              <div className="card-body">
                                <h3 className="card-title">Billing Address</h3>
                                <p>
                                  {address.fullName}
                                  <br />
                                  {address.city}
                                  <br />
                                  {address.street}
                                  <br />
                                  {address.country}
                                  <br />
                                  {address.phone}
                                  <br />
                                  <a href="#">
                                    Edit <i className="icon-edit" />
                                  </a>
                                </p>
                                {/* Select button */}
                                {address.isDefault ? (
                                  <button className="btn btn-success mt-2">
                                    Selected Address
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary mt-2"
                                    onClick={() =>
                                      handleSelectAddress(address._id)
                                    }
                                  >
                                    Select
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  {/* End .row */}
                </form>
              </div>
              {/* End .container */}
            </div>
            {/* End .checkout */}
          </div>
          {/* End .page-content */}
        </main>
        {/* End .main */}
      </div>
      {/* End .page-wrapper */}
      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up" />
      </button>
      {/* Mobile Menu */}

      {/* End .mobile-menu-container */}
      {/* Sign in / Register Modal */}

      {/* End .modal */}
      {/* Plugins JS File */}
      {/* Main JS File */}
      {/* molla/checkout.html  22 Nov 2019 09:55:06 GMT */}
    </div>
  );
};

export default Checkout;
