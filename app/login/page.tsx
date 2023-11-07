"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import PrimaryButton from "../components/PrimaryButton";
import Link from "next/link";

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
    const response = await fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        ...{ "Content-Type": "application/json" },
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
    <main className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
      <h1 className="text-xl mb-10">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-12 border rounded mb-10"
      >
        <label className="flex flex-col mb-6 leading-8">
          User Name:
          <input type="text" name="username" className="mt-2" />
        </label>
        <label className="flex flex-col mb-10 leading-8">
          Password:
          <input type="password" name="password" className="mt-2" />
        </label>

        <PrimaryButton
          type={"submit"}
          text={"Login"}
          additionalClassName={"h-12"}
        />
      </form>
      <Link href="/registration" className="text-teal-600">
        Create Account
      </Link>
    </main>
  );
}
