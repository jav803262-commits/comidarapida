"use client";

import { useState } from "react";
import { business } from "@/data/business";
import { useCart } from "@/context/CartContext";
import {
  calculateDeliveryFee,
  calculateTotal,
  generateOrderId,
} from "@/lib/order";
import type { Order, OrderCustomer } from "@/types";

interface Props {
  onBack: () => void;
  onComplete: (order: Order) => void;
}

export function OrderForm({ onBack, onComplete }: Props) {
  const { items, subtotal } = useCart();

  const [name, setName] = useState("");
  const [orderType, setOrderType] =
    useState<OrderCustomer["orderType"]>("pickup");
  const [paymentMethod, setPaymentMethod] =
    useState<OrderCustomer["paymentMethod"]>("cash");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const deliveryFee = calculateDeliveryFee(
    orderType,
    business.delivery.fee,
  );
  const total = calculateTotal(subtotal, deliveryFee);
  const cash = Number(cashAmount);
  const change = cash >= total ? cash - total : 0;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!business.orderingEnabled) {
      setError("Los pedidos están pausados en este momento.");
      return;
    }

    if (!items.length) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (!name.trim()) {
      setError("Escribe tu nombre.");
      return;
    }

    if (
      orderType === "delivery" &&
      (!street.trim() || !neighborhood.trim())
    ) {
      setError("Para domicilio necesitamos calle y colonia.");
      return;
    }

    if (
      paymentMethod === "cash" &&
      (!cash || cash < total)
    ) {
      setError(
        "Indica una cantidad de efectivo igual o mayor al total.",
      );
      return;
    }

    const customer: OrderCustomer = {
      name: name.trim(),
      orderType,
      paymentMethod,
      address:
        orderType === "delivery"
          ? {
              street: street.trim(),
              neighborhood: neighborhood.trim(),
              reference: reference.trim() || undefined,
            }
          : undefined,
      cashAmount:
        paymentMethod === "cash" ? cash : undefined,
      notes: notes.trim() || undefined,
    };

    onComplete({
      id: generateOrderId(),
      items,
      customer,
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 pb-12">
      <button
        onClick={onBack}
        className="mb-6 text-sm font-bold text-zinc-500"
      >
        ← Volver al carrito
      </button>

      <h1 className="text-3xl font-black">
        Confirma tu pedido
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        Solo necesitamos algunos datos para enviarlo por WhatsApp.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <Field label="¿Cómo te llamas?">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            className="field"
          />
        </Field>

        <Field label="¿Cómo recibirás tu pedido?">
          <div className="grid grid-cols-2 gap-3">
            {business.pickup.enabled && (
              <Choice
                active={orderType === "pickup"}
                onClick={() => setOrderType("pickup")}
                title="Recoger"
                icon="🛍️"
              />
            )}

            {business.delivery.enabled && (
              <Choice
                active={orderType === "delivery"}
                onClick={() => setOrderType("delivery")}
                title="Domicilio"
                icon="🛵"
              />
            )}
          </div>
        </Field>

        {orderType === "delivery" && (
          <div className="space-y-4 rounded-3xl bg-white p-5 ring-1 ring-zinc-200">
            <Field label="Calle y número">
              <input
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                placeholder="Ej. Calle Principal #123"
                className="field"
              />
            </Field>

            <Field label="Colonia">
              <input
                value={neighborhood}
                onChange={(event) =>
                  setNeighborhood(event.target.value)
                }
                placeholder="Tu colonia"
                className="field"
              />
            </Field>

            <Field label="Referencia (opcional)">
              <input
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                placeholder="Cerca de..."
                className="field"
              />
            </Field>
          </div>
        )}

        <Field label="Forma de pago">
          <div className="grid grid-cols-2 gap-3">
            {business.paymentMethods.cash && (
              <Choice
                active={paymentMethod === "cash"}
                onClick={() => setPaymentMethod("cash")}
                title="Efectivo"
                icon="💵"
              />
            )}

            {business.paymentMethods.transfer && (
              <Choice
                active={paymentMethod === "transfer"}
                onClick={() => setPaymentMethod("transfer")}
                title="Transferencia"
                icon="💳"
              />
            )}
          </div>
        </Field>

        {paymentMethod === "cash" && (
          <Field label="¿Con cuánto pagarás?">
            <input
              type="number"
              min={total}
              step="1"
              value={cashAmount}
              onChange={(event) => setCashAmount(event.target.value)}
              placeholder={`Mínimo $${total}`}
              className="field"
            />

            {cash >= total && (
              <p className="mt-2 text-sm font-bold text-green-700">
                Cambio: ${change.toFixed(0)}
              </p>
            )}
          </Field>
        )}

        {paymentMethod === "transfer" && (
          <div className="rounded-3xl bg-blue-50 p-5 text-sm text-blue-950">
            <strong>Datos de transferencia</strong>

            <div className="mt-2 space-y-1">
              <div>Banco: {business.transfer.bank}</div>
              <div>Beneficiario: {business.transfer.holder}</div>
              <div>Cuenta: {business.transfer.account}</div>
            </div>

            <p className="mt-3 text-xs text-blue-800">
              El negocio verificará el pago directamente.
            </p>
          </div>
        )}

        <Field label="¿Alguna indicación?">
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Ej. Sin cebolla, por favor."
            className="field resize-none"
          />
        </Field>

        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-3xl bg-zinc-950 p-5 text-white">
          <div className="flex justify-between text-zinc-300">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(0)}</span>
          </div>

          {deliveryFee > 0 && (
            <div className="mt-2 flex justify-between text-zinc-300">
              <span>Envío</span>
              <span>${deliveryFee.toFixed(0)}</span>
            </div>
          )}

          <div className="mt-3 flex justify-between text-2xl font-black">
            <span>Total</span>
            <span>${total.toFixed(0)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-red-600 px-5 py-4 text-base font-black text-white"
        >
          Revisar pedido
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black">
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({
  active,
  onClick,
  title,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl p-4 text-left ring-1 transition ${
        active
          ? "bg-red-50 ring-red-500"
          : "bg-white ring-zinc-200"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 font-black">{title}</div>
    </button>
  );
}