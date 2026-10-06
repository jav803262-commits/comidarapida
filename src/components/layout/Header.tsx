"use client";

import { business } from "@/data/business";
import { useCart } from "@/context/CartContext";

export function Header({ onCart }: { onCart: () => void }) {
  const { totalItems, subtotal } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left"
        >
          <div className="text-lg font-black tracking-tight">
            {business.name}
          </div>
          <div className="text-xs text-zinc-500">Menú digital</div>
        </button>

        <button
          onClick={onCart}
          className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold text-white"
          aria-label={`Ver carrito. ${totalItems} productos`}
        >
          🛒 {totalItems}
          <span className="hidden sm:inline">
            ${subtotal.toFixed(0)}
          </span>
        </button>
      </div>
    </header>
  );
}