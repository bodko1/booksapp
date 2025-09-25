"use client"

import { db } from "@/lib/firebase";
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type { Book } from "@/types";
import {serverTimestamp} from "@firebase/database";

export const useBooks = () => {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "books"));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, "id">),
      }));

    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, author, ownerId }: Omit<Book, "id" | "createdAt">) => {
      if (!title) throw new Error("Вкажіть назву книги");
      if (!author) throw new Error("Вкажіть автора книги");

      const docRef = await addDoc(collection(db, "books"), {
        title,
        author,
        ownerId,
        createdAt: serverTimestamp(),
      });

      return { id: docRef.id, title, author, ownerId };
    },
    onSuccess: (newBook) => {
      queryClient.setQueryData(["books"], (old: Book[] | undefined) => [...(old || []), newBook]);
    },
    onError: (err: any) => {
      alert(err?.message || "Помилка при додаванні книги");
    },

  });
};

type EditBookInput = Partial<Omit<Book, "id">> & { id: string };

export const useEditBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBook: EditBookInput) => {
      const { id, ...fieldsToUpdate } = updatedBook;
      if (!id) throw new Error("Book ID is required");

      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, fieldsToUpdate);

      return { id, ...fieldsToUpdate };
    },
    onSuccess: (updatedBook) => {
      queryClient.setQueryData<Book[]>(["books"], (oldBooks = []) =>
        oldBooks.map(book =>
          book.id === updatedBook.id ? { ...book, ...updatedBook } : book
        )
      );
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (bookId) => {
      const bookRef = doc(db, "books", bookId);
      await deleteDoc(bookRef);
      return bookId;
    },
    onSuccess: (bookId) => {
      queryClient.setQueryData<Book[]>(["books"], (oldBooks) =>
        oldBooks ? oldBooks.filter((book) => book.id !== bookId) : []
      );
    },
  });
};