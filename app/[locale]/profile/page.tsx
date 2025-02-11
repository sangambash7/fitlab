"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "../components/LoadingSpinner";

function Profile() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.log("Error retrieving user:", error);
        return;
      }

      setFullName(user.user_metadata.full_name || "");
      setEmail(user.email || "");
      setLoading(false);
    }

    fetchUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      email: email,
      data: { full_name: fullName },
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col items-center sm:items-start">
      <h1 className="text-3xl">Personal Information</h1>
      <form
        className="pt-4 w-[80%] md:w-[60%] lg:w-[50%]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname">Full Name:</label>
          <input
            className={`border p-2 rounded-md ${
              isEditing ? "bg-white" : "bg-gray-200 cursor-not-allowed"
            }`}
            id="fullname"
            name="fullname"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className={`border p-2 rounded-md ${
              isEditing ? "bg-white" : "bg-gray-200 cursor-not-allowed"
            }`}
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="flex gap-5">
          <button
            className="border bg-[#1B4A8E] text-white hover:bg-blue-800 text-lg px-4 py-2 rounded-sm mt-5"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            className="border bg-white text-[#1B4A8E] hover:bg-slate-200 text-lg px-4 py-2 rounded-sm mt-5 cursor-pointer"
            type="submit"
            disabled={isEditing}
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </button>
        </div>

        {success && (
          <div className="flex">
            <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md ">
              Your personal information was updated successfully
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
