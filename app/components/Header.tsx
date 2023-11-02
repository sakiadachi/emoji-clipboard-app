"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const clickLogout = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      router.replace("/login");
    }
  };

  return (
    <header>
      <button onClick={clickLogout}>Logout</button>
    </header>
  );
}
