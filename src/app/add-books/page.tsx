"use client";

import { useState } from "react";
import { useAddBook } from "@/queries/books";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AddBooksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const addBookMutation = useAddBook();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addBookMutation.mutate(
      { title, author, ownerId: user.uid },
      {
        onSuccess: () => {
          setTitle("");
          setAuthor("");
          router.push("/books"); // редірект після додавання
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <h1 className="!text-3xl !font-bold mb-4">Додати книгу</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-md"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва книги"
          className="border p-2 rounded"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Автор"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Додати книгу
        </button>
      </form>
    </div>
  );
}
