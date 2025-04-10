import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminService from "../../services/admin-api-service/AdminService";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountType: "",
    discountValue: "",
    expiryDate: "",
    minPurchase: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { AddOffer, getOffer, handleToggleOffer } = AdminService();

  const fetchOffers = async () => {
    try {
      const response = await getOffer();
      if (response.success) {
        setOffers(response.offers);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }
    if (!formData.discountType) {
      newErrors.discountType = "Select Discount type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOffer = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await AddOffer(formData);

      if (response.success) {
        fetchOffers();

        setFormData({
          title: "",
          description: "",
          discountType: "",
          discountValue: "",
          expiryDate: "",
          minPurchase: "",
        });

        setErrors({});
      }
    } catch (error) {
      console.error("Error adding offer:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await axios.delete(`/api/offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "discountValue" || name === "minPurchase"
          ? Number(value)
          : value,
    });
  };

  const handleToggle = async (productId) => {
    try {
      const response = await handleToggleOffer(productId);

      if (response.success) {
        fetchOffers();
      }
    } catch (error) {}
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offers Management</h1>

      {/* General Information Section */}
      <h2 className="text-xl font-semibold mb-2">General Information</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {["title", "description"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={"text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className={`border p-2 w-full ${
                errors[field] ? "border-red-500" : ""
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Discount Section */}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Discount Type Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1 ">
            Discount Type
          </label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select discount type</option>
            <option value="percentage">Percentage (%)</option>
          </select>
          {errors.discountType && (
            <p className="text-red-500 text-sm mt-1">{errors.discountType}</p>
          )}
        </div>

        {/* Discount Value */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Discount Value
          </label>
          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            className={`border p-2 w-full ${
              errors.discountValue ? "border-red-500" : ""
            }`}
          />
          {errors.discountValue && (
            <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>
          )}
        </div>

        {/* **************************** */}
        {/* Discount Value */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`border p-2 w-full ${
              errors.expiryDate ? "border-red-500" : ""
            }`}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>
      </div>

      {/* Add Offer Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddOffer}
          className="bg-green-600 text-white p-2 rounded w-80"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Offer"}
        </button>
      </div>

      {/* Offers Table */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Offers List</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            {[
              "Title",
              "Description",
              "Discount Type",
              "Discount Value",
              "Expiry Date",

              "Status",
            ].map((head) => (
              <th key={head} className="border p-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(offers ?? []).map((offer) => (
            <tr key={offer._id} className="text-center">
              <td className="border p-2">{offer.title}</td>
              <td className="border p-2">{offer.description}</td>
              <td className="border p-2">{offer.discountType}</td>
              <td className="border p-2">
                {offer.discountType === "percentage"
                  ? `${offer.discountValue}%`
                  : `$${offer.discountValue}`}
              </td>

              <td className="border p-2">
                {new Date(offer.expiryDate).toLocaleDateString()}
              </td>

              <td className="p-2 text-center">
                <button
                  onClick={() => handleToggle(offer._id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    offer?.isActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {offer?.isActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}

          {(!offers || offers.length === 0) && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No offers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
