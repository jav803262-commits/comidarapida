# Menú Digital + WhatsApp — V1

MVP para pequeños negocios de comida rápida.

## Incluye

- Menú digital mobile-first.
- Categorías.
- Productos disponibles/no disponibles.
- Carrito.
- Cantidades.
- Persistencia del carrito con `localStorage`.
- Tipo de pedido: recoger o domicilio.
- Forma de pago: efectivo o transferencia.
- Cálculo de cambio para efectivo.
- Observaciones.
- Ticket digital.
- Folio local de pedido.
- Generación de mensaje para WhatsApp.
- Sin base de datos.
- Sin login.
- Sin Supabase.
- Sin API de WhatsApp.

## Requisitos

- Node.js 20.9+ recomendado.
- npm.

## Instalación

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Personalización

Los datos del negocio están en:

```text
src/data/business.ts
```

El menú está en:

```text
src/data/menu.ts
```

Las imágenes de demostración usan emojis/gradientes para que el proyecto funcione inmediatamente sin depender de imágenes externas.

## WhatsApp

Cambia el número en `src/data/business.ts`.

Debe incluir código de país, por ejemplo:

```ts
whatsapp: "52951XXXXXXXX"
```

No uses `+`, espacios ni guiones.

## Arquitectura

El pedido existe solamente en el navegador hasta que el cliente lo envía a WhatsApp.

```text
Menú
  ↓
Carrito
  ↓
Formulario
  ↓
Ticket
  ↓
WhatsApp
```

No se almacena información personal en un servidor.

## Próximas mejoras posibles

- Extras y personalización de productos.
- Combos configurables.
- Zona de reparto.
- Horarios.
- Panel administrativo.
- Supabase como segunda etapa.
# comidarapida
