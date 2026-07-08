import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getSession } from "@/lib/session";

export default async function RegisterPage() {
  const session = await getSession();
  if (session) redirect("/vn/login/profile");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-center text-2xl font-bold uppercase">Đăng ký</h1>
      <AuthForm
        action="/api/auth/register"
        fields={[
          { name: "name", label: "Tên" },
          { name: "lastname", label: "Họ" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Mật khẩu", type: "password" },
        ]}
        submitLabel="Tạo tài khoản"
      />
      <p className="mt-6 text-center text-sm">
        <Link href="/vn/login" className="underline">Đã có tài khoản? Đăng nhập</Link>
      </p>
    </div>
  );
}
