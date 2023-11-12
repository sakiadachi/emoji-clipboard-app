"use client";
import { Suspense, useEffect, useState } from "react";
import { ClipboardType } from "../interfaces/Clipboard";
import ClipboardCard from "./ClipboardCard";
import Loading from "../loading";

export const fetchClipboards = async (): Promise<ClipboardType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clipboards/`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    console.error(res);
    return [];
  }
  const response = await res.json();
  return response;
};

export default function EmojiList() {
  const [clipboards, setClipboardList] = useState<ClipboardType[]>([]);
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

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-xl mb-4">Clipboard List</h1>
      <Suspense fallback={<Loading />}>
        <ul>
          {clipboards.map((clipboard) => (
            <ClipboardCard key={clipboard.uuid} clipboard={clipboard} />
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
