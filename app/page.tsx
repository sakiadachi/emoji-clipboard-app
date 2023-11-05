"use client";
import EmojiList from "./components/EmojiList";
import AddEmojiForm from "./components/AddEmojiForm";
import Header from "./components/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function authUser() {
      const response = await fetch("http://localhost:8000/auth/user/", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 403) {
        // Authentication Failed
        router.replace("/login");
      }
    }
    authUser();
  }, [router]);

  return (
    <main className="min-h-screen max-w-screen-md mx-auto p-10">
      <Header />
      <div className="gap-4">
        <AddEmojiForm />
        <EmojiList />
      </div>
    </main>
  );
}
