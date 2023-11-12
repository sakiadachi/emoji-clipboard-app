"use client";

import { FormEvent, useState } from "react";
import { getCookie } from "../hooks/useCookie";
import PrimaryButton from "./PrimaryButton";
import { fetchApi } from "../libs/fetch";

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

    const response = await fetchApi(
      "api/clipboards/",
      {
        method: "POST",
        body: JSON.stringify({
          title,
          text,
        }),
      },
      { "Content-Type": "application/json" }
    );
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
    }

    clearState();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="flex flex-col">
        Title:
        <input
          required
          name="title"
          type="text"
          placeholder="Sleepy kaomoji"
          maxLength={20}
          value={titleStr}
          onChange={(e) => setTitleStr(e.target.value)}
          className="border leading-8 mb-4"
        />
      </label>
      <label className="flex flex-col">
        Text
        <textarea
          required
          name="text"
          id="clipboard-form"
          cols={30}
          rows={6}
          maxLength={200}
          placeholder="( ˘ω˘ )…"
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
