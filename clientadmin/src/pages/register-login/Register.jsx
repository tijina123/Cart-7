import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import AdminService from "../../services/admin-api-service/AdminService";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyname: "",
    plan: "basic", // Default plan selection
    role: "admin",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { postRegister } = AdminService();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await postRegister(userData);
    if(response?.success === true) {
      setLoading(true);
      setError(""); 
      navigate("/login");
    } else {
      setLoading(false);            
    }
    console.log("Registering user:", userData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              name="name"
              className="form-control" 
              value={userData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-control" 
              value={userData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input 
              type="text" 
              name="companyname"
              className="form-control" 
              value={userData.companyname} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Plan</label>
            <div className="input-group" onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: "pointer" }}>
              <select 
                name="plan" 
                className="form-control" 
                value={userData.plan} 
                onChange={handleChange} 
                required
                style={{ appearance: "none" }}
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
              <span className="input-group-text">
                <FaChevronDown />
              </span>
            </div>
            {/* {showDropdown && (
              <div className="dropdown-menu show w-100" style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}>
                <button className="dropdown-item" onClick={() => setUserData({ ...userData, plan: "basic" })}>Basic</button>
                <button className="dropdown-item" onClick={() => setUserData({ ...userData, plan: "standard" })}>Standard</button>
                <button className="dropdown-item" onClick={() => setUserData({ ...userData, plan: "premium" })}>Premium</button>
              </div>
            )} */}
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                className="form-control" 
                value={userData.password} 
                onChange={handleChange} 
                required 
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;







// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log("Registering with:", { name, email, password });
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ width: "400px" }}>
//         <h2 className="text-center">Register</h2>
//         <form onSubmit={handleRegister}>
//           <div className="mb-3">
//             <label className="form-label">Name</label>
//             <input 
//               type="text" 
//               className="form-control" 
//               value={name} 
//               onChange={(e) => setName(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input 
//               type="email" 
//               className="form-control" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input 
//               type="password" 
//               className="form-control" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//             />
//           </div>
//           <button type="submit" className="btn btn-danger w-100">Register</button>
//         </form>
//         <div className="text-center mt-3">
//           <p>Already have an account? <Link to="/login">Login</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
