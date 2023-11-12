"use client";

import { copyToClipboard, onClickLike } from "../hooks/useClipboards";
import { ClipboardType } from "../interfaces/Clipboard";

type PropsType = {
  clipboard: ClipboardType;
};
export default function ClipboardCard(props: PropsType) {
  const { clipboard } = props;
  return (
    <li
      className="pointer-events-auto border w-full border-slate-200 hover:border-slate-500 rounded text-lg p-4 mb-4 cursor-pointer"
      onClick={() => {
        copyToClipboard(clipboard);
      }}
    >
      <p className="whitespace-pre-line break-words">{clipboard.text}</p>
      <div className="flex justify-end items-baseline mt-2">
        <p className="text-slate-600 text-sm">
          clipboard title: {clipboard.title}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickLike(clipboard);
          }}
          className="hover:bg-amber-100 focus:bg-amber-100 rounded p-2 ml-auto text-sm"
        >
          👆 I Like it!
        </button>
        <button
          onClick={() => copyToClipboard(clipboard)}
          className="hover:bg-amber-100 focus:bg-amber-100 rounded p-2 ml-4 text-sm"
        >
          🗒️ Copy
        </button>
      </div>
    </li>
  );
}
