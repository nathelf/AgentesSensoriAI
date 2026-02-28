# Deploy no Vercel — SensoriAI

**Um único site** (landing + dashboard + checkout) na mesma porta, trocando apenas as páginas (SPA).

---

## Deploy único

Um só projeto Vercel, apontando para a **raiz** do repositório. O build gera um único `dist/` a partir da pasta `landing-page`:

- **/** → Landing Page  
- **/dashboard** → Dashboard  
- **/dashboard/chat** → Agente de Vendas (chat)  
- **/checkout** → Planos e formulário de contratação  

### Configuração no Vercel

| Configuração | Valor |
|--------------|--------|
| **Root Directory** | *(vazio — raiz do repo)* |
| **Build Command** | `cd landing-page && npm run build` *(em `vercel.json`)* |
| **Output Directory** | `landing-page/dist` *(em `vercel.json`)* |
| **Install Command** | `cd landing-page && npm install` *(em `vercel.json`)* |

O `vercel.json` na raiz já define esses comandos; não é preciso configurar manualmente no painel.

### Variáveis de ambiente

No projeto Vercel (raiz):

| Nome | Valor | Observação |
|------|--------|------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(anon key)* | Chave **anon public** em Supabase → Project Settings → API |

Não é necessário `VITE_DASHBOARD_URL` nem `VITE_CHECKOUT_URL`: tudo roda no mesmo domínio com rotas `/dashboard` e `/checkout`.

### Ordem de deploy

1. Conecte o repositório no Vercel (um projeto, raiz do repo).
2. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Deploy. O build roda na pasta `landing-page` e gera `landing-page/dist`.
4. Acesse: `https://seu-projeto.vercel.app/`, `.../dashboard`, `.../dashboard/chat`, `.../checkout`.

### Conferência rápida

- [ ] `vercel.json` na raiz com `installCommand`, `buildCommand`, `outputDirectory`
- [ ] `npm run build` na raiz (ou `cd landing-page && npm run build`) roda sem erro
- [ ] Variáveis do Supabase configuradas no Vercel
- [ ] `.env` no `.gitignore`

---

## Desenvolvimento local

Na raiz do repositório:

```bash
npm run dev
```

Isso sobe **um único servidor** (porta 3000) com todas as rotas. Para apenas a landing:

```bash
cd landing-page && npm run dev
```

---

Com isso, um único site, uma única porta e um único deploy no Vercel.
