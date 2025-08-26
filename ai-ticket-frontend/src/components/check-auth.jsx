import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const verifyToken = async () => {
      if (protectedRoute) {
        if (!token) {
          navigate("/login");
          return;
        }
        try {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) {
            localStorage.removeItem("token");
            navigate("/login");
          }
          setLoading(false);
        } catch (err) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else {
        if (token) {
          navigate("/");
        } else {
          setLoading(false);
        }
      }
    };
    verifyToken();
  }, [navigate, protectedRoute]);

  if (loading) {
    return <div>loading...</div>;
  }
  return children;
}

export default CheckAuth;
