import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const RegisterModal = ({ onClose }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  
  const handleSubmit = (values) => {
    console.log("Form submitted", values);
    // Handle form submission logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
  className="bg-white p-10 rounded-2xl shadow-xl w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-h-screen overflow-y-auto"
>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold">Seller Register</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={{ name: "", companyName: "", email: "", password: "" , role:"admin" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-md font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-md" />
              </div>

              <div className="mb-4">
                <label className="block text-md font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your company name"
                />
                <ErrorMessage name="companyName" component="div" className="text-red-500 text-md" />
              </div>

              <div className="mb-4">
                <label className="block text-md font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-md" />
              </div>

              <div className="mb-4">
                <label className="block text-md font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-md" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default RegisterModal;
