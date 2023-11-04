import EmojiList from "./components/EmojiList";
import AddEmojiForm from "./components/AddEmojiForm";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12 max-w-lg mx-auto">
      <Header />
      <AddEmojiForm />
      <hr className="my-4" />
      <EmojiList />
    </main>
  );
}
