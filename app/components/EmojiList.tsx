"use client";

import { useState } from "react";
import { EmojiItem, emojiItems } from "../data/EmojiData";

export default function EmojiList() {
  const [showMsgId, setShowMsgId] = useState("");

  const copyToClipboard = async (item: EmojiItem) => {
    navigator.clipboard.writeText(item.emoji).then(() => {
      setShowMsgId(item.id);
      setTimeout(() => {
        setShowMsgId("");
      }, 1000);
    });
  };
  return (
    <div>
      <ul>
        {emojiItems.map((item) => (
          <li key={item.id} className="mb-4">
            <button
              onClick={() => copyToClipboard(item)}
              className="w-full bg-slate-100 text-black rounded text-lg pa-3"
            >
              {item.emoji}
            </button>
            {showMsgId === item.id && <span>Copied!</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
