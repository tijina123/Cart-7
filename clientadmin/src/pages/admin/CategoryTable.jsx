import React, { useState, useEffect } from "react";
import AdminService from "../../services/admin-api-service/AdminService";

const CategoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const { AddCategory, EditCategory, handleToggleCategory, getCategoryeData } =
    AdminService();

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parentCategory: "",
    published: false,
    image: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategoryeData();

      setCategories(response.categories);
    } catch (error) {}
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:3000/category/admin/${categoryId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete category");

      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle category submission (Add or Edit)
  const handleSaveCategory = async () => {
    if (newCategory.name.trim() === "") return;

    const categoryData = {
      name: newCategory.name,
      description: newCategory.description,
      parentCategory: newCategory.parentCategory,
      published: newCategory.published,
      isVariant: newCategory.isVariant,
      status: "Selling",
    };

    try {
      if (editingCategory) {
        const response = await EditCategory(editingCategory._id, categoryData);
        setCategories(response.categories);
        clearState();
      } else {
        const response = await AddCategory(categoryData);

        setCategories(response.categories);
        clearState();
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Handle edit button click
  const handleEditCategory = (category) => {
    setNewCategory({
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory,
      published: category.published,
      isVariant: category.isVariant,
      image: category.image || null,
    });
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddCategory = async () => {
    if (newCategory.name.trim() === "") return;

    const newEntry = {
      icon: newCategory.image || "https://via.placeholder.com/30",
      name: newCategory.name,
      description: newCategory.description,
      parentCategory: newCategory.parentCategory,
      published: newCategory.published,
      status: "Selling",
    };

    try {
      const response = await fetch("http://localhost:3000/category/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const savedCategory = await response.json();

      setCategories([
        ...categories,
        { ...savedCategory, id: categories.length + 1 },
      ]);
      setNewCategory({
        name: "",
        description: "",
        parentCategory: "",
        published: false,
        isVariant: false,
        image: null,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const clearState = (e) => {
    setNewCategory({
      name: "",
      description: "",
      parentCategory: "",
      published: false,
      image: null,
    });
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCategory({ ...newCategory, image: imageUrl });
    }
  };

  // }

  const handleToggle = async (productId) => {
    try {
      const response = await handleToggleCategory(productId);

      // setProducts(response?.product);
      setCategories(response.categories);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-white border rounded shadow">
            Export
          </button>
          <button className="px-4 py-2 bg-white border rounded shadow">
            Import
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded w-full sm:w-auto"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Product"
          className="border p-2 rounded w-full"
        />
        <select className="border p-2 rounded w-full">
          <option>Category</option>
        </select>
        <select className="border p-2 rounded w-full">
          <option>Price</option>
        </select>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto">
            Filter
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 shadow rounded">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200  justify-center">
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Description</th>
              <th className="p-2 text-center">Parent Category</th>

              <th className="p-2 text-center">Actions</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="p-2 text-center">{category.name}</td>
                <td className="p-2 text-center">{category.description}</td>

                <td className="p-2 text-center">No Parent Category</td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-500"
                  >
                    ✏️
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleToggle(category._id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      category?.isActive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {category?.isActive ? "Block" : "Unblock"}
                  </button>
                </td>
                <div className="flex items-center justify-center space-x-2"></div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-between items-center mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">
          Previous
        </button>
        <span>Page 1 of 1</span>
        <button className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">
          Next
        </button>
      </div>

      {/* Side Panel Modal */}
      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 shadow-lg w-1/3 h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={clearState} className="text-lg text-purple-600">
                ✖
              </button>
            </div>

            {/* Name Field */}
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="Category title"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />

            {/* Description Field */}
            <label className="block mb-2">Description</label>
            <textarea
              className="w-full border p-2 rounded mb-2"
              placeholder="Category Description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            ></textarea>

            {/* Parent Category */}
            <label className="block mb-2">Parent Category</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              value={newCategory.parentCategory}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  parentCategory: e.target.value,
                })
              }
            />

            {/* Category Image Upload */}
            <label className="block mb-2">Category Image</label>
            <input
              type="file"
              className="w-full border p-2 rounded mb-2"
              onChange={handleImageUpload}
            />

            {/* Variant Toggle (Green when ON) */}
            <label className="block mb-2 flex items-center">
              <span className="mr-2">Variant</span>
              <div
                className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  newCategory.isVariant ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() =>
                  setNewCategory({
                    ...newCategory,
                    isVariant: !newCategory.isVariant,
                  })
                }
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    newCategory.isVariant ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>

            {/* Published Checkbox */}
            <label className="block mb-2 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={newCategory.published}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    published: e.target.checked,
                  })
                }
              />
              Published
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
