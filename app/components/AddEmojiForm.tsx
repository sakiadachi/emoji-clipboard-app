"use client";

import { FormEvent, useState } from "react";
import { getCookie } from "../hooks/useCookie";
import PrimaryButton from "./PrimaryButton";

export default function AddEmojiForm() {
  const [textStr, setText] = useState("");
  const [titleStr, setTitleStr] = useState("");

  const clearState = () => {
    setText("");
    setTitleStr("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const text = formData.get("text");
    const title = formData.get("title");

    const baseHeaders = { "Content-Type": "application/json" };
    const csrftoken = getCookie("csrftoken");

    const response = await fetch("http://localhost:8000/api/clipboards/", {
      method: "POST",
      credentials: "include",
      headers: csrftoken
        ? {
            ...baseHeaders,
            "X-CSRFToken": csrftoken,
          }
        : baseHeaders,
      body: JSON.stringify({
        title,
        text,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
    }

    clearState();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="" className="flex flex-col">
        Title:
        <input
          required
          name="title"
          type="text"
          placeholder="スヤァ"
          maxLength={20}
          value={titleStr}
          onChange={(e) => setTitleStr(e.target.value)}
          className="border leading-8 mb-4"
        />
      </label>
      <label htmlFor="" className="flex flex-col">
        Text
        <textarea
          required
          name="text"
          id="clipboard-form"
          cols={30}
          rows={6}
          maxLength={200}
          placeholder="( ˘ω˘ )ｽﾔｧ…"
          value={textStr}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="border leading-8 mb-4"
        ></textarea>
      </label>
      <div className="flex justify-end">
        <PrimaryButton
          type={"submit"}
          text={"Submit"}
          additionalClassName={"h-12 px-6"}
        />
      </div>
    </form>
  );
}
