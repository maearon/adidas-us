import { redirect } from "next/navigation";

export default function LoginSuccessRedirect() {
  redirect("/vn/login/profile");
}
