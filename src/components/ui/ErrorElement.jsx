import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h1 className="display-1 fw-bold text-primary">404</h1>

      <h2 className="mb-3">Oops! You’re off the map 🌍</h2>

      <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
        The destination you’re looking for doesn’t exist or may have been moved.
        Let’s get you back on track and planning your next adventure.
      </p>

      <div className="d-flex gap-3">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          🏠 Back to Home
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ⬅️ Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorElement;
