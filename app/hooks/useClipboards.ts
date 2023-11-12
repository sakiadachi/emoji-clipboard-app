import { ClipboardType } from "../interfaces/Clipboard";
import { getCookie } from "./useCookie";

export async function likeClipboard(item: ClipboardType): Promise<Response> {
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

export const copyToClipboard = async (item: ClipboardType) => {
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
export const onClickLike = async (item: ClipboardType) => {
  const _item = {
    ...item,
    order: item.order + 1,
  } as ClipboardType;

  const response = await likeClipboard(_item);
  if (response.ok) {
    alert("Order changed");
  }
};
