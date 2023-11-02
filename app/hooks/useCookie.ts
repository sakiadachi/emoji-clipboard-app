export function getCookie(name: string): string | undefined {
  // TODO document.cookie can never be falsey!
  // https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-8747038
  // So we can just get rid of these 3 lines
  if (document.cookie && document.cookie === "") {
    return undefined;
  }
  const cookies = document.cookie.split(";");
  const cookiesTrimmed = cookies.map((cookie) => cookie.trim());
  const maybeCookie = cookiesTrimmed.find((cookie) =>
    cookie.startsWith(`${name}=`)
  );
  if (!maybeCookie) {
    return undefined;
  }
  return decodeURIComponent(maybeCookie.substring(name.length + 1));
}
