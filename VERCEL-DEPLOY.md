# Deploy no Vercel — SensoriAI

Recomendado: **um único projeto** no Vercel que serve landing, dashboard e checkout no mesmo domínio.

---

## Deploy único (recomendado)

Um só projeto Vercel, apontando para a **raiz** do repositório. O build gera um `dist/` com os três apps:

- **/** → Landing Page  
- **/dashboard** → Dashboard  
- **/checkout** → Checkout  

### Configuração no Vercel

| Configuração | Valor |
|--------------|--------|
| **Root Directory** | *(deixe vazio — raiz do repo)* |
| **Framework Preset** | Other (ou Vite; o build é customizado) |
| **Build Command** | `node scripts/build-all.js` *(já definido em `vercel.json`)* |
| **Output Directory** | `dist` *(já definido em `vercel.json`)* |
| **Install Command** | *(já definido em `vercel.json`)* |

O `vercel.json` na raiz já define:

- **installCommand:** instala dependências na raiz, em `landing-page`, em `dashboard` e em `sensoriai-checkout-flow`.
- **buildCommand:** `node scripts/build-all.js` — faz o build dos três apps com bases corretas e junta tudo em `dist/`.
- **outputDirectory:** `dist`.
- **rewrites:** `/dashboard` e `/checkout` (e subrotas) servem o `index.html` de cada SPA; arquivos estáticos (ex.: `/dashboard/assets/`, `/checkout/assets/`) são servidos normalmente.

Não é necessário configurar Root Directory nem comandos manualmente se o `vercel.json` estiver commitado; o Vercel usa essas chaves.

### Variáveis de ambiente (Settings → Environment Variables)

Configure na **raiz do projeto** (o único projeto Vercel):

| Nome | Valor | Observação |
|------|--------|------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(anon key)* | Chave **anon public** em Supabase → Project Settings → API |

Opcional (para links na landing):

| Nome | Valor | Observação |
|------|--------|------------|
| `VITE_DASHBOARD_URL` | `https://seu-dominio.vercel.app/dashboard` | URL do dashboard (no deploy único, mesmo domínio) |
| `VITE_CHECKOUT_URL` | `https://seu-dominio.vercel.app/checkout` | URL do checkout (no deploy único, mesmo domínio) |

Se não definir `VITE_DASHBOARD_URL` e `VITE_CHECKOUT_URL`, use no código caminhos relativos (ex.: `/dashboard`, `/checkout`) para funcionar em qualquer domínio.

### Ordem de deploy

1. Conecte o repositório no Vercel (um projeto, raiz do repo).
2. Configure as variáveis do Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).
3. Deploy. O build roda `scripts/build-all.js`, que gera o `dist/` combinado.
4. Após o deploy, acesse: `https://seu-projeto.vercel.app/`, `.../dashboard`, `.../checkout`.

### Conferência rápida (deploy único)

- [ ] `vercel.json` na raiz com `installCommand`, `buildCommand`, `outputDirectory` e `rewrites`
- [ ] `scripts/build-all.js` existe e roda sem erro localmente (`npm run build` na raiz)
- [ ] Variáveis do Supabase configuradas no projeto Vercel (raiz)
- [ ] `.env` no `.gitignore` (não sobe para o Git)

---

## Alternativa: três projetos separados

Se preferir **três projetos** no Vercel (três URLs diferentes):

1. Crie 3 projetos; em cada um defina **Root Directory** para `landing-page`, `dashboard` ou `sensoriai-checkout-flow`.
2. **Landing:** Build Command `npm run build`, Output `dist`. Variáveis: `VITE_DASHBOARD_URL` e `VITE_CHECKOUT_URL` com as URLs dos outros dois projetos.
3. **Dashboard:** Build Command `npm run build`, Output `dist`.
4. **Checkout:** Build Command `npm run build`, Output `dist`. Variáveis: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

Ordem sugerida: deploy do Checkout e do Dashboard primeiro; depois Landing com as URLs corretas e redeploy.

---

Com o deploy único, um só domínio e um só deploy bastam para os três apps.
