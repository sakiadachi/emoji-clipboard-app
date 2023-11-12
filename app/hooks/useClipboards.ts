import { ClipboardType } from "../interfaces/Clipboard";
import { fetchApi } from "../libs/fetch";

export async function likeClipboard(item: ClipboardType): Promise<Response> {
  const response = await fetchApi(
    `api/clipboards/${item.uuid}/`,
    {
      method: "PUT",
      body: JSON.stringify({
        title: item.title,
        text: item.text,
        order: item.order,
      }),
    },
    { "Content-Type": "application/json" }
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
