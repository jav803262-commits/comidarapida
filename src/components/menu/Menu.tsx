"use client";

import { useMemo, useState } from "react";
import { business } from "@/data/business";
import { menu } from "@/data/menu";
import type { ProductCategory } from "@/types";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "./ProductCard";
import { CategoryFilter } from "./CategoryFilter";

const categories: Array<{
  id: ProductCategory | "all";
  label: string;
}> = [
  { id: "all", label: "Todo" },
  { id: "hamburguesas", label: "Hamburguesas" },
  { id: "combos", label: "Combos" },
  { id: "papas", label: "Papas" },
  { id: "bebidas", label: "Bebidas" },
];

export function Menu({ onOpenCart }: { onOpenCart: () => void }) {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const { totalItems } = useCart();

  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? menu
        : menu.filter((product) => product.category === category),
    [category],
  );

  const activeLabel =
    categories.find((item) => item.id === category)?.label ?? "Menú";

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-32">
        <section className="py-6 sm:py-10">
          <div className="rounded-3xl bg-zinc-950 p-6 text-white shadow-sm sm:p-10">
            <div
              className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                business.orderingEnabled
                  ? "bg-green-500/15 text-green-300"
                  : "bg-white/10 text-zinc-300"
              }`}
            >
              {business.orderingEnabled
                ? "🟢 Pedidos disponibles"
                : "🔴 Pedidos pausados"}
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
              {business.name}
            </h1>

            <p className="mt-3 max-w-xl text-zinc-300">
              {business.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
              <span>📍 {business.location}</span>
              <span>•</span>
              <span>🛒 {totalItems} productos en tu pedido</span>
            </div>
          </div>
        </section>

        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />

        <section className="py-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black">{activeLabel}</h2>

            {totalItems > 0 && (
              <button
                onClick={onOpenCart}
                className="text-sm font-black text-red-600"
              >
                Ver pedido →
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <MobileCartBar onOpen={onOpenCart} />
    </>
  );
}

function MobileCartBar({ onOpen }: { onOpen: () => void }) {
  const { totalItems, subtotal } = useCart();

  if (!totalItems) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={onOpen}
          className="flex w-full items-center justify-between rounded-2xl bg-red-600 px-5 py-3.5 text-white transition active:scale-[0.99]"
          aria-label="Ver pedido"
        >
          <span className="font-black">
            🛒 {totalItems} {totalItems === 1 ? "producto" : "productos"}
          </span>
          <span className="font-black">${subtotal.toFixed(0)}</span>
          <span className="hidden sm:inline text-sm font-bold">
            Ver pedido →
          </span>
        </button>
      </div>
    </div>
  );
}
