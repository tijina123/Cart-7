import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      {showConfetti && <Confetti width={width} height={height} />}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-white p-5 shadow rounded text-center"
      >
        <h1 className="text-success mb-3">🎉 Order Successful!</h1>
        <p className="lead">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
