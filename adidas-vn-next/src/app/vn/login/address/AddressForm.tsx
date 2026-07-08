"use client";

import { useRouter } from "next/navigation";
import type { User } from "@/generated/prisma/client";

export function AddressForm({ user }: { user: User }) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    await fetch("/api/auth/address", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.push("/vn/login/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        ["addressName", "Tên địa chỉ", user.addressName],
        ["street", "Đường", user.street],
        ["addressType", "Loại", user.addressType],
        ["city", "Thành phố", user.city],
        ["state", "Tỉnh", user.state],
        ["zipcode", "Mã bưu điện", user.zipcode],
        ["country", "Quốc gia", user.country],
        ["phone", "Điện thoại", user.phone],
      ].map(([name, label, value]) => (
        <div key={name}>
          <label className="mb-1 block text-sm font-medium">{label}</label>
          <input
            name={name}
            defaultValue={value}
            className="w-full border border-neutral-300 px-3 py-2 focus:border-black focus:outline-none"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-black py-3 text-sm font-semibold uppercase text-white">
        Lưu địa chỉ
      </button>
    </form>
  );
}
