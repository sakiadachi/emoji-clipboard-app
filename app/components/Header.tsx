"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  return (
    <header className="flex justify-end">
      <Link
        href="/logout"
        className="pointer-events-auto rounded-md  hover:bg-teal-50 px-2 leading-6 text-teal-600 ml-auto py-1"
      >
        Log out
      </Link>
    </header>
  );
}
