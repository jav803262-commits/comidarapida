import type { Order } from "@/types";
import { formatCurrency } from "./order";

export function createWhatsAppMessage(order: Order) {
  const lines = order.items.map((item) => {
    const total = item.product.price * item.quantity;
    return `${item.quantity} × ${item.product.name} — ${formatCurrency(total)}`;
  });

  const customer = order.customer;
  const type =
    customer.orderType === "delivery" ? "🛵 Domicilio" : "🛍️ Para recoger";

  const payment =
    customer.paymentMethod === "cash" ? "💵 Efectivo" : "💳 Transferencia";

  const address =
    customer.orderType === "delivery" && customer.address
      ? [
          `📍 ${customer.address.street}`,
          `Colonia: ${customer.address.neighborhood}`,
          customer.address.reference
            ? `Referencia: ${customer.address.reference}`
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  const cashInfo =
    customer.paymentMethod === "cash" && customer.cashAmount
      ? `Paga con: ${formatCurrency(customer.cashAmount)}\nCambio: ${formatCurrency(
          customer.cashAmount - order.total,
        )}`
      : "";

  return [
    `🍔 *NUEVO PEDIDO #${order.id}*`,
    "",
    `👤 Cliente: ${customer.name}`,
    "",
    "🛒 *PEDIDO*",
    ...lines,
    "",
    `Subtotal: ${formatCurrency(order.subtotal)}`,
    ...(order.deliveryFee > 0
      ? [`Envío: ${formatCurrency(order.deliveryFee)}`]
      : []),
    `💰 *TOTAL: ${formatCurrency(order.total)}*`,
    "",
    type,
    payment,
    cashInfo,
    address,
    customer.notes ? `📝 Nota: ${customer.notes}` : "",
    "",
    "¿Me pueden confirmar mi pedido?",
  ]
    .filter(Boolean)
    .join("\n");
}

export function createWhatsAppLink(phone: string, order: Order) {
  const message = createWhatsAppMessage(order);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}