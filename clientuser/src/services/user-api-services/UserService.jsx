import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserService = () => {
  const axiosPrivate = useAxiosPrivate();

  //Register
  const postRegister = async (data) => {
    const response = await axiosPrivate.post("/signup", data);
    return response;
  };

  //Login
  const postLogin = async (data) => {
    const response = await axiosPrivate.post("/login", data);
    return response;
  };

  //get all product by category to home
  const getHomeProductsByCategory = async () => {
    const response = await axiosPrivate.get("/product/by-category");
    return response.data;
  };

  //get all product to home
  const getHomeProducts = async () => {
    const response = await axiosPrivate.get("/product");
    return response.data;
  };

  //get all category to home
  const getHomeCategory = async () => {
    const response = await axiosPrivate.get("/category");
    return response.data;
  };

  //get data from cart
  const getCartPageData = async () => {
    const response = await axiosPrivate.get("/cart");
    return response.data;
  };

  //add to cart
  const addToCart = async (data) => {
    const response = await axiosPrivate.post("/cart", data);
    return response.data;
  };

  //remove form cart
  const handleRemoveFromCart = async (productId) => {
    const response = await axiosPrivate.delete(`/cart/${productId}`);
    return response.data;
  };

  //quantity change in cart
  const handleCartQuantityChange = async (productId, data) => {
    const response = await axiosPrivate.put(`/cart/${productId}`, data);
    return response?.data;
  };

  //get all data from wishlist
  const getWishlistData = async () => {
    const response = await axiosPrivate.get("/wishlist");
    return response.data;
  };

  //add to wishlish
  const addToWihlist = async (data) => {
    const response = await axiosPrivate.post("/wishlist", data);
    return response.data;
  };

  //remove form wishlist
  const handleRemoveFromWishlist = async (productId) => {
    const response = await axiosPrivate.delete(`/wishlist/${productId}`);
    return response.data;
  };

  //post order
  const postOrder = async (data) => {
    const response = await axiosPrivate.post("/order", data);
    return response.data;
  };

  //post address
  const postAddress = async (data) => {
    const response = await axiosPrivate.post("/address/add", data);
    return response.data;
  };
  //get all addresss
  const getAddress = async () => {
    const response = await axiosPrivate.get("/address");
    return response.data;
  };

  //get all data from wishlist
  const checkPorductAvailability = async () => {
    const response = await axiosPrivate.get("/order/check-cart/");
    return response.data;
  };
  //quantity change in cart
  const putSelectAddress = async (addressId) => {
    console.log("putSelectAddress", addressId);

    const response = await axiosPrivate.put(
      `/address/update/default-address/${addressId}`
    );
    return response?.data;
  };

  const putFilterProducts = async (productId) => {
    const response = await axiosPrivate.get(`/product/filter/${productId}`);
    return response?.data;
  };

  return {
    getHomeProductsByCategory,
    getHomeProducts,
    postRegister,
    postLogin,
    getCartPageData,
    addToCart,
    handleRemoveFromCart,
    handleCartQuantityChange,
    handleRemoveFromWishlist,
    getWishlistData,
    addToWihlist,
    postOrder,
    postAddress,
    checkPorductAvailability,
    getHomeCategory,
    getAddress,
    putSelectAddress,
    putFilterProducts
  };
};

export default UserService;
