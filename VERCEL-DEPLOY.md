# Deploy no Vercel — Checklist

Cada app (landing, dashboard, checkout) é um **projeto separado** no Vercel. Siga para cada um.

---

## 1. Landing Page

| Configuração | Valor |
|--------------|--------|
| **Root Directory** | `landing-page` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Variáveis de ambiente (Settings → Environment Variables)

| Nome | Valor | Observação |
|------|--------|------------|
| `VITE_DASHBOARD_URL` | `https://seu-dashboard.vercel.app` | URL do projeto **Dashboard** no Vercel (após deploy) |
| `VITE_CHECKOUT_URL` | `https://seu-checkout.vercel.app` | URL do projeto **Checkout** no Vercel (após deploy) |

- **Importante:** faça o deploy do Dashboard e do Checkout primeiro; depois atualize essas URLs na Landing e faça redeploy.

---

## 2. Dashboard

| Configuração | Valor |
|--------------|--------|
| **Root Directory** | `dashboard` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

Variáveis de ambiente: nenhuma obrigatória por enquanto (quando conectar Supabase, adicione as mesmas do Checkout).

---

## 3. Checkout (sensoriai-checkout-flow)

| Configuração | Valor |
|--------------|--------|
| **Root Directory** | `sensoriai-checkout-flow` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Variáveis de ambiente (Settings → Environment Variables)

| Nome | Valor | Observação |
|------|--------|------------|
| `VITE_SUPABASE_URL` | `https://sxihmlhadnevpgdflrxz.supabase.co` | URL do seu projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(sua anon key)* | Chave **anon public** em Supabase → Project Settings → API |

- **Não** commite o `.env`; use só as variáveis no painel da Vercel.

---

## Ordem sugerida de deploy

1. **Checkout** — deploy primeiro e anote a URL (ex: `https://sensoriai-checkout.vercel.app`).
2. **Dashboard** — deploy e anote a URL (ex: `https://sensoriai-dashboard.vercel.app`).
3. **Landing** — deploy e configure `VITE_DASHBOARD_URL` e `VITE_CHECKOUT_URL` com as URLs dos passos 1 e 2; depois **Redeploy** da Landing para aplicar.

---

## Repositório no Vercel

- Se o repositório tiver **landing-page**, **dashboard** e **sensoriai-checkout-flow** na raiz:
  - Crie **3 projetos** no Vercel.
  - Em cada projeto, em **Settings → General**, defina **Root Directory** para a pasta correta (`landing-page`, `dashboard` ou `sensoriai-checkout-flow`).

---

## Conferência rápida

- [ ] Landing: `vercel.json` presente, build = `npm run build`, output = `dist`
- [ ] Dashboard: `vercel.json` presente, build = `npm run build`, output = `dist`
- [ ] Checkout: `vercel.json` presente, build = `npm run build`, output = `dist`
- [ ] `.env` no `.gitignore` (não sobe para o Git)
- [ ] Variáveis do Checkout (Supabase) configuradas no Vercel
- [ ] Variáveis da Landing (URLs do Dashboard e Checkout) configuradas após os deploys

Com isso, está tudo certo para subir no Vercel.
