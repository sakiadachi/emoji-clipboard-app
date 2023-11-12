"use client";

import { copyToClipboard, onClickLike } from "../hooks/useClipboards";
import { ClipboardType } from "../interfaces/Clipboard";

type PropsType = {
  clipboard: ClipboardType;
};
export default function ClipboardCard(props: PropsType) {
  const { clipboard } = props;
  return (
    <li key={clipboard.uuid} className="mb-4">
      <div
        onClick={() => {
          copyToClipboard(clipboard);
        }}
        className="pointer-events-auto w-full bg-slate-50 hover:bg-slate-100 text-black rounded text-lg p-4"
      >
        <p>{clipboard.title}</p>
        <p className="whitespace-pre-line break-words">{clipboard.text}</p>
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickLike(clipboard);
            }}
            className="border border-slate-600 text-slate-600 rounded px-2 ml-auto"
          >
            👆I Like it!
          </button>
          <button
            onClick={() => copyToClipboard(clipboard)}
            className="border border-slate-600 text-slate-600 rounded px-2 ml-2"
          >
            Click to copy
          </button>
        </div>
      </div>
    </li>
  );
}
