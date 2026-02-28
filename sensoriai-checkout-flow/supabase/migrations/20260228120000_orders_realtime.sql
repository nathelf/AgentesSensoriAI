-- Tabela de pedidos (dashboard) — sincronização em tempo real
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

-- Índice para listar por data
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

-- Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Política: permitir insert para todos (app dashboard/checkout)
CREATE POLICY "Allow insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Política: permitir select para todos (dashboard lê os pedidos)
CREATE POLICY "Allow select orders" ON public.orders
  FOR SELECT USING (true);

-- Habilitar Realtime na tabela orders (para o dashboard atualizar em tempo real)
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
