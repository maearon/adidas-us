import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-center text-2xl font-bold uppercase">Quên mật khẩu</h1>
      <p className="mb-8 text-center text-sm text-neutral-600">
        Nhập email để nhận link đặt lại mật khẩu (demo — hiển thị token trên màn hình).
      </p>
      <AuthForm
        action="/api/auth/forgot"
        fields={[{ name: "email", label: "Email", type: "email" }]}
        submitLabel="Gửi link reset"
      />
      <p className="mt-6 text-center text-sm">
        <Link href="/vn/login" className="underline">Quay lại đăng nhập</Link>
      </p>
    </div>
  );
}
