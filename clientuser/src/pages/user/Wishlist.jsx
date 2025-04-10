import React, { useEffect, useState } from "react";
import UserService from "../../services/user-api-services/UserService";
import toast, { Toaster } from "react-hot-toast";

const Wishlist = () => {
  const { getWishlistData, handleRemoveFromWishlist, addToCart } =
    UserService();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlistData();
      setWishlist(response?.wishlist);
    } catch (err) {
      toast.error("Failed to load wishlist");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await handleRemoveFromWishlist(productId);
      setWishlist(response?.wishlist);
    } catch (err) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    console.log("handleAddToCart", productId, quantity);
    try {
      const data = { productId, quantity };
      const response = await addToCart(data);
      console.log("Add to Cart Response:", response);
      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message || "Add to cart failed");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

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
                Wishlist<span>Shop</span>
              </h1>
            </div>
          </div>

          <div className="page-content">
            <div className="container">
              <table className="table table-wishlist table-mobile">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {wishlist?.map((data) => (
                    <tr key={data._id}>
                      <td className="product-col">
                        <div className="product">
                          <figure className="product-media">
                            <a href="#">
                              <img src={data?.images[0]} alt="Product" />
                            </a>
                          </figure>
                          <h3 className="product-title">
                            <a href="#">{data.name}</a>
                          </h3>
                        </div>
                      </td>
                      <td className="price-col">₹{data.product_price}</td>
                      <td className="stock-col">
                        <span className="in-stock">In stock</span>
                      </td>
                      <td className="action-col">
                        <button
                          className="btn btn-block btn-outline-primary-2"
                          onClick={() => handleAddToCart(data._id, 1)}
                        >
                          <i className="icon-cart-plus" /> Add to Cart
                        </button>
                      </td>
                      <td className="remove-col">
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(data._id)}
                        >
                          <i className="icon-close" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <button id="scroll-top" title="Back to Top">
        <i className="icon-arrow-up" />
      </button>
    </div>
  );
};

export default Wishlist;
