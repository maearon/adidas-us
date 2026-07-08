"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Field = { name: string; label: string; type?: string; required?: boolean; defaultValue?: string };

type Props = {
  action: string;
  fields: Field[];
  submitLabel: string;
  error?: string;
  extra?: Record<string, string>;
};

export function AuthForm({ action, fields, submitLabel, error, extra }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(error ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(e.currentTarget);
    const body = { ...Object.fromEntries(formData.entries()), ...extra };

    const res = await fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error ?? "Có lỗi xảy ra");
      return;
    }

    if (data.message) setMessage(data.message);
    if (data.redirect) {
      router.push(data.redirect);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      {fields.map((f) =>
        f.type === "hidden" ? (
          <input key={f.name} type="hidden" name={f.name} defaultValue={f.defaultValue} />
        ) : (
          <div key={f.name}>
            <label className="mb-1 block text-sm font-medium">{f.label}</label>
            <input
              name={f.name}
              type={f.type ?? "text"}
              required={f.required ?? true}
              defaultValue={f.defaultValue}
              className="w-full border border-neutral-300 px-3 py-2 focus:border-black focus:outline-none"
            />
          </div>
        ),
      )}
      {message && <p className="break-all text-sm text-neutral-700">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black py-3 text-sm font-semibold uppercase text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        {loading ? "Đang xử lý..." : submitLabel}
      </button>
    </form>
  );
}
