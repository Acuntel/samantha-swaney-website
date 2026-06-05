"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import AdminTabs from "@/components/admin/AdminTabs";

const PASSWORD = "1111";
const KEY = "ss-admin";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") setAuthed(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === PASSWORD) {
      sessionStorage.setItem(KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[70vh] grid place-items-center bg-sand">
        <form onSubmit={submit} className="card p-8 w-full max-w-sm">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-teal-50 text-teal mx-auto">
            <Lock size={20} />
          </div>
          <h1 className="text-xl font-semibold text-navy text-center mt-4">
            Samantha Admin
          </h1>
          <p className="text-sm text-mute text-center mt-1">
            Sign in to manage your listings and blog.
          </p>
          <label className="block mt-6 text-xs uppercase tracking-wider text-mute mb-1.5">
            Password
          </label>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:outline-none focus:border-teal"
          />
          {error && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              That password is not right.
            </div>
          )}
          <button type="submit" className="btn-primary w-full mt-5">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return <AdminTabs />;
}
