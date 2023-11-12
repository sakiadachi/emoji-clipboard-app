"use client";
import EmojiList from "./components/EmojiList";
import AddEmojiForm from "./components/AddEmojiForm";
import Header from "./components/Header";
import { useEffect } from "react";
import { fetchApi } from "./libs/fetch";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApi(`auth/user/`);
      const content: { detail: string } = await response.json();
      if (response.status == 403) {
        router.replace("/login");
      }
      console.log(content);
    };
    fetchData();
  }, []);
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
