/**
 * Retorna a URL absoluta (ex: https://seusite.vercel.app/dashboard).
 * Em produção: usa a origem atual do site, assim o link abre numa página nova correta.
 * Em dev: use VITE_DASHBOARD_URL no .env (ex: http://localhost:3001) se rodar os 3 apps separados.
 */
function appUrl(path: string, envUrl: string | undefined): string {
  if (envUrl) return envUrl;
  if (typeof window !== "undefined") return window.location.origin + path;
  return path;
}

export const getDashboardUrl = (): string =>
  appUrl("/dashboard", import.meta.env.VITE_DASHBOARD_URL);

export const getCheckoutUrl = (): string =>
  appUrl("/checkout", import.meta.env.VITE_CHECKOUT_URL);
