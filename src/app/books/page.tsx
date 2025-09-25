"use client";

import { useBooks } from "@/queries/books";
import { useAuth } from "@/context/AuthContext";
import {redirect} from "next/navigation";


export default function BooksPage() {
  const { user } = useAuth();
  const { data: books = [], isLoading, error } = useBooks();

  if (!user)  redirect("/auth/login");
  if (isLoading) return <p>Завантаження книг...</p>;
  if (error) return <p>Помилка: {error.message}</p>;



  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <h1 className="!text-3xl !font-bold mb-4">Всі книги</h1>

      {books.length === 0 ? (
        <p>Книг не знайдено</p>
      ) : (
        <ul className="flex flex-col gap-3 w-full max-w-md mt-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="border p-3 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-500">Автор: {book.author}</p>
              </div>
              <span className="text-xs text-gray-400">
                {book.ownerId === user.uid ? "Моя книга" : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
