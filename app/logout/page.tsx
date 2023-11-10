"use client";

import { useEffect, useState } from "react";
import { getCookie } from "../hooks/useCookie";
import Link from "next/link";

export default function LogoutPage() {
  const [logoutSuccess, setLogoutSuccess] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const csrftoken = getCookie("csrftoken");
      if (!csrftoken) {
        throw new Error("CSRF Token missing");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      );
      const content: { detail: string } = await response.json();
      setLogoutSuccess(content["detail"]);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen  max-w-lg mx-auto flex items-center">
      <div className="flex flex-col grow p-12 border rounded">
        <h1 className="text-xl mb-12">
          {logoutSuccess ?? "Logging you out..."}
        </h1>
        <Link
          href="/login"
          className="pointer-events-auto rounded-md  hover:bg-teal-50 px-2 leading-6 text-teal-600 ml-auto py-1"
        >
          Go to Login page
        </Link>
      </div>
    </main>
  );
}
