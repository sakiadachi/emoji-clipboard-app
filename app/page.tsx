"use client";
import EmojiList from "./components/EmojiList";
import AddEmojiForm from "./components/AddEmojiForm";
import Header from "./components/Header";
import { useState } from "react";
import { fetchApi } from "./libs/fetch";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "./components/loading";

export default function Home() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);

  const fetcher = () =>
    fetchApi("auth/user/").then(async (res) => {
      if (res.status === 403) {
        // 認証失敗
        router.replace("/login");
        return;
      }
      return await res.json();
    });

  const { data, error, isLoading } = useSWR("auth/user/", fetcher);

  if (error) {
    return (
      <main className="min-h-screen max-w-screen-md mx-auto p-10">
        <Header />
        <div className="gap-4">
          <p>Error</p>
        </div>
      </main>
    );
  }

  if (!data || isLoading) {
    return (
      <main className="min-h-screen max-w-screen-md mx-auto p-10">
        <Header />
        <div className="gap-4">
          <Loading />
        </div>
      </main>
    );
  }

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
