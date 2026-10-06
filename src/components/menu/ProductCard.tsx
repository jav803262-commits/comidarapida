"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const {
    addItem,
    increaseQuantity,
    decreaseQuantity,
    items,
  } = useCart();

  const [added, setAdded] = useState(false);

  const cartItem = items.find(
    (item) => item.product.id === product.id,
  );

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 900);
    return () => window.clearTimeout(timer);
  }, [added]);

  function add() {
    addItem(product);
    setAdded(true);
  }

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 text-6xl">
        {product.emoji}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-black">{product.name}</h3>
          <span className="whitespace-nowrap font-black">
            ${product.price}
          </span>
        </div>

        <p className="mt-2 min-h-10 text-sm leading-5 text-zinc-500">
          {product.description}
        </p>

        {!product.available ? (
          <div className="mt-4 rounded-2xl bg-zinc-100 px-4 py-3 text-center text-sm font-black text-zinc-400">
            Agotado
          </div>
        ) : cartItem ? (
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-zinc-100 p-2">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="h-10 w-10 rounded-xl bg-white font-black shadow-sm"
              aria-label={`Disminuir ${product.name}`}
            >
              −
            </button>

            <div className="text-center">
              <span className="block font-black">
                {cartItem.quantity}
              </span>
              {added && (
                <span className="block text-[10px] font-bold text-green-600">
                  Agregado
                </span>
              )}
            </div>

            <button
              onClick={() => {
                increaseQuantity(product.id);
                setAdded(true);
              }}
              className="h-10 w-10 rounded-xl bg-zinc-900 font-black text-white"
              aria-label={`Aumentar ${product.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={add}
            className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-black text-white transition ${
              added ? "bg-green-600" : "bg-zinc-900 hover:bg-red-600"
            }`}
          >
            {added ? "✓ Agregado" : "Agregar al pedido"}
          </button>
        )}
      </div>
    </article>
  );
}
