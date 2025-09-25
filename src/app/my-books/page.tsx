"use client"

import {useBooks} from "@/queries/books";
import {useAuth} from "@/context/AuthContext"
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function MyBooksPage() {
  const {user}=useAuth();
  const {data:books= [] ,isLoading,error} = useBooks();
  const myBooks = books.filter((book)=>book.ownerId===user?.uid);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <h1 className="text-3xl font-bold mb-4"> Мої книги </h1>

      {myBooks.length === 0 ?
        (<>
      <p>У Вас ще немає книг</p>
       <Link href="/add-books" passHref>
         <Button>
           Додати книгу
         </Button>
       </Link>
      </>) :
        (<ul className="flex flex-col gap-3 w-full max-w-md mt-4">
          {myBooks.map((book)=>
          <li
            key={book.id}
            className="border p-3 rounded shadow-sm flex justify-between items-center"

          >
            <div>
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
            <Link href={`/edit-book/${book.id}`} passHref>
              <Button>Відкрити</Button>
            </Link>
          </li>)}
        </ul>)
      }

    </div>
  );
}