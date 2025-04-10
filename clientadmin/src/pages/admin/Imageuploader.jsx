import React from "react";
import { useFormikContext, ErrorMessage } from "formik";

const ImageUploader = () => {
  const formik = useFormikContext();

  if (!formik) {
    return null; // Prevents crashing if not inside Formik
  }

  const { values, setFieldValue } = formik;

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFieldValue("images", files);
  };

  const removeImage = (index) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setFieldValue("images", newImages);
  };

  return (
    <div className="mt-4">
      <label className="block font-medium">Product Images</label>
      <input
        type="file"
        multiple
        accept="image/jpeg, image/png, image/webp"
        onChange={handleImageChange}
        className="border p-2 rounded-md w-full"
      />
      <ErrorMessage
        name="images"
        component="p"
        className="text-red-500 text-sm"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {values.images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Product Preview"
              className="w-20 h-20 object-cover rounded-md shadow-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
