# Configuração do Supabase — Passo a passo

Este guia explica como criar o projeto no Supabase e configurar as tabelas para o SensoriAI (checkout, leads e sincronização em tempo real).

---

## 1. Criar o projeto no Supabase

1. Acesse **[supabase.com](https://supabase.com)** e faça login (ou crie uma conta).
2. Clique em **"New Project"**.
3. Preencha:
   - **Name:** `SensoriAI` (ou o nome que preferir).
   - **Database Password:** crie uma senha forte e **guarde** (você vai usar no futuro para acessar o banco).
   - **Region:** escolha a mais próxima (ex.: `South America (São Paulo)`).
4. Clique em **"Create new project"** e aguarde alguns minutos.

---

## 2. Pegar a URL e a chave anônima (anon key)

1. No painel do projeto, no menu lateral, vá em **Project Settings** (ícone de engrenagem).
2. Clique em **API** na barra lateral.
3. Anote:
   - **Project URL** — algo como `https://xxxxxxxx.supabase.co`
   - **anon public** (em "Project API keys") — uma chave longa que começa com `eyJ...`

Esses dois valores são usados no frontend (checkout e, no futuro, dashboard).

---

## 3. Criar as tabelas no banco (SQL)

1. No painel do Supabase, no menu lateral, abra **SQL Editor**.
2. Clique em **"New query"**.
3. Copie todo o conteúdo do arquivo **`sensoriai-checkout-flow/supabase/schema_completo.sql`** e cole no editor.
4. Clique em **"Run"** (ou Ctrl+Enter).

Se aparecer "Success" ou a execução terminar sem erro, as tabelas **leads** e **orders** foram criadas e o Realtime da **orders** foi habilitado.

**Se der erro** na linha do `ALTER PUBLICATION` (Realtime), ignore; depois você ativa o Realtime manualmente no passo 4.

---

## 4. Habilitar Realtime nas tabelas (opcional, para tempo real)

Para que o dashboard receba atualizações em tempo real:

1. No menu lateral do Supabase, vá em **Database** → **Replication**.
2. Encontre a tabela **`orders`** (e, se quiser, **`leads`**) na lista.
3. Ative o **toggle** de Realtime para cada tabela que desejar.

Assim, inserts/updates nessas tabelas serão enviados em tempo real para os clientes inscritos (ex.: dashboard).

---

## 5. Configurar as variáveis de ambiente no seu projeto

### Checkout (sensoriai-checkout-flow)

1. Abra o arquivo **`sensoriai-checkout-flow/.env`** (crie se não existir).
2. Preencha com os valores do seu projeto:

```env
VITE_SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...sua_anon_key...
VITE_SUPABASE_PROJECT_ID=SEU_PROJECT_REF
```

Substitua:
- `SEU_PROJECT_REF` pelo **Reference ID** do projeto (em Project Settings → General, ou na própria URL: `https://SEU_PROJECT_REF.supabase.co`).
- `eyJ...` pela chave **anon public** que você copiou no passo 2.

3. Salve o arquivo e **reinicie o servidor de desenvolvimento** do checkout (`npm run dev`).

### Dashboard (quando for conectar ao Supabase)

No futuro, no dashboard, use as mesmas variáveis (por exemplo `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`) apontando para o mesmo projeto.

---

## 6. Testar o checkout

1. Suba o checkout: `cd sensoriai-checkout-flow && npm run dev`.
2. Acesse a página de checkout, escolha um plano e preencha o formulário.
3. Após enviar, no Supabase vá em **Table Editor** → tabela **`leads`**.
4. Verifique se o novo registro apareceu.

Se aparecer, a conexão e a tabela estão corretas.

---

## Resumo das tabelas (banco geral)

| Tabela           | Página / uso                                           | Realtime |
|------------------|--------------------------------------------------------|----------|
| **leads**        | Checkout — formulário de contratação (nome, email, plano, etc.) | Não      |
| **orders**       | Dashboard — pedidos / vendas                           | Sim      |
| **activity_feed**| Dashboard — feed de atividades (IA, descontos, pedidos) | Sim      |
| **demo_requests**| Landing — “Quero demonstração”, “Falar com Consultor”   | Não      |
| **contact_log**  | Landing — cliques em contato (origem + metadata)        | Não      |

---

## Onde cada dado é usado

- **Checkout (sensoriai-checkout-flow):** envia para `leads` ao finalizar o formulário de contratação.
- **Dashboard:** lê/escreve `orders` e `activity_feed`; quando integrar ao Supabase, use Realtime nessas tabelas.
- **Landing:** quando tiver formulário de “Demonstração” ou “Contato”, enviar para `demo_requests`; cliques em botões de contato podem ser registrados em `contact_log`.

---

## Problemas comuns

- **"relation public.leads does not exist"**  
  A migration que cria a tabela `leads` ainda não foi executada. Rode o SQL do passo 3 no SQL Editor.

- **Erro de CORS ou rede**  
  Confira se `VITE_SUPABASE_URL` está correto (com `https://` e sem barra no final).

- **"new row violates row-level security"**  
  As políticas (RLS) podem estar bloqueando. Use as políticas indicadas nas migrations (insert permitido para leads; para orders, conforme a migration).

- **Realtime não atualiza**  
  Confirme em Database → Replication que o Realtime está ativado para a tabela desejada.

---

Depois de seguir esses passos, seu sistema estará conectado ao Supabase com as tabelas criadas e prontas para sincronização em tempo real quando o dashboard for integrado.
