
"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";



const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    studentId: z
      .string()
      .min(1, "Student ID is required")
      .min(6, "Student ID must be at least 6 characters"),


    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


type SignupData = z.infer<typeof signupSchema>;





export default function SignupPage() {

  type SignupData = z.infer<typeof signupSchema>;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [errorFullName, setErrorFullName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorStudentId, setErrorStudentId] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");




  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");


    const result = signupSchema.safeParse({
      fullName,
      email,
      studentId,
      password,
      confirmPassword,
    });

    //error
    if (!result.success) {
      const errors = result.error.format();

      setErrorFullName(errors.fullName?._errors.join(". ") ?? "");
      setErrorEmail(errors.email?._errors.join(". ") ?? "");
      setErrorStudentId(errors.studentId?._errors.join(". ") ?? "");
      setErrorPassword(errors.password?._errors.join(". ") ?? "");
      setErrorConfirmPassword(errors.confirmPassword?._errors.join(". ") ?? "");
    }

    try {
      setLoading(true);



      const response = await axios.post(
        'http://localhost:3000/users/signup', {
        fullName,
        email,
        studentId,
        password,
        confirmPassword
      }
      );
      console.log("User created:", response.data);
      setSuccessMessage(response.data.message);
      // console.log(result.data);


      //success
      // Clear form
      setFullName("");
      setEmail("");
      setStudentId("");
      setPassword("");
      setConfirmPassword("");

      setErrorFullName("");
      setErrorEmail("");
      setErrorStudentId("");
      setErrorPassword("");
      setErrorConfirmPassword("");


    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setApiError(
          err.response?.data?.message || "Signup failed. Try again."
        );
      } else {
        setApiError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }


  }





  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrorFullName("");
              }}

              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg ${errorFullName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errorFullName && <p className="text-red-600 text-sm">{errorFullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@university.edu"
            />
            {errorEmail && <p className="text-red-600 text-sm">{errorEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setErrorStudentId("");
              }}
              placeholder="12345678"
              className={`w-full px-4 py-2 border rounded-lg ${errorStudentId ? "border-red-500" : "border-gray-300"
                }`}

            />
            {errorStudentId && (
              <p className="text-red-600 text-sm">{errorStudentId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorPassword("");
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg ${errorPassword ? "border-red-500" : "border-gray-300"
                }`}

            />
            {errorPassword && (
              <p className="text-red-600 text-sm">{errorPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorConfirmPassword("");
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg ${errorConfirmPassword ? "border-red-500" : "border-gray-300"
                }`}

            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="terms"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-500 ml-1">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
            </label>
          </div>

          <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 bg-green-100 text-green-700 p-2 rounded">
            {successMessage}
          </div>
        )}


        {apiError && (
          <div className="mt-4 bg-red-100 text-red-600 p-2 rounded">
            {apiError}
          </div>
        )}


        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium ml-1">Sign in</Link>
        </div>
      </div>
    </div >
  );
}
