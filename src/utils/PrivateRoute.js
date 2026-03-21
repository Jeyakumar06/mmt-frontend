import { useLocation } from "wouter";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!token) {
      setLocation("/login");
    } 
  }, [token, setLocation]);

  if (!token) return null;

  return children;
}
