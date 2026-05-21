"use client";

import Toast from "@/components/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { z } from "zod";

interface User {
  id: number;
  fullName: string;
  email: string;
  studentId: string;
}

//Zod schema
const loginSchema = z.object({
  email: z
    .string("It is not string")
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 character "),


});

type LoginData = z.infer<typeof loginSchema>;


export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState<{ success: boolean } | null>(null);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError("");
    setLogin(null);


    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {

      const errors = result.error.format();

      setErrorEmail(errors.email?._errors.join(". ") ?? "");
      setErrorPassword(errors.password?._errors.join(". ") ?? "");
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(
        // process.env.NEXT_API_ENDPOINT + "/login",
        'http://localhost:3000/users/login',
        {
          email,
          password,
        }
      ); console.log("Login success:", response.data);

      setUser(response.data.user);




      //  success
      setLogin({ success: true });
      // localStorage.setItem("user", JSON.stringify(safeUser));
      //localStorage.setItem("name", email)
      router.push("/dashboard/moderator/overview");



      // Clear form
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setApiError(
          err.response?.data?.message || "Login failed. Try again."
        );
      } else {
        setApiError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  // setApiError(error.message)







  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

        {/* {errors && <p className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg">{errors}</p>} */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errorEmail ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} outline-none transition-all`}
              placeholder="your@university.edu"
            />
            {errorEmail && (
              <div className="mt-2 p-1 bg-red-100 text-red-700 rounded-lg text-sm">
                {errorEmail}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errorPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} outline-none transition-all`}
              placeholder="••••••••"
            />
          </div>
          {errorPassword && (
            <div className="mt-2 p-1 bg-red-100 text-red-700 rounded-lg text-sm">
              {errorPassword}
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/forgotpassword" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>

          <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {apiError && (
          <div className="mt-4 bg-red-100 text-red-700 p-2 rounded">
            {apiError}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
        </div>
      </div>

      {login?.success && <Toast />}



    </div>

  );


};

