/**
 * URL do dashboard - em dev usa localhost:3001; em prod configure VITE_DASHBOARD_URL no Vercel
 */
export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || "http://localhost:3001";

/**
 * URL do checkout (sensoriai-checkout-flow) - em dev usa localhost:3002; em prod configure VITE_CHECKOUT_URL
 */
export const CHECKOUT_URL =
  import.meta.env.VITE_CHECKOUT_URL || "http://localhost:3002";
