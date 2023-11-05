"use client";

import { useEffect, useState } from "react";
import { EmojiItemType } from "../data/EmojiData";

async function fetchClipboards(): Promise<EmojiItemType[]> {
  const response = await fetch("http://localhost:8000/api/clipboards/", {
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
    try {
      await navigator.clipboard.writeText(item.text);
      alert("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (isLoading) return <p>Loading ...</p>;
  if (clipboards.length === 0) return <p>no data</p>;

  return (
    <div>
      <h1 className="text-xl mb-4">Clipboard List</h1>
      <ul>
        {clipboards.map((item) => (
          <li key={item.id} className="mb-4">
            <div
              onClick={() => {
                copyToClipboard(item);
              }}
              className="pointer-events-auto  w-full bg-slate-50 hover:bg-slate-100 text-black rounded text-lg p-4"
            >
              <p>{item.title}</p>
              <p className="whitespace-pre-line break-words ">{item.text}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => copyToClipboard(item)}
                  className="border border-slate-600 text-slate-600 rounded px-2 ml-auto"
                >
                  Copy
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
