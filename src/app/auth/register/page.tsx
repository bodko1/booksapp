"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {redirect, useRouter} from "next/navigation";

export default function RegisterPage() {
  const { register,user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Успішна реєстрація!");
      router.push("/books");
    } catch (err) {
      alert("Помилка реєстрації");
    }
  };
  if (user) redirect("/books");


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Реєстрація
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Зареєструватися
          </button>
          <div>
            <p className="flex justify-center align-center gap-1">
              Вже є акаунт?
              <span onClick={() => redirect("/auth/login")}> Login</span></p>

          </div>
        </form>
      </div>
    </div>
  );
}
