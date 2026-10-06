export const business = {
  name: "Brothers Burger",
  description: "Hamburguesas, papas y bebidas preparadas al momento.",
  orderingEnabled: true,
  whatsapp: "529711459413",
  currency: "MXN",
  location: "Tehuantepec, Oaxaca",
  delivery: {
    enabled: true,
    fee: 30,
  },
  pickup: {
    enabled: true,
  },
  paymentMethods: {
    cash: true,
    transfer: true,
  },
  transfer: {
    bank: "BBVA",
    holder: "Brothers Burger",
    account: "0000 0000 0000",
  },
  schedule: {
    monday: { open: "12:00", close: "22:00" },
    tuesday: { open: "12:00", close: "22:00" },
    wednesday: { open: "12:00", close: "22:00" },
    thursday: { open: "12:00", close: "22:00" },
    friday: { open: "12:00", close: "23:00" },
    saturday: { open: "12:00", close: "23:00" },
    sunday: { open: "12:00", close: "21:00" },
  },
};