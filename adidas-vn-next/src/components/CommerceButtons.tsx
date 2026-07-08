"use client";

import { useRouter } from "next/navigation";

export function AddToCartButton({ productId }: { productId: number }) {
  const router = useRouter();

  async function add() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    router.push("/vn/cart");
    router.refresh();
  }

  return (
    <button
      onClick={add}
      className="flex-1 bg-black py-3 text-sm font-semibold uppercase text-white hover:bg-neutral-800"
    >
      Thêm vào giỏ
    </button>
  );
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
    <button
      onClick={toggle}
      className="border border-black px-6 py-3 text-sm font-semibold uppercase hover:bg-neutral-100"
    >
      {inWishlist ? "♥ Đã thích" : "♡ Yêu thích"}
    </button>
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
    <button onClick={remove} className="text-sm text-red-600 hover:underline">
      Xóa
    </button>
  );
}

export function CommentForm({ productId }: { productId: number }) {
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        author: formData.get("author"),
        body: formData.get("body"),
      }),
    });
    form.reset();
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3 border-t pt-4">
      <h3 className="font-semibold">Viết bình luận</h3>
      <input name="author" placeholder="Tên của bạn" required className="w-full border px-3 py-2 text-sm" />
      <textarea name="body" placeholder="Nội dung..." required rows={3} className="w-full border px-3 py-2 text-sm" />
      <button type="submit" className="bg-black px-4 py-2 text-sm text-white">Gửi</button>
    </form>
  );
}
