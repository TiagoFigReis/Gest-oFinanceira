import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth/Authorization.service";
import { Outlet } from "react-router-dom";

export default function AuthGuard() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false); 

  useEffect(() => {
    const isAuth = isAuthenticated();
    setAuth(isAuth);

    if (!isAuth) {
      navigate("/");
    }
  }, [navigate]);

  return auth ? <Outlet /> : null;
}