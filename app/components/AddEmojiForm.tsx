"use client";

import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EmojiItemType } from "../data/EmojiData";

export default function AddEmojiForm() {
  const [textStr, setText] = useState("");
  const [titleStr, setTitleStr] = useState("");

  const clearState = () => {
    setText("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const text = formData.get("text");
    const title = formData.get("title");
    console.log(text);
    console.log(title);
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
          className="border-solid border-2 border-orange-200"
        />
      </label>
      <label htmlFor="" className="flex flex-col">
        Text
        <textarea
          name="text"
          id="clipboard-form"
          cols={30}
          rows={8}
          maxLength={200}
          placeholder="( ˘ω˘ )ｽﾔｧ…"
          value={textStr}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="border-solid border-2 border-orange-200"
        ></textarea>
      </label>
      <div className="flex justify-end">
        <button className="bg-orange-600 text-white rounded p-2 mt-4">
          Submit
        </button>
      </div>
    </form>
  );
}
