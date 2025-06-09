"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function ToastProvider() {
  useEffect(() => {
    console.log("ToastProvider mounted");
    // toast.success("Toast test"); // îl poți activa pentru test
  }, []);

  return <ToastContainer position="top-center" autoClose={3000} />;
}
