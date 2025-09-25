import {useAuth} from "@/context/AuthContext";
import { useRouter} from "next/navigation";
import {Button} from "@/components/ui/button"
import Link from "next/link";
import {usePathname}  from "next/navigation";

export default function Header(){
  const {user,logout} = useAuth();
  const router=useRouter();
  const pathname= usePathname();

  if(!user) return null;

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="flex gap-4 p-4 bg-gray-100">
        <Link href="/books" passHref>
          <Button
            disabled={pathname === "/books"}
            className={pathname === "/books" ? "bg-gray-700 cursor-not-allowed" : ""}          >
            Books
          </Button>
        </Link>

        <Link href="/my-books" passHref>
          <Button
            disabled={pathname === "/my-books"}
            className={pathname === "/my-books" ? "bg-gray-700 cursor-not-allowed" : ""}
          >
            My Books
          </Button>
        </Link>

        <Link href="/add-books" passHref>
          <Button
            disabled={pathname === "/add-books"}
            className={pathname === "/add-books" ? "bg-gray-700 " : ""}
          >
            Add Books
          </Button>
        </Link>
      </div>
      <div>
        <span className="mr-4">{user.email}</span>
        <Button variant="destructive" onClick={() => {
          logout();
          router.push("/auth/login");
        }}>
          Logout
        </Button>
      </div>
    </header>
  )
}