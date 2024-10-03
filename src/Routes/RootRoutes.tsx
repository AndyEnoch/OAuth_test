import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import ProtectedRoute from "./ProtectedRoute";
import AuthenticatedPage from "../AuthenticatedPage";

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/token" element={<h1>Processing OAuth2 Callback...</h1>} />
        <Route
          path="/authenticated"
          element={
            <ProtectedRoute>
              <AuthenticatedPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
