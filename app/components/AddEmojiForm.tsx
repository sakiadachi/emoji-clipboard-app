"use client";

import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EmojiItem } from "../data/EmojiData";

export default function AddEmojiForm() {
  const [emojiStr, setEmojiStr] = useState("");
  const [titleStr, setTitleStr] = useState("");

  const clearState = () => {
    setEmojiStr("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      emoji: { value: string };
      title: { value: string };
    };
    console.log(target.emoji.value);

    const today = dayjs().valueOf();
    const id = uuidv4();

    const emojiItem: EmojiItem = {
      emoji: target.emoji.value,
      title: target.title.value,
      createdDate: today,
      order: 0,
      id: id,
    };
    // TODO: POST request
    clearState();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="" className="flex flex-col">
        Title:
        <input
          name="title"
          type="text"
          placeholder="スヤァ"
          maxLength={20}
          value={titleStr}
          onChange={(e) => setTitleStr(e.target.value)}
        />
      </label>
      <label htmlFor="" className="flex flex-col">
        Emoji
        <textarea
          name="emoji"
          id="emoji-form"
          cols={30}
          rows={8}
          maxLength={200}
          placeholder="( ˘ω˘ )ｽﾔｧ…"
          value={emojiStr}
          onChange={(e) => {
            setEmojiStr(e.target.value);
          }}
          className="text-black"
        ></textarea>
      </label>
      <div className="flex justify-end">
        <button className=" bg-rose-400 rounded p-2 mt-4">submit</button>
      </div>
    </form>
  );
}
