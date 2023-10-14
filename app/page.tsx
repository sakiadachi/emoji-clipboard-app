import EmojiList from "./components/EmojiList";
import AddEmojiForm from "./components/AddEmojiForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <AddEmojiForm />
      <hr className="my-4" />
      <EmojiList />
    </main>
  );
}
