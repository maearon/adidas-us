import fs from "fs";
import path from "path";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { sanitizeLegacyMenuHtml } from "@/lib/legacy-menu";

function readLegacyFragment(file: string) {
  const fullPath = path.join(process.cwd(), "public", "vn", "include", file);
  return fs.readFileSync(fullPath, "utf8");
}

export async function LegacyMenu() {
  const session = await getSession();
  let wishlistCount = 0;
  if (session?.email) {
    wishlistCount = await prisma.wishlistItem.count({ where: { userEmail: session.email } });
  }

  const cartHref = session ? "/vn/cart" : "/vn/login";
  const wishHref = session ? "/vn/wishlist" : "/vn/login";

  const menuHtml = sanitizeLegacyMenuHtml(readLegacyFragment("menu-legacy.html"), {
    cartHref,
    wishHref,
    wishlistCount,
    loggedIn: Boolean(session),
  });

  return (
    <div id="topdiv">
      <div dangerouslySetInnerHTML={{ __html: readLegacyFragment("slidenav.html") }} />
      {!session ? (
        <div className="glass-header-top glass-header-top--single">
          <Link href="#">Giúp</Link>
          <div className="menu-spacer___3Gp4L" />
          <Link href="#">theo dõi đơn hàng và trả về</Link>
          <div className="menu-spacer___3Gp4L" />
          <em><Link href="/vn/register">Đăng ký mới</Link></em>
          <Link href="/vn/login">Đăng nhập <span className="login-icon" /></Link>
        </div>
      ) : (
        <div className="glass-header-top glass-header-top--single">
          <Link href="/vn/login/profile">tài khoản của tôi</Link>
          <div className="menu-spacer___3Gp4L" />
          <Link href="/vn/wishlist">danh sách yêu thích</Link>
          <div className="menu-spacer___3Gp4L" />
          <Link href="#">trạng thái đơn hàng</Link>
          <em>
            <Link className="selfservice-link-login" href="/vn/login/profile" title={`Tài Khoản Của Tôi ${session.name}`}>
              Chào mừng trở lại {session.name}
              <span className="login-icon" />
            </Link>
          </em>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: menuHtml }} />
    </div>
  );
}
