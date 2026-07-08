import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

type Props = { searchParams: Promise<{ token?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-center text-2xl font-bold uppercase">Đặt lại mật khẩu</h1>
      {!token ? (
        <p className="text-center text-neutral-500">
          Token không hợp lệ. <Link href="/vn/login/forgot" className="underline">Yêu cầu link mới</Link>
        </p>
      ) : (
        <AuthForm
          action="/api/auth/reset"
          fields={[
            { name: "token", label: "Token", type: "hidden", defaultValue: token },
            { name: "password", label: "Mật khẩu mới", type: "password" },
          ]}
          submitLabel="Đặt lại mật khẩu"
        />
      )}
    </div>
  );
}
