/**
 * URL do dashboard.
 * No Vercel (deploy único): usa /dashboard (mesmo domínio).
 * Em dev com 3 apps: configure VITE_DASHBOARD_URL no .env (ex: http://localhost:3001).
 */
export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || "/dashboard";

/**
 * URL do checkout (planos).
 * No Vercel (deploy único): usa /checkout (mesmo domínio).
 * Em dev com 3 apps: configure VITE_CHECKOUT_URL no .env (ex: http://localhost:3002).
 */
export const CHECKOUT_URL =
  import.meta.env.VITE_CHECKOUT_URL || "/checkout";
