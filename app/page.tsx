"use client";
import EmojiList from "./components/EmojiList";
import AddEmojiForm from "./components/AddEmojiForm";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { fetchApi } from "./libs/fetch";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);

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
  }, [router]);
  return (
    <main className="min-h-screen max-w-screen-md mx-auto p-10">
      <Header />
      <div className="gap-4">
        <div className="flex">
          <button
            onClick={() => setShowForm(!showForm)}
            title="toggle form"
            className="bg-slate-100 px-3 py-2 rounded ml-auto font-semibold"
          >
            {showForm ? "-" : "+"}
          </button>
        </div>

        {showForm ? <AddEmojiForm /> : <div />}
        <EmojiList />
      </div>
    </main>
  );
}
