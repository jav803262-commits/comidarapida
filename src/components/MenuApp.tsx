"use client";

import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/menu/Menu";
import { Cart } from "@/components/cart/Cart";
import { OrderForm } from "@/components/order/OrderForm";
import { OrderTicket } from "@/components/order/OrderTicket";
import type { Order } from "@/types";

export type AppStep = "menu" | "cart" | "form" | "ticket";

export function MenuApp() {
  const [step, setStep] = useState<AppStep>("menu");
  const [order, setOrder] = useState<Order | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-50 text-zinc-900">
        <Header onCart={() => setStep("cart")} />

        {step === "menu" && (
          <Menu onOpenCart={() => setStep("cart")} />
        )}

        {step === "cart" && (
          <Cart
            onBack={() => setStep("menu")}
            onContinue={() => setStep("form")}
          />
        )}

        {step === "form" && (
          <OrderForm
            onBack={() => setStep("cart")}
            onComplete={(createdOrder) => {
              setOrder(createdOrder);
              setStep("ticket");
            }}
          />
        )}

        {step === "ticket" && order && (
          <OrderTicket
            order={order}
            onBack={() => setStep("form")}
            onFinish={() => {
              window.location.reload();
            }}
          />
        )}
      </div>
    </CartProvider>
  );
}