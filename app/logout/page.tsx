"use client";

import { useEffect, useState } from "react";
import { getCookie } from "../hooks/useCookie";

export default function LoginPage() {
  const [logoutSuccess, setLogoutSuccess] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      const baseHeaders = { "Content-Type": "application/json" };
      const csrftoken = getCookie("csrftoken");
      if (!csrftoken) {
        throw new Error("CSRF Token missing");
      }
      const response = await fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      });
      const content: { detail: string } = await response.json();
      setLogoutSuccess(content["detail"]);
    };
    fetchData();
  }, []);

  return <p>{logoutSuccess ?? "Logging you out..."}</p>;
}
