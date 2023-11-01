"use client";

import { useEffect, useState } from "react";
import { EmojiItemType } from "../data/EmojiData";

export default function EmojiList() {
  const [showMsgId, setShowMsgId] = useState("");
  const [clipboards, setClipboardList] = useState<EmojiItemType[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/clipboards/", { credentials: "include" })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setClipboardList(result);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const copyToClipboard = async (item: EmojiItemType) => {
    navigator.clipboard.writeText(item.text).then(() => {
      setShowMsgId(item.id);
      setTimeout(() => {
        setShowMsgId("");
      }, 1000);
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!clipboards) return <p>No profile data</p>;

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
            {showMsgId === item.id && <span>Copied!</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
