"use client";

import { useState } from "react";
import {useBooks, useDeleteBook, useEditBook} from "@/queries/books";
import { useAuth } from "@/context/AuthContext";
import {redirect} from "next/navigation";

export default function MyBooksPage() {
  const { user } = useAuth();
  const { data: books = [], isLoading } = useBooks();
  const editBookMutation = useEditBook();
  const deleteBookMutation=useDeleteBook();

  const [editingBook, setEditingBook] = useState<null | { id: string; title: string; author: string }>(null);

  if (!user) return <p>Будь ласка, увійдіть</p>;
  if (isLoading) return <p>Завантаження...</p>;

  const handleSave = () => {
    if (!editingBook) return;
    editBookMutation.mutate(editingBook);
    setEditingBook(null);
  };
  const handleDelete=(bookId: string)=>{
    deleteBookMutation.mutate(bookId)
    redirect("/my-books")
  }


  return (
    <div className="flex flex-col items-center p-4 gap-4 min-h-screen">
      <h1 className="!text-3xl !font-bold">Мої книги</h1>

      <ul className="flex flex-col gap-3 w-full max-w-md mt-4">
        {books
          .filter(book => book.ownerId === user.uid)
          .map(book => (
            <li key={book.id} className="border p-3 rounded shadow-sm flex flex-col gap-2">
              {editingBook?.id === book.id ? (
                <>
                  <input
                    className="border p-1 rounded"
                    value={editingBook.title}
                    onChange={e => setEditingBook(prev => prev && { ...prev, title: e.target.value })}
                  />
                  <input
                    className="border p-1 rounded"
                    value={editingBook.author}
                    onChange={e => setEditingBook(prev => prev && { ...prev, author: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">Зберегти</button>
                    <button onClick={() => setEditingBook(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Скасувати</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-gray-500">Автор: {book.author}</div>
                  <button
                    onClick={() =>
                      setEditingBook({ id: book.id, title: book.title, author: book.author })
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                  >
                    Edit
                  </button>
                  <button
                  onClick={()=>handleDelete(book.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                  >
                    Видалити
                  </button>

                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
