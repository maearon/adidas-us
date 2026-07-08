"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/vn/login");
    router.refresh();
  }

  return (
    <button onClick={logout} type="button" className="text-red-600 underline">
      Đăng xuất
    </button>
  );
}
