import React from "react";

const LoadingPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div
        className="spinner-border text-primary mb-4"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <h4 className="fw-semibold">Preparing your journey ✈️</h4>
      <p className="text-muted mt-2">
        Finding the best destinations, flights, and stays for you.
      </p>
    </div>
  );
};

export default LoadingPage;
