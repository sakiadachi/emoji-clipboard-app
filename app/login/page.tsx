"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { getCookie } from "../hooks/useCookie";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.target == null) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const username = formData.get("username");
    const password = formData.get("password");

    const baseHeaders = { "Content-Type": "application/json" };
    const csrftoken = getCookie("csrftoken");
    console.log(csrftoken);
    /**
     * Login request
     */
    const response = await fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      credentials: "include",

      headers: {
        ...baseHeaders,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      alert("Login failed");
      return;
    }
    router.replace("/");
  };

  return (
    <main className="flex min-h-screen flex-col p-12 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="flex flex-col mb-4">
          Username:
          <input
            type="text"
            name="username"
            className="border-solid border-2 border-orange-200"
          />
        </label>
        <label className="flex flex-col mb-4">
          Password:
          <input
            type="password"
            name="password"
            className="border-solid border-2 border-orange-200"
          />
        </label>
        <button
          type="submit"
          className="bg-orange-600 text-white rounded p-2 mt-4"
        >
          Login
        </button>
      </form>
    </main>
  );
}
