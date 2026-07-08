import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getSession } from "@/lib/session";

type Props = { searchParams: Promise<{ redirect?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const session = await getSession();
  if (session) redirect("/vn/login/profile");

  const { redirect: redirectTo } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-center text-2xl font-bold uppercase">Đăng nhập</h1>
      <AuthForm
        action="/api/auth/login"
        extra={{ redirect: redirectTo ?? "/vn/login/profile" }}
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Mật khẩu", type: "password" },
        ]}
        submitLabel="Đăng nhập"
      />
      <p className="mt-6 text-center text-sm">
        <Link href="/vn/register" className="underline">Chưa có tài khoản? Đăng ký</Link>
        <span className="mx-2">·</span>
        <Link href="/vn/login/forgot" className="underline">Quên mật khẩu?</Link>
      </p>
      <p className="mt-8 text-center text-xs text-neutral-500">Demo: demo@adidas.vn / demo123456</p>
    </div>
  );
}
