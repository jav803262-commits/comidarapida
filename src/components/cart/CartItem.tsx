"use client";

import type { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

export function CartItem({ item }: { item: CartItemType }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="rounded-3xl bg-white p-4 ring-1 ring-zinc-200">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
          {item.product.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-3">
            <h2 className="font-black">{item.product.name}</h2>
            <strong>${lineTotal.toFixed(0)}</strong>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item.product.id)}
                className="h-9 w-9 rounded-full bg-zinc-100 font-black"
              >
                −
              </button>

              <span className="w-5 text-center font-black">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.product.id)}
                className="h-9 w-9 rounded-full bg-zinc-900 font-black text-white"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.product.id)}
              className="text-xs font-bold text-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}