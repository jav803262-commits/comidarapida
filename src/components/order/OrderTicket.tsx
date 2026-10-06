"use client";

import { business } from "@/data/business";
import { useCart } from "@/context/CartContext";
import type { Order } from "@/types";
import { createWhatsAppLink } from "@/lib/whatsapp";

interface Props {
  order: Order;
  onBack: () => void;
  onFinish: () => void;
}

export function OrderTicket({
  order,
  onBack,
  onFinish,
}: Props) {
  const { clearCart } = useCart();

  function sendToWhatsApp() {
    window.location.href = createWhatsAppLink(
      business.whatsapp,
      order,
    );
  }

  function finish() {
    clearCart();
    onFinish();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-8 pb-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200">
        <div className="border-b border-dashed border-zinc-300 p-6 text-center">
          <div className="text-3xl">🍔</div>
          <h1 className="mt-2 text-2xl font-black">
            {business.name}
          </h1>

          <p className="mt-1 text-xs text-zinc-500">
            Pedido #{order.id}
          </p>

          <p className="text-xs text-zinc-400">
            {new Date(order.createdAt).toLocaleString("es-MX")}
          </p>
        </div>

        <div className="space-y-4 p-6">
          {order.items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between gap-4 text-sm"
            >
              <span>
                {item.quantity} × {item.product.name}
              </span>

              <strong>
                ${(item.product.price * item.quantity).toFixed(0)}
              </strong>
            </div>
          ))}

          <div className="border-t border-dashed border-zinc-300 pt-4">
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(0)}</span>
            </div>

            {order.deliveryFee > 0 && (
              <div className="mt-1 flex justify-between text-sm text-zinc-500">
                <span>Envío</span>
                <span>${order.deliveryFee.toFixed(0)}</span>
              </div>
            )}

            <div className="mt-3 flex justify-between text-xl font-black">
              <span>TOTAL</span>
              <span>${order.total.toFixed(0)}</span>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 text-sm">
            <div>👤 {order.customer.name}</div>

            <div className="mt-1">
              {order.customer.orderType === "delivery"
                ? "🛵 Domicilio"
                : "🛍️ Para recoger"}
            </div>

            <div className="mt-1">
              {order.customer.paymentMethod === "cash"
                ? "💵 Efectivo"
                : "💳 Transferencia"}
            </div>

            {order.customer.cashAmount && (
              <div className="mt-1">
                💰 Paga con: ${order.customer.cashAmount.toFixed(0)}
              </div>
            )}

            {order.customer.address && (
              <div className="mt-3 border-t border-zinc-200 pt-3">
                <div>📍 {order.customer.address.street}</div>
                <div>
                  Colonia: {order.customer.address.neighborhood}
                </div>

                {order.customer.address.reference && (
                  <div>
                    Referencia: {order.customer.address.reference}
                  </div>
                )}
              </div>
            )}

            {order.customer.notes && (
              <div className="mt-3 border-t border-zinc-200 pt-3">
                📝 {order.customer.notes}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <button
          onClick={sendToWhatsApp}
          className="w-full rounded-2xl bg-green-600 px-5 py-4 font-black text-white"
        >
          📲 Enviar pedido por WhatsApp
        </button>

        <button
          onClick={onBack}
          className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-sm font-black"
        >
          Editar pedido
        </button>

        <button
          onClick={finish}
          className="w-full px-5 py-3 text-sm font-bold text-zinc-500"
        >
          Cancelar y empezar de nuevo
        </button>
      </div>

      <p className="mt-5 text-center text-xs leading-5 text-zinc-400">
        WhatsApp se abrirá con el pedido preparado. Debes pulsar
        &quot;Enviar&quot; dentro de WhatsApp.
      </p>
    </main>
  );
}