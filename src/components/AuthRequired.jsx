import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function AuthRequired() {
  // manually set auth token for now
  const auth = { token: null };

  if (!auth.token) {
    return (
      <Navigate to="/login" state={{ message: "You must log in first." }} />
    );
  }

  return <Outlet />;
}
