-- ============================================================
-- SensoriAI — BANCO GERAL (todas as páginas)
-- Rode este arquivo no SQL Editor do Supabase (uma vez).
-- ============================================================

-- --------------------------------------------------------------
-- 1) LEADS — Checkout (formulário de contratação de planos)
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  empresa TEXT NOT NULL,
  documento TEXT NOT NULL,
  plano TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------------
-- 2) ORDERS — Dashboard (pedidos / vendas)
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_avatar TEXT NOT NULL DEFAULT '',
  products TEXT NOT NULL,
  total_value NUMERIC(12, 2) NOT NULL,
  discount_applied NUMERIC(12, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Aprovado IA', 'Manual', 'Pendente')),
  payment TEXT NOT NULL CHECK (payment IN ('Pix', 'Boleto', 'Cartão')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert orders" ON public.orders;
CREATE POLICY "Allow insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select orders" ON public.orders;
CREATE POLICY "Allow select orders" ON public.orders
  FOR SELECT USING (true);

-- --------------------------------------------------------------
-- 3) ACTIVITY_FEED — Dashboard (feed de atividades em tempo real)
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_feed (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('info', 'discount', 'order', 'ai', 'warning', 'cross-sell')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_feed_created_at ON public.activity_feed (created_at DESC);

ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert activity_feed" ON public.activity_feed;
CREATE POLICY "Allow insert activity_feed" ON public.activity_feed
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select activity_feed" ON public.activity_feed;
CREATE POLICY "Allow select activity_feed" ON public.activity_feed
  FOR SELECT USING (true);

-- --------------------------------------------------------------
-- 4) DEMO_REQUESTS — Landing (pedidos de demonstração / contato)
-- Usado por: "Quero minha Demonstração Gratuita", "Falar com Consultor", "Começar Agora"
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT,
  email TEXT NOT NULL,
  telefone TEXT,
  origem TEXT NOT NULL DEFAULT 'landing',
  mensagem TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

COMMENT ON COLUMN public.demo_requests.origem IS 'Ex: cta_footer, hero_consultor, pricing, demo_gratis';

CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON public.demo_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON public.demo_requests (email);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert demo_requests" ON public.demo_requests;
CREATE POLICY "Anyone can insert demo_requests" ON public.demo_requests
  FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------------
-- 5) CONTACT_LOG — Landing (opcional: cliques em WhatsApp/contato sem formulário)
-- Registra quando alguém clica em "Falar com Consultor" etc. (pode enviar só evento)
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  origem TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_log_created_at ON public.contact_log (created_at DESC);

ALTER TABLE public.contact_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert contact_log" ON public.contact_log;
CREATE POLICY "Anyone can insert contact_log" ON public.contact_log
  FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------------
-- Realtime (dashboard atualiza em tempo real)
-- Se der erro nas linhas abaixo, ative em: Database → Replication
-- --------------------------------------------------------------
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_feed;
