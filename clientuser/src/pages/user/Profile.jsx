import React, { useEffect, useState } from "react";
import UserService from "../../services/user-api-services/UserService";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { postAddress, getAddress, getUserData, putSelectAddress } =
    UserService();
  const { auth } = useAuth();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allAddress, setAllAddress] = useState([]);
  const [userDetails, setUserDetails] = useState(auth);

  console.log(userDetails, "====userDetails");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const response = await getAddress();
      setAllAddress(response?.address);
    } catch (error) {}
  };

  const handleSelectAddress = async (addressId) => {
    console.log("fetchAddress");

    try {
      const response = await putSelectAddress(addressId);
      window.location.reload();
    } catch (error) {}
  };

  const handleSubmitAddress = async () => {
    try {
      const response = await postAddress(address);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const orders = [
    {
      id: "#001",
      productName: "Product A",
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJj__5FhigmsOiSOt0TpWvfO1THnUXX0X65g&s",
      status: "Processing",
      total: "$120.00",
      items: 2,
      details: [
        { name: "Product A", qty: 1, price: "$60.00" },
        { name: "Product B", qty: 1, price: "$60.00" },
      ],
    },
    {
      id: "#002",
      productName: "Product C",
      productImage: "https://via.placeholder.com/50",
      status: "Completed",
      total: "$75.50",
      items: 1,
      details: [{ name: "Product C", qty: 1, price: "$75.50" }],
    },
    {
      id: "#003",
      productName: "Product D",
      productImage: "https://via.placeholder.com/50",
      status: "Cancelled",
      total: "$50.00",
      items: 3,
      details: [
        { name: "Product D", qty: 2, price: "$20.00" },
        { name: "Product E", qty: 1, price: "$30.00" },
      ],
    },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({
      ...address,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  console.log(allAddress, "===========allAddress");

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
                My Account<span>Shop</span>
              </h1>
            </div>
          </div>

          <div className="page-content">
            <div className="dashboard">
              <div className="container">
                <div className="row">
                  <aside className="col-md-4 col-lg-3">
                    <ul
                      className="nav nav-dashboard flex-column mb-3 mb-md-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#tab-account"
                        >
                          Account Details
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tab-orders"
                        >
                          Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tab-address"
                        >
                          Addresses
                        </a>
                      </li>
                    </ul>
                  </aside>

                  <div className="col-md-8 col-lg-9">
                    <div className="tab-content">
                      {/* Orders Section */}
                      <div className="tab-pane fade" id="tab-orders">
                        {orders.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th className="text-center">Product Name</th>
                                  <th className="text-center">Product Image</th>
                                  <th className="text-center">Status</th>
                                  <th className="text-center">Total</th>
                                  <th className="text-center">Items</th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((order) => (
                                  <tr key={order.id}>
                                    <td className="text-center">
                                      {order.productName}
                                    </td>
                                    <td
                                      style={{ width: "150px", height: "50px" }}
                                    >
                                      <img
                                        src={order.productImage}
                                        alt={order.productName}
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                          objectFit: "contain",
                                        }}
                                      />
                                    </td>
                                    <td className="text-center">
                                      {order.status}
                                    </td>
                                    <td className="text-center">
                                      {order.total}
                                    </td>
                                    <td className="text-center">
                                      {order.items}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        className="btn btn-primary btn-sm"
                                        data-toggle="modal"
                                        data-target="#orderDetailsModal"
                                        onClick={() => handleViewDetails(order)}
                                      >
                                        View Details
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p>No orders have been made yet.</p>
                        )}
                      </div>

                      {/* Address Section */}
                      <div className="tab-pane fade" id="tab-address">
                        <p>
                          The following addresses will be used on the checkout
                          page by default.
                        </p>
                        <div className="row">
                          {allAddress?.map((address, index) => (
                            <div className="col-lg-6" key={index}>
                              <div className="card card-dashboard">
                                <div className="card-body">
                                  <h3 className="card-title">
                                    Billing Address
                                  </h3>
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
                          ))}
                        </div>

                        {/* ****************** */}
                        <div className="col-lg-12">
                          <h2 className="checkout-title">
                            Add New Billing Details
                          </h2>
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
                        {/* End .col-lg-9 */}
                        {/* ****************** */}
                      </div>

                      {/* Account Details Section (Default Open) */}
                      <div
                        className="tab-pane fade show active"
                        id="tab-account"
                      >
                        <form>
                          <label>Name *</label>
                          <input
                            type="text"
                            value={userDetails?.name}
                            className="form-control"
                            required
                          />
                          <label>Mobile number *</label>
                          <input
                            type="text"
                            value={userDetails?.phone}
                            className="form-control"
                            required
                          />
                          <label>Email Address *</label>
                          <input
                            type="email"
                            value={userDetails?.email}
                            className="form-control"
                            required
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      <div className="modal fade" id="orderDetailsModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {selectedOrder ? (
                <div>
                  <img
                    src={selectedOrder.productImage}
                    alt={selectedOrder.productName}
                    width="100"
                  />
                  <p>
                    <strong>Product Name:</strong> {selectedOrder.productName}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                  <p>
                    <strong>Total:</strong> {selectedOrder.total}
                  </p>
                  <h6>Items:</h6>
                  <ul>
                    {selectedOrder.details.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.qty} x {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up" />
      </button>
    </div>
  );
};

export default Dashboard;
