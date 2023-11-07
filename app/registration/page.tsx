"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import PrimaryButton from "../components/PrimaryButton";

export default function RegistartionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccessed, setRegisterSuccessed] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (event.target == null) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmpassword");

    /**
     * Registration request
     */
    const response = await fetch("http://localhost:8000/register/", {
      method: "POST",
      credentials: "include",
      headers: {
        ...{ "Content-Type": "application/json" },
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password2: confirmPassword,
      }),
    });
    setIsLoading(false);
    if (!response.ok) {
      const error = await response.json();
      console.error(error);

      alert("Login failed");
      return;
    }
    setRegisterSuccessed(true);
  };

  if (isLoading) return <p>Loading...</p>;

  if (registerSuccessed)
    return (
      <main className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col p-12 border rounded">
          <h1 className="text-xl mb-10">Registration successed!</h1>
          <Link href="/login" className="text-teal-600">
            Go to Login Page
          </Link>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
      <h1 className="text-xl mb-10">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-12 border rounded"
      >
        <label className="flex flex-col mb-6 leading-8">
          User Name:
          <input type="text" name="username" className="mt-2 border" />
        </label>
        <label className="flex flex-col mb-6 leading-8">
          Email:
          <input type="email" name="email" className="mt-2 border" />
        </label>
        <label className="flex flex-col mb-6 leading-8">
          Password:
          <input type="password" name="password" className="mt-2 border" />
        </label>
        <label className="flex flex-col mb-6 leading-8">
          Confirm Password:
          <input
            type="password"
            name="confirmpassword"
            className="mt-2 border"
          />
        </label>

        <PrimaryButton
          type={"submit"}
          text={"Register"}
          additionalClassName={"h-12"}
        />
      </form>
      <Link href="/login" className="text-teal-600 mt-10">
        Go to Login Page
      </Link>
    </main>
  );
}
