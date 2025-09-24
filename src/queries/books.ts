"use client"

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@/types";

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
    staleTime: 1000 * 60, // кеш 1 хвилина
    refetchOnWindowFocus: false,
  });
};
