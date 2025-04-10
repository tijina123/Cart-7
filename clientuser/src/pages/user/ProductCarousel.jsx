import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import UserService from "../../services/user-api-services/UserService";
import toast, { Toaster } from "react-hot-toast";

const ProductCarousel = ({ products }) => {
  const { addToCart, addToWihlist } = UserService();

  const [carouselProducts, setCarouselProducts] = useState([]);
  const [carouselKey, setCarouselKey] = useState(0);

  useEffect(() => {
    console.log("Received products:", products);
    if (products.length > 0) {
      setCarouselProducts(products);
      setCarouselKey((prevKey) => prevKey + 1); // Force re-render
    }
  }, [products]);

  const handleAddToCart = async (userId, productId, quantity) => {
    try {
      const data = { userId, productId, quantity };
      const response = await addToCart(data);
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleAddToWishlist = async (userId, productId, quantity) => {
    try {
      const data = { userId, productId, quantity };
      const response = await addToWihlist(data);

      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <OwlCarousel
        key={carouselKey} // Force re-render
        className="owl-theme"
        loop={false}
        margin={20}
        dots={true}
        nav={false}
        navText={[
          "<span class='custom-nav prev'>&#10094;</span>",
          "<span class='custom-nav next'>&#10095;</span>",
        ]}
        responsive={{
          0: { items: 2 },
          480: { items: 2 },
          768: { items: 3 },
          992: { items: 4 },
          1280: { items: 5, nav: true },
        }}
      >
        {carouselProducts &&
          carouselProducts.length &&
          carouselProducts.map((data) => (
            <div className="product" key={data._id}>
              <figure className="product-media">
                <span className="product-label label-sale">Sale</span>
                {/* <a href="product.html"> */}
                <img
                  src={data?.images?.[0]}
                  alt="Product image"
                  className="product-image"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="product-action-vertical">
                  <button
                    onClick={() =>
                      handleAddToWishlist(
                        "67bffce8e7dae9e3c14f3c15",
                        data._id,
                        1
                      )
                    }
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </button>
                </div>
                <div className="product-action">
                  <button
                    className="btn-product btn-cart"
                    title="Add to cart"
                    onClick={() =>
                      handleAddToCart("67bffce8e7dae9e3c14f3c15", data._id, 1)
                    }
                  >
                    <span>add to cart</span>
                  </button>
                </div>
              </figure>
              <div className="product-body">
                <div className="product-cat">
                  <a href="#">Furniture</a>
                </div>
                <h3 className="product-title">
                  <a href="product.html">{data.name}</a>
                </h3>
                <div className="product-price">
                  <span className="new-price">₹ {data?.sale_price}</span>
                  <span className="old-price">₹ {data?.product_price}</span>
                </div>
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "100%" }} />
                  </div>
                  <span className="ratings-text">( 2 Reviews )</span>
                </div>
              </div>
            </div>
          ))}
      </OwlCarousel>
    </>
  );
};

export default ProductCarousel;
