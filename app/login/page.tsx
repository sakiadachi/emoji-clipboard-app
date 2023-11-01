"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

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

    /**
     * Login request
     */
    const response = await fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
