import { useState } from "react";
import "./Variant.css";

const Varient = ({ product, setProduct }) => {
  const [color, setColor] = useState("");
  const [sizeVariants, setSizeVariants] = useState([]);
  const [size, setSize] = useState("");
  const [sizeQty, setSizeQty] = useState("");
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [editingSizeIndex, setEditingSizeIndex] = useState(null);

  const addSizeVariant = () => {
    if (size && sizeQty) {
      let updatedSizes = [...sizeVariants];
      if (editingSizeIndex !== null) {
        updatedSizes[editingSizeIndex] = { size, qty: sizeQty };
        setEditingSizeIndex(null);
      } else {
        updatedSizes.push({ size, qty: sizeQty });
      }
      setSizeVariants(updatedSizes);
      setSize("");
      setSizeQty("");
    }
  };

  const addVariant = () => {
    if (color && sizeVariants.length > 0) {
      let updatedVariants = [...product.varient];
      if (editingVariantIndex !== null) {
        updatedVariants[editingVariantIndex] = {
          colour_varient: color,
          size_varient: sizeVariants,
        };
        setEditingVariantIndex(null);
      } else {
        updatedVariants.push({
          colour_varient: color,
          size_varient: sizeVariants,
        });
      }
      setProduct({ ...product, varient: updatedVariants });
      setColor("");
      setSizeVariants([]);
    }
  };

  const editVariant = (index) => {
    setEditingVariantIndex(index);
    setColor(product.varient[index].colour_varient);
    setSizeVariants(product.varient[index].size_varient);
  };

  const editSizeVariant = (index) => {
    setEditingSizeIndex(index);
    setSize(sizeVariants[index].size);
    setSizeQty(sizeVariants[index].qty);
  };

  return (
    <div className="admin-container">
      <h2>Add Varient</h2>
      <form className="product-form">
        <div className="variant-section">
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="button" onClick={addVariant} className="add-variant">
            {editingVariantIndex !== null ? "Update Variant" : "Add Variant"}
          </button>
        </div>

        <div className="variant-section">
          <input
            type="number"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={sizeQty}
            onChange={(e) => setSizeQty(e.target.value)}
          />
          <button
            type="button"
            onClick={addSizeVariant}
            className="add-variant"
          >
            {editingSizeIndex !== null ? "Update Size" : "Add Size"}
          </button>
        </div>

        <div className="variant-list">
          <h4>Current Size Variants</h4>
          {sizeVariants.map((variant, idx) => (
            <div key={idx}>
              <input type="number" value={variant.size} readOnly />
              <input type="number" value={variant.qty} readOnly />
              <button type="button" onClick={() => editSizeVariant(idx)}>
                Edit
              </button>
            </div>
          ))}
        </div>

        <div className="variant-list">
          {product.varient.map((variant, index) => (
            <div key={index} className="variant-item">
              <strong>Color:</strong>
              <input type="text" value={variant.colour_varient} readOnly />
              <button type="button" onClick={() => editVariant(index)}>
                Edit
              </button>
              <ul>
                {variant.size_varient.map((size, idx) => (
                  <li key={idx}>
                    <input type="number" value={size.size} readOnly />
                    <input type="number" value={size.qty} readOnly />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Varient;
