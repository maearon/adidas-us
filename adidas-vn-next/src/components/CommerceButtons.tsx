"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const inputClass = "w-full border border-neutral-300 px-4 py-3 text-sm focus:border-black focus:outline-none";

export function AddToCartButton({ productId }: { productId: number }) {
  const router = useRouter();

  async function add() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (res.status === 401) {
      router.push("/vn/login?redirect=/vn/cart");
      return;
    }
    router.push("/vn/cart");
    router.refresh();
  }

  return <Button onClick={add} className="flex-1">Thêm vào giỏ</Button>;
}

export function WishlistButton({ productId, inWishlist }: { productId: number; inWishlist: boolean }) {
  const router = useRouter();

  async function toggle() {
    await fetch("/api/wishlist", {
      method: inWishlist ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    router.refresh();
  }

  return (
    <Button variant="secondary" onClick={toggle}>
      {inWishlist ? "♥ Đã thích" : "♡ Yêu thích"}
    </Button>
  );
}

export function RemoveCartButton({ itemId }: { itemId: number }) {
  const router = useRouter();

  async function remove() {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    router.refresh();
  }

  return (
    <button type="button" onClick={remove} className="mt-2 text-sm text-red-600 hover:underline">
      Xóa
    </button>
  );
}

export function CommentForm({ productId }: { productId: number }) {
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        author: formData.get("author"),
        body: formData.get("body"),
      }),
    });
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4 border-t border-neutral-200 pt-6">
      <h3 className="font-semibold">Viết bình luận</h3>
      <input name="author" placeholder="Tên của bạn" required className={inputClass} />
      <textarea name="body" placeholder="Nội dung..." required rows={4} className={inputClass} />
      <Button type="submit" size="sm">Gửi bình luận</Button>
    </form>
  );
}

export { inputClass };
