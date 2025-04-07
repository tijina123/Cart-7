import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Cart.css";


const Cart = () => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const fetchCart = async (userId = '67bffce8e7dae9e3c14f3c15') => {
      try {

        const response = await axios.get(`http://localhost:3000/cart/${userId}`);
        console.log(response, "====response");

        setCart(response.data.cart);
      } catch (err) {
        // setError(err.response?.data?.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    };

    fetchCart();
  }, []);

  console.log(cart, "====cart");


  const handleRemove = async (productId) => {
    console.log("productId");
    console.log(productId);

    // setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3000/cart/${productId}`, {
        data: { userId: '67bffce8e7dae9e3c14f3c15' }, // Send userId in request body
      });

      if (response.status === 200) {
        // Update the cart in state after successful deletion
        // setCartItems(cartItems.filter(item => item.product !== productId));
        location.reload();
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      // setLoading(false);
    }
  };

  // const handleQuantityChange = (change) => {
  //   setQuantity((prev) => {
  //     const newValue = prev + change;
  //     return newValue >= 1 ? newValue : prev; 
  //   });
  // };

  const handleQuantityChange = async (change,quantity,productId) => {
    const newQuantity = quantity + change;
    // console.log("handleQuantityChange");
    console.log(newQuantity );

    if (newQuantity < 1) return; // Prevent quantity below 1
console.log("handleQuantityChange");

    // setLoading(true);
    // setError("");

    try {
      const response = await axios.put(`http://localhost:3000/cart/${productId}`, {
        userId:'67bffce8e7dae9e3c14f3c15',
        quantity: newQuantity,
      });

      console.log("Cart Updated:", response.data);
    } catch (err) {
      // setError("Failed to update cart");
      //setQuantity(quantity); // Reset quantity on failure
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div>
      <div className="page-wrapper">

        <main className="main">
          <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
            <div className="container">
              <h1 className="page-title">Shopping Cart<span>Shop</span></h1>
            </div>{/* End .container */}
          </div>{/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Shop</a></li>
                <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
              </ol>
            </div>{/* End .container */}
          </nav>{/* End .breadcrumb-nav */}
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
                            <td className="product-col" >
                              <div className="product">
                                <figure className="product-media">
                                  <a href="#">
                                    <img src="assets/images/products/table/product-1.jpg" alt="Product image" />
                                  </a>
                                </figure>
                                <h3 className="product-title">
                                  <a href="#">{data.product.name}</a>
                                </h3>{/* End .product-title */}
                              </div>{/* End .product */}
                            </td>
                            <td className="price-col">${data.product.sale_price}</td>
                            <td className="quantity-col">
                              <div className="cart-product-quantity d-flex align-items-center justify-content-center gap-2">
                                <span className="quantity-btn" onClick={() => handleQuantityChange(-1,data.quantity,data.product._id)}>-</span>
                                <span className="quantity-value">{data.quantity}</span>
                                <span className="quantity-btn" onClick={() => handleQuantityChange(1,data.quantity,data.product._id)}>+</span>
                              </div>
                            </td>
                            <td className="total-col">${data.quantity * data.product.sale_price}</td>
                            <td className="remove-col"><button className="btn-remove" onClick={() => handleRemove(data.product._id)}><i className="icon-close" /></button></td>
                          </tr>
                        ))}



                      </tbody>
                    </table>{/* End .table table-wishlist */}
                  </div>{/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary summary-cart">
                      <h3 className="summary-title">Cart Total</h3>{/* End .summary-title */}
                      <table className="table table-summary">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>$160.00</td>
                          </tr>{/* End .summary-subtotal */}
                          <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input type="radio" id="free-shipping" name="shipping" className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                              </div>{/* End .custom-control */}
                            </td>
                            <td>$0.00</td>
                          </tr>{/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input type="radio" id="standart-shipping" name="shipping" className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="standart-shipping">Standart:</label>
                              </div>{/* End .custom-control */}
                            </td>
                            <td>$10.00</td>
                          </tr>{/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input type="radio" id="express-shipping" name="shipping" className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                              </div>{/* End .custom-control */}
                            </td>
                            <td>$20.00</td>
                          </tr>{/* End .summary-shipping-row */}
                          <tr className="summary-shipping-estimate">
                            <td>Estimate for Your Country<br /> <a href="dashboard.html">Change address</a></td>
                            <td>&nbsp;</td>
                          </tr>{/* End .summary-shipping-estimate */}
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>$160.00</td>
                          </tr>{/* End .summary-total */}
                        </tbody>
                      </table>{/* End .table table-summary */}
                      <Link to="/checkout" className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</Link>
                    </div>{/* End .summary */}
                    <Link to="/" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh" /></Link>
                  </aside>{/* End .col-lg-3 */}
                </div>{/* End .row */}
              </div>{/* End .container */}
            </div>{/* End .cart */}
          </div>{/* End .page-content */}
        </main>{/* End .main */}

      </div>{/* End .page-wrapper */}
      <button id="scroll-top" title="Back to Top"><i className="icon-arrow-up" /></button>
      {/* Mobile Menu */}
      <div className="mobile-menu-overlay" />{/* End .mobil-menu-overlay */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close"><i className="icon-close" /></span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">Search</label>
            <input type="search" className="form-control" name="mobile-search" id="mobile-search" placeholder="Search in..." required />
            <button className="btn btn-primary" type="submit"><i className="icon-search" /></button>
          </form>
          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li className="active">
                <a href="index.html">Home</a>
                <ul>
                  <li><a href="index-1.html">01 - furniture store</a></li>
                  <li><a href="index-2.html">02 - furniture store</a></li>
                  <li><a href="index-3.html">03 - electronic store</a></li>
                  <li><a href="index-4.html">04 - electronic store</a></li>
                  <li><a href="index-5.html">05 - fashion store</a></li>
                  <li><a href="index-6.html">06 - fashion store</a></li>
                  <li><a href="index-7.html">07 - fashion store</a></li>
                  <li><a href="index-8.html">08 - fashion store</a></li>
                  <li><a href="index-9.html">09 - fashion store</a></li>
                  <li><a href="index-10.html">10 - shoes store</a></li>
                  <li><a href="index-11.html">11 - furniture simple store</a></li>
                  <li><a href="index-12.html">12 - fashion simple store</a></li>
                  <li><a href="index-13.html">13 - market</a></li>
                  <li><a href="index-14.html">14 - market fullwidth</a></li>
                  <li><a href="index-15.html">15 - lookbook 1</a></li>
                  <li><a href="index-16.html">16 - lookbook 2</a></li>
                  <li><a href="index-17.html">17 - fashion store</a></li>
                  <li><a href="index-18.html">18 - fashion store (with sidebar)</a></li>
                  <li><a href="index-19.html">19 - games store</a></li>
                  <li><a href="index-20.html">20 - book store</a></li>
                  <li><a href="index-21.html">21 - sport store</a></li>
                  <li><a href="index-22.html">22 - tools store</a></li>
                  <li><a href="index-23.html">23 - fashion left navigation store</a></li>
                  <li><a href="index-24.html">24 - extreme sport store</a></li>
                </ul>
              </li>
              <li>
                <a href="category.html">Shop</a>
                <ul>
                  <li><a href="category-list.html">Shop List</a></li>
                  <li><a href="category-2cols.html">Shop Grid 2 Columns</a></li>
                  <li><a href="category.html">Shop Grid 3 Columns</a></li>
                  <li><a href="category-4cols.html">Shop Grid 4 Columns</a></li>
                  <li><a href="category-boxed.html"><span>Shop Boxed No Sidebar<span className="tip tip-hot">Hot</span></span></a></li>
                  <li><a href="category-fullwidth.html">Shop Fullwidth No Sidebar</a></li>
                  <li><a href="product-category-boxed.html">Product Category Boxed</a></li>
                  <li><a href="product-category-fullwidth.html"><span>Product Category Fullwidth<span className="tip tip-new">New</span></span></a></li>
                  <li><a href="cart.html">Cart</a></li>
                  <li><a href="checkout.html">Checkout</a></li>
                  <li><a href="wishlist.html">Wishlist</a></li>
                  <li><a href="#">Lookbook</a></li>
                </ul>
              </li>
              <li>
                <a href="product.html" className="sf-with-ul">Product</a>
                <ul>
                  <li><a href="product.html">Default</a></li>
                  <li><a href="product-centered.html">Centered</a></li>
                  <li><a href="product-extended.html"><span>Extended Info<span className="tip tip-new">New</span></span></a></li>
                  <li><a href="product-gallery.html">Gallery</a></li>
                  <li><a href="product-sticky.html">Sticky Info</a></li>
                  <li><a href="product-sidebar.html">Boxed With Sidebar</a></li>
                  <li><a href="product-fullwidth.html">Full Width</a></li>
                  <li><a href="product-masonry.html">Masonry Sticky Info</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Pages</a>
                <ul>
                  <li>
                    <a href="about.html">About</a>
                    <ul>
                      <li><a href="about.html">About 01</a></li>
                      <li><a href="about-2.html">About 02</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                    <ul>
                      <li><a href="contact.html">Contact 01</a></li>
                      <li><a href="contact-2.html">Contact 02</a></li>
                    </ul>
                  </li>
                  <li><a href="login.html">Login</a></li>
                  <li><a href="faq.html">FAQs</a></li>
                  <li><a href="404.html">Error 404</a></li>
                  <li><a href="coming-soon.html">Coming Soon</a></li>
                </ul>
              </li>
              <li>
                <a href="blog.html">Blog</a>
                <ul>
                  <li><a href="blog.html">Classic</a></li>
                  <li><a href="blog-listing.html">Listing</a></li>
                  <li>
                    <a href="#">Grid</a>
                    <ul>
                      <li><a href="blog-grid-2cols.html">Grid 2 columns</a></li>
                      <li><a href="blog-grid-3cols.html">Grid 3 columns</a></li>
                      <li><a href="blog-grid-4cols.html">Grid 4 columns</a></li>
                      <li><a href="blog-grid-sidebar.html">Grid sidebar</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Masonry</a>
                    <ul>
                      <li><a href="blog-masonry-2cols.html">Masonry 2 columns</a></li>
                      <li><a href="blog-masonry-3cols.html">Masonry 3 columns</a></li>
                      <li><a href="blog-masonry-4cols.html">Masonry 4 columns</a></li>
                      <li><a href="blog-masonry-sidebar.html">Masonry sidebar</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Mask</a>
                    <ul>
                      <li><a href="blog-mask-grid.html">Blog mask grid</a></li>
                      <li><a href="blog-mask-masonry.html">Blog mask masonry</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Single Post</a>
                    <ul>
                      <li><a href="single.html">Default with sidebar</a></li>
                      <li><a href="single-fullwidth.html">Fullwidth no sidebar</a></li>
                      <li><a href="single-fullwidth-sidebar.html">Fullwidth with sidebar</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="elements-list.html">Elements</a>
                <ul>
                  <li><a href="elements-products.html">Products</a></li>
                  <li><a href="elements-typography.html">Typography</a></li>
                  <li><a href="elements-titles.html">Titles</a></li>
                  <li><a href="elements-banners.html">Banners</a></li>
                  <li><a href="elements-product-category.html">Product Category</a></li>
                  <li><a href="elements-video-banners.html">Video Banners</a></li>
                  <li><a href="elements-buttons.html">Buttons</a></li>
                  <li><a href="elements-accordions.html">Accordions</a></li>
                  <li><a href="elements-tabs.html">Tabs</a></li>
                  <li><a href="elements-testimonials.html">Testimonials</a></li>
                  <li><a href="elements-blog-posts.html">Blog Posts</a></li>
                  <li><a href="elements-portfolio.html">Portfolio</a></li>
                  <li><a href="elements-cta.html">Call to Action</a></li>
                  <li><a href="elements-icon-boxes.html">Icon Boxes</a></li>
                </ul>
              </li>
            </ul>
          </nav>{/* End .mobile-nav */}
          <div className="social-icons">
            <a href="#" className="social-icon" target="_blank" title="Facebook"><i className="icon-facebook-f" /></a>
            <a href="#" className="social-icon" target="_blank" title="Twitter"><i className="icon-twitter" /></a>
            <a href="#" className="social-icon" target="_blank" title="Instagram"><i className="icon-instagram" /></a>
            <a href="#" className="social-icon" target="_blank" title="Youtube"><i className="icon-youtube" /></a>
          </div>{/* End .social-icons */}
        </div>{/* End .mobile-menu-wrapper */}
      </div>{/* End .mobile-menu-container */}
      {/* Sign in / Register Modal */}
      <div className="modal fade" id="signin-modal" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="icon-close" /></span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Sign In</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                      <form action="#">
                        <div className="form-group">
                          <label htmlFor="singin-email">Username or email address *</label>
                          <input type="text" className="form-control" id="singin-email" name="singin-email" required />
                        </div>{/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="singin-password">Password *</label>
                          <input type="password" className="form-control" id="singin-password" name="singin-password" required />
                        </div>{/* End .form-group */}
                        <div className="form-footer">
                          <button type="submit" className="btn btn-outline-primary-2">
                            <span>LOG IN</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="signin-remember" />
                            <label className="custom-control-label" htmlFor="signin-remember">Remember Me</label>
                          </div>{/* End .custom-checkbox */}
                          <a href="#" className="forgot-link">Forgot Your Password?</a>
                        </div>{/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login btn-g">
                              <i className="icon-google" />
                              Login With Google
                            </a>
                          </div>{/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login btn-f">
                              <i className="icon-facebook-f" />
                              Login With Facebook
                            </a>
                          </div>{/* End .col-6 */}
                        </div>{/* End .row */}
                      </div>{/* End .form-choice */}
                    </div>{/* .End .tab-pane */}
                    <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                      <form action="#">
                        <div className="form-group">
                          <label htmlFor="register-email">Your email address *</label>
                          <input type="email" className="form-control" id="register-email" name="register-email" required />
                        </div>{/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="register-password">Password *</label>
                          <input type="password" className="form-control" id="register-password" name="register-password" required />
                        </div>{/* End .form-group */}
                        <div className="form-footer">
                          <button type="submit" className="btn btn-outline-primary-2">
                            <span>SIGN UP</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="register-policy" required />
                            <label className="custom-control-label" htmlFor="register-policy">I agree to the <a href="#">privacy policy</a> *</label>
                          </div>{/* End .custom-checkbox */}
                        </div>{/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">or sign in with</p>
                        <div className="row">
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login btn-g">
                              <i className="icon-google" />
                              Login With Google
                            </a>
                          </div>{/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login  btn-f">
                              <i className="icon-facebook-f" />
                              Login With Facebook
                            </a>
                          </div>{/* End .col-6 */}
                        </div>{/* End .row */}
                      </div>{/* End .form-choice */}
                    </div>{/* .End .tab-pane */}
                  </div>{/* End .tab-content */}
                </div>{/* End .form-tab */}
              </div>{/* End .form-box */}
            </div>{/* End .modal-body */}
          </div>{/* End .modal-content */}
        </div>{/* End .modal-dialog */}
      </div>{/* End .modal */}
      {/* Plugins JS File */}
      {/* Main JS File */}
      {/* molla/cart.html  22 Nov 2019 09:55:06 GMT */}
    </div>

  )
}

export default Cart