"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/CommerceButtons";

type Field = { name: string; label: string; type?: string; required?: boolean; defaultValue?: string };

type Props = {
  action: string;
  fields: Field[];
  submitLabel: string;
  extra?: Record<string, string>;
};

export function AuthForm({ action, fields, submitLabel, extra }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
            <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
            <input
              name={f.name}
              type={f.type ?? "text"}
              required={f.required ?? true}
              defaultValue={f.defaultValue}
              className={inputClass}
            />
          </div>
        ),
      )}
      {message && <p className="break-all text-sm text-neutral-700">{message}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Đang xử lý..." : submitLabel}
      </Button>
    </form>
  );
}
