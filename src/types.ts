export interface Book {
  id: string;
  title: string;
  author: string;
  ownerId: string;
  createdAt?: any; // можна конкретизувати як Timestamp, якщо хочеш
}
