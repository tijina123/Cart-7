import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user-api-services/UserService";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

const SubFooter = () => {
  const { postLogin, postRegister, getHomeCategory } = UserService();
  const { setAuth,auth } = useAuth();

  const [singinFormData, setSinginFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [forgotForm, setForgotForm] = useState({ mobile: "" });
  const [otpForm, setOtpForm] = useState({ otp: "" });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await getHomeCategory();
      // response?.product?.reverse()
      setCategory(response?.categories);
    } catch (error) {}
  };

  const handleForgotChange = (e) =>
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });

  const handleOtpChange = (e) =>
    setOtpForm({ ...otpForm, [e.target.name]: e.target.value });

  const handleResetPasswordChange = (e) =>
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value,
    });

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // update password logic...
    console.log("New password:", resetPasswordForm.newPassword);
    $("#reset-password-modal").modal("hide");
  };

  const handleChangeSingin = (e) => {
    setSinginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeRegister = (e) => {
    // setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
    setRegisterFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitSingin = async (e) => {
    e.preventDefault();

    console.log("Form Data handleSubmitSingin:");

    console.log("Form Data Submitted singinFormData:", singinFormData);
    try {
      const response = await postLogin(singinFormData);
      console.log("Form Data Submitted singinFormData:", response);

      if (response?.data?.success) {
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.userData?.role;
        const image = response?.data?.userData?.image || "";
        const name = response?.data?.userData?.name || "";
        const email = response?.data?.userData?.email || "";

        //localStorage.setItem("password", password)

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("role", role);
        localStorage.setItem("profileImage", image);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        setAuth({ accessToken, role, image, name, email });
        toast.success(response?.data?.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        //   switch(role){
        //       case 'Super Admin':
        //           navigate("/super-admin")
        //           break
        //       case 'admin':
        //           navigate("/admin")
        //           break
        //       case 'Manager':
        //           navigate("/manager")
        //           break
        //       case 'user':
        //           navigate("/")
        //           break
        //   }
      } else {
        toast.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", registerFormData);
    try {
      const response = await postRegister(registerFormData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Registration failed! Please check your details.");
      }
    } catch (error) {
      toast.error("Registration failed! Please check your details.");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // send OTP to mobile logic...
    $("#forgot-password-modal").modal("hide");
    $("#otp-modal").modal("show");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // validate OTP logic...
    $("#otp-modal").modal("hide");
    $("#reset-password-modal").modal("show");
  };

  const OnHandleLogout = async () => {
    localStorage.clear();
  };

  return (
    <>
      <div>
        <button id="scroll-top" title="Back to Top">
          <i className="icon-arrow-up" />
        </button>
        {/* Mobile Menu */}
        <div className="mobile-menu-overlay" />
        {/* End .mobil-menu-overlay */}
        <div className="mobile-menu-container mobile-menu-light">
          <div className="mobile-menu-wrapper">
            <span className="mobile-menu-close">
              <i className="icon-close" />
            </span>
            <form action="#" method="get" className="mobile-search">
              <label htmlFor="mobile-search" className="sr-only">
                Search
              </label>
              <input
                type="search"
                className="form-control"
                name="mobile-search"
                id="mobile-search"
                placeholder="Search in..."
                required
              />
              <button className="btn btn-primary" type="submit">
                <i className="icon-search" />
              </button>
            </form>
            <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="mobile-menu-link"
                  data-toggle="tab"
                  href="#mobile-menu-tab"
                  role="tab"
                  aria-controls="mobile-menu-tab"
                  aria-selected="true"
                >
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="mobile-cats-link"
                  data-toggle="tab"
                  href="#mobile-cats-tab"
                  role="tab"
                  aria-controls="mobile-cats-tab"
                  aria-selected="false"
                ></a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="mobile-menu-tab"
                role="tabpanel"
                aria-labelledby="mobile-menu-link"
              >
                <nav className="mobile-cats-nav">
                  <ul className="mobile-cats-menu">
                    <li>
                      <Link
                        className="mobile-cats-lead"
                        to="/"
                        onClick={() => {
                          const menu =
                            document.querySelector(".mobile-menu-close");
                          if (menu) {
                            menu.click(); // Or manipulate the menu to close it however you need
                          }
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="mobile-cats-lead"
                        to="/cart"
                        onClick={() => {
                          const menu =
                            document.querySelector(".mobile-menu-close");
                          if (menu) {
                            menu.click(); // Or manipulate the menu to close it however you need
                          }
                        }}
                      >
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="mobile-cats-lead"
                        to="/wishlist"
                        onClick={() => {
                          const menu =
                            document.querySelector(".mobile-menu-close");
                          if (menu) {
                            menu.click(); // Or manipulate the menu to close it however you need
                          }
                        }}
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="mobile-cats-lead "
                        to="/profile"
                        onClick={() => {
                          const menu =
                            document.querySelector(".mobile-menu-close");
                          if (menu) {
                            menu.click(); // Or manipulate the menu to close it however you need
                          }
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                  {/* End .mobile-cats-menu */}
                </nav>
                {/* End .mobile-cats-nav */}

                <nav className="mobile-nav">
                  <ul className="mobile-menu">
                    <li className="active">
                      <a href="index.html">Categories</a>
                      <ul>
                        {category?.map((data) => (
                          <li>
                            <a href="index-1.html">{data?.name}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/* <li>
                      <a href="product.html" className="sf-with-ul">
                        Best sellers
                      </a>
                      <ul>
                        <li>
                          <a href="product.html">Default</a>
                        </li>
                        
                      </ul>
                    </li> */}
                  </ul>
                </nav>
                {/* End .mobile-nav */}
              </div>
              {/* .End .tab-pane */}
            </div>
            {/* End .tab-content */}
            {auth?.name && (

            <div className="dropdown cart-dropdown">
              <Link
                to="/profile"
                onClick={OnHandleLogout}
                className="dropdown-toggle"
                role="button"
              >
                <FiLogOut style={{ fontSize: "18px", marginRight: "5px" }} />
                <p>Logout</p>

                {/* </a> */}
              </Link>
            </div>
            )}

            <div className="social-icons mt-4">
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Facebook"
              >
                <i className="icon-facebook-f" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Twitter"
              >
                <i className="icon-twitter" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Instagram"
              >
                <i className="icon-instagram" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Youtube"
              >
                <i className="icon-youtube" />
              </a>
            </div>

            {/* End .social-icons */}
          </div>
          {/* End .mobile-menu-wrapper */}
        </div>
        {/* End .mobile-menu-container */}
        {/* Sign in / Register Modal */}

        <div
          className="modal fade"
          id="signin-modal"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="icon-close" />
                  </span>
                </button>
                <div className="form-box">
                  <div className="form-tab">
                    <ul
                      className="nav nav-pills nav-fill nav-border-anim"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="signin-tab"
                          data-toggle="tab"
                          href="#signin"
                          role="tab"
                          aria-controls="signin"
                          aria-selected="true"
                        >
                          Sign In
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="register-tab"
                          data-toggle="tab"
                          href="#register"
                          role="tab"
                          aria-controls="register"
                          aria-selected="false"
                        >
                          Register
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="tab-content-5">
                      <div
                        className="tab-pane fade show active"
                        id="signin"
                        role="tabpanel"
                        aria-labelledby="signin-tab"
                      >
                        <form onSubmit={handleSubmitSingin}>
                          <div className="form-group">
                            <label htmlFor="singin-email">
                              Your email address *
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              onChange={handleChangeSingin}
                              value={singinFormData.email}
                              id="singin-email"
                              name="email"
                              required
                            />
                          </div>
                          {/* End .form-group */}
                          <div className="form-group">
                            <label htmlFor="singin-password">Password *</label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={handleChangeSingin}
                              value={singinFormData.password}
                              id="singin-password"
                              name="password"
                              required
                            />
                          </div>
                          {/* End .form-group */}
                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>LOG IN</span>
                              <i className="icon-long-arrow-right" />
                            </button>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="signin-remember"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="signin-remember"
                              >
                                Remember Me
                              </label>
                            </div>
                            {/* End .custom-checkbox */}
                            {/* <a href="#" className="forgot-link">
                              Forgot Your Password?
                            </a> */}

                            <a
                              href="#"
                              className="forgot-link"
                              data-toggle="modal"
                              data-target="#forgot-password-modal"
                              data-dismiss="modal"
                            >
                              Forgot Your Password?
                            </a>
                          </div>
                          {/* End .form-footer */}
                        </form>
                        <div className="form-choice"></div>
                        {/* End .form-choice */}
                      </div>
                      {/* .End .tab-pane */}
                      <div
                        className="tab-pane fade"
                        id="register"
                        role="tabpanel"
                        aria-labelledby="register-tab"
                      >
                        <form onSubmit={handleSubmitRegister}>
                          <div className="form-group">
                            <label htmlFor="register-phone">Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChangeRegister}
                              value={registerFormData?.name}
                              id="register-name"
                              name="name"
                              required
                            />
                          </div>
                          {/* End .form-group */}
                          <div className="form-group">
                            <label htmlFor="register-email">
                              Your email address *
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              onChange={handleChangeRegister}
                              value={registerFormData?.email}
                              id="register-email"
                              name="email"
                              required
                            />
                          </div>
                          {/* End .form-group */}
                          <div className="form-group">
                            <label htmlFor="register-password">
                              Password *
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={handleChangeRegister}
                              value={registerFormData?.password}
                              id="register-password"
                              name="password"
                              required
                            />
                          </div>
                          {/* End .form-group */}
                          <div className="form-footer">
                            <button
                              type="submit"
                              className="btn btn-outline-primary-2"
                            >
                              <span>SIGN UP</span>
                              <i className="icon-long-arrow-right" />
                            </button>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="register-policy"
                                required
                              />
                              {/* <label className="custom-control-label" htmlFor="register-policy">I agree to the <a href="#">privacy policy</a> *</label> */}
                              <label
                                className="custom-control-label"
                                htmlFor="register-policy"
                              >
                                I agree to the privacy policy *
                              </label>
                            </div>
                            {/* End .custom-checkbox */}
                          </div>
                          {/* End .form-footer */}
                        </form>
                      </div>
                      {/* .End .tab-pane */}
                    </div>
                    {/* End .tab-content */}
                  </div>
                  {/* End .form-tab */}
                </div>
                {/* End .form-box */}
              </div>
              {/* End .modal-body */}
            </div>
            {/* End .modal-content */}
          </div>
          {/* End .modal-dialog */}
        </div>

        {/* forgot password */}

        <div
          className="modal fade"
          id="forgot-password-modal"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="icon-close" />
                  </span>
                </button>
                <div className="form-box">
                  <h4 className="text-center mb-3">Forgot Password</h4>
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <div className="form-group">
                      <label htmlFor="forgot-phone">Mobile Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="forgot-phone"
                        name="mobile"
                        required
                        value={forgotForm.mobile}
                        onChange={handleForgotChange}
                      />
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2 btn-block"
                      >
                        Send OTP
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="otp-modal"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="icon-close" />
                  </span>
                </button>
                <div className="form-box">
                  <h4 className="text-center mb-3">Enter OTP</h4>
                  <form onSubmit={handleOtpSubmit}>
                    <div className="form-group">
                      <label htmlFor="otp">OTP *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="otp"
                        name="otp"
                        required
                        value={otpForm.otp}
                        onChange={handleOtpChange}
                      />
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2 btn-block"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="reset-password-modal"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="icon-close" />
                  </span>
                </button>
                <div className="form-box">
                  <h4 className="text-center mb-3">Reset Password</h4>
                  <form onSubmit={handleResetPasswordSubmit}>
                    <div className="form-group">
                      <label htmlFor="new-password">New Password *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="new-password"
                        name="newPassword"
                        required
                        value={resetPasswordForm.newPassword}
                        onChange={handleResetPasswordChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm-password"
                        name="confirmPassword"
                        required
                        value={resetPasswordForm.confirmPassword}
                        onChange={handleResetPasswordChange}
                      />
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2 btn-block"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="toast toast-container position-fixed bottom-0 end-0 p-3"
          id="my-toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-header">
            <strong className="me-auto" id="toast-title">
              Info
            </strong>
            <small className="text-muted">just now</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="toast-body" id="toast-body">
            This is a toast message.
          </div>
        </div>

        {/* End .modal */}

        {/* Plugins JS File */}
        {/* Main JS File */}
      </div>
    </>
  );
};

export default SubFooter;
