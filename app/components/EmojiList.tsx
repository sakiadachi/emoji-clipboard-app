"use client";

import { useEffect, useState } from "react";
import { EmojiItemType } from "../data/EmojiData";

async function fetchClipboards(): Promise<EmojiItemType[]> {
  const response = await fetch("http://localhost:8000/api/v1/clipboards/", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    const error = response.json();
    console.error(error);
    return [];
  }
  return response.json();
}

export default function EmojiList() {
  const [clipboards, setClipboardList] = useState<EmojiItemType[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchClipboards();
      setClipboardList(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const copyToClipboard = async (item: EmojiItemType) => {
    navigator.clipboard.writeText(item.text).then(() => {
      window.prompt("Copied");
    });
  };

  if (isLoading) return <p>Loading ...</p>;
  if (clipboards.length === 0) return <p>no data</p>;

  return (
    <div>
      <ul>
        {clipboards.map((item) => (
          <li key={item.id} className="mb-4">
            <button
              onClick={() => copyToClipboard(item)}
              className="w-full bg-slate-100 text-black rounded text-lg pa-3"
            >
              {item.title}
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
