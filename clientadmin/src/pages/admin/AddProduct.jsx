import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import ImageUploader from "./Imageuploader";
import AdminService from "../../services/admin-api-service/AdminService";
import Varient from "./Variant";

const AddProduct = () => {
  const { addToProduct, getCategoryeData, getOffer } = AdminService();

  const [hasVariants, setHasVariants] = useState(false);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);

  const [product, setProduct] = useState({
    varient: [],
  });

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Must be a positive number"),
    salePrice: Yup.number().required("Must be a positive number"),
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Must be an integer"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    images: Yup.array()
      .min(1, "At least one image is required")
      .test("fileFormat", "Unsupported file format", (value) => {
        if (!value) return true;
        const acceptedFormats = ["image/jpeg", "image/png", "image/webp"];
        return value.every((file) => acceptedFormats.includes(file.type));
      }),
  });

  useEffect(() => {
    fetchCategories();
    fetchOffers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryeData();
      setCategories(response.categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await getOffer();
      setOffers(response.offers);
    } catch (error) {
      console.error("Failed to fetch offers", error);
    }
  };

  // Custom component to handle category change tracking
  const CategoryWatcher = ({ categories }) => {
    const { values } = useFormikContext();

    useEffect(() => {
      const selectedCategory = categories.find(
        (cat) => cat._id === values.category
      );
      if (selectedCategory?.name.toLowerCase() === "dress") {
        setHasVariants(true);
      } else {
        setHasVariants(false);
      }
    }, [values.category, categories]);

    return null;
  };

  return (
    <Formik
      initialValues={{
        productName: "",
        price: "",
        salePrice: "",
        quantity: "",
        description: "",
        tags: "",
        images: [],
        offer: "",
        category: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const formData = new FormData();

          formData.append("name", values.productName);
          formData.append("product_price", values.price);
          formData.append("sale_price", values.salePrice);
          formData.append("stock", values.quantity);
          formData.append("description", values.description);
          formData.append("tags", values.tags);
          formData.append("offer", values.offer);
          formData.append("variant", JSON.stringify(product.varient));
          formData.append("category", values.category);

          values.images.forEach((image) => {
            formData.append("images", image);
          });

          const response = await addToProduct(formData);
          resetForm();
        } catch (error) {
          console.error("Error adding product:", error);
          alert("Failed to add product. Please try again.");
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-5"
        >
          <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
          <p className="text-gray-500 mb-4">
            Add your product and necessary information from here
          </p>

          {/* 👀 Category Watcher */}
          <CategoryWatcher categories={categories} />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Product Title/Name</label>
              <input
                type="text"
                name="productName"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productName}
              />
              {touched.productName && errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Product Price</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {touched.price && errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.salePrice}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {touched.salePrice && errors.salePrice && (
                <p className="text-red-500 text-sm">{errors.salePrice}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Product Quantity</label>
              <input
                type="number"
                name="quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {touched.quantity && errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mt-4">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block font-medium">Offer</label>
            <select
              name="offer"
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.offer}
            >
              <option value="">Select Offers</option>
              {offers.map((offer) => (
                <option key={offer._id} value={offer._id}>
                  {offer.title}
                </option>
              ))}
            </select>
            {touched.offer && errors.offer && (
              <p className="text-red-500 text-sm">{errors.offer}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block font-medium">Product Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            ></textarea>
            {touched.description && errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* ✅ Show Variant Conditionally */}
          {hasVariants && <Varient product={product} setProduct={setProduct} />}

          <ImageUploader />

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Product
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
