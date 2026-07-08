"use client";

import { useRouter } from "next/navigation";
import type { User } from "@/generated/prisma/client";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/CommerceButtons";

export function AddressForm({ user }: { user: User }) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch("/api/auth/address", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    router.push("/vn/login/profile");
    router.refresh();
  }

  const fields: [string, string, string][] = [
    ["addressName", "Tên địa chỉ", user.addressName],
    ["street", "Đường", user.street],
    ["addressType", "Loại", user.addressType],
    ["city", "Thành phố", user.city],
    ["state", "Tỉnh", user.state],
    ["zipcode", "Mã bưu điện", user.zipcode],
    ["country", "Quốc gia", user.country],
    ["phone", "Điện thoại", user.phone],
  ];

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      {fields.map(([name, label, value]) => (
        <div key={name}>
          <label className="mb-1.5 block text-sm font-medium">{label}</label>
          <input name={name} defaultValue={value} className={inputClass} />
        </div>
      ))}
      <Button type="submit" className="w-full">Lưu địa chỉ</Button>
    </form>
  );
}
