"use client";

import { useEffect, useState } from "react";
import { Clipboard } from "../interfaces/Clipboard";
import { getCookie } from "../hooks/useCookie";

async function fetchClipboards(): Promise<Clipboard[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clipboards/`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const error = response.json();
    console.error(error);
    return [];
  }
  return response.json();
}

async function likeClipboard(item: Clipboard): Promise<Response> {
  const csrftoken = getCookie("csrftoken");
  if (!csrftoken) {
    throw new Error("CSRF Token missing");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clipboards/${item.uuid}/`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        title: item.title,
        text: item.text,
        order: item.order,
      }),
    }
  );
  return response;
}
export default function EmojiList() {
  const [clipboards, setClipboardList] = useState<Clipboard[]>([]);
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

  const copyToClipboard = async (item: Clipboard) => {
    try {
      await navigator.clipboard.writeText(item.text);
      alert("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  /**
   * Increment Clipboard's display order
   */
  const onClickLike = async (item: Clipboard) => {
    const _item = {
      ...item,
      order: item.order + 1,
    } as Clipboard;

    const response = await likeClipboard(_item);
    if (response.ok) {
      alert("Order changed");
    }
  };

  if (isLoading) return <p>Loading ...</p>;
  if (clipboards.length === 0) return <p>no data</p>;

  return (
    <div>
      <h1 className="text-xl mb-4">Clipboard List</h1>
      <ul>
        {clipboards.map((item) => (
          <li key={item.uuid} className="mb-4">
            <div
              onClick={() => {
                copyToClipboard(item);
              }}
              className="pointer-events-auto w-full bg-slate-50 hover:bg-slate-100 text-black rounded text-lg p-4"
            >
              <p>{item.title}</p>
              <p className="whitespace-pre-line break-words">{item.text}</p>
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickLike(item);
                  }}
                  className="border border-slate-600 text-slate-600 rounded px-2 ml-auto"
                >
                  👆I Like it!
                </button>
                <button
                  onClick={() => copyToClipboard(item)}
                  className="border border-slate-600 text-slate-600 rounded px-2 ml-2"
                >
                  Click to copy
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
