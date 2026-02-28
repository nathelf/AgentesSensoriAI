import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, ArrowLeft, MessageCircle, Building2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const plans = {
  starter: {
    name: "Starter",
    price: "197",
    icon: Zap,
    features: ["1 número de WhatsApp", "500 conversas/mês", "Respostas automáticas 24/7"],
  },
  pro: {
    name: "Pro",
    price: "497",
    icon: Crown,
    features: ["3 números de WhatsApp", "Conversas ilimitadas", "Negociação inteligente com IA"],
  },
  enterprise: {
    name: "Enterprise",
    price: "Sob consulta",
    icon: Building2,
    features: ["Números ilimitados", "API personalizada", "Gerente de conta dedicado"],
  },
};

type PlanKey = keyof typeof plans;

const checkoutSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  whatsapp: z.string().min(14, "WhatsApp incompleto"),
  empresa: z.string().trim().min(2, "Nome da empresa deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  documento: z.string().min(14, "CPF/CNPJ incompleto"),
});

const formatWhatsApp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }
  const cnpj = digits.slice(0, 14);
  if (cnpj.length <= 2) return cnpj;
  if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
  if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
  if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
};

type FieldErrors = Partial<Record<keyof z.infer<typeof checkoutSchema>, string>>;

export default function CheckoutForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const planId = (searchParams.get("plan") || "starter") as PlanKey;
  const selectedPlan = plans[planId] || plans.starter;
  const PlanIcon = selectedPlan.icon;

  const [whatsapp, setWhatsapp] = useState("");
  const [documento, setDocumento] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      empresa: formData.get("empresa") as string,
      documento: formData.get("documento") as string,
    };

    const result = checkoutSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    if (!supabase) {
      setLoading(false);
      toast({
        title: "Configuração pendente",
        description: "Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env ou no Vercel.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("leads").insert({
      nome: result.data.nome,
      email: result.data.email,
      whatsapp: result.data.whatsapp,
      empresa: result.data.empresa,
      documento: result.data.documento,
      plano: selectedPlan.name,
    });

    if (error) {
      setLoading(false);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Olá! Tenho interesse no Plano ${selectedPlan.name} da SensoriAI. Acabei de preencher o formulário de contato.`;
    window.open(`https://wa.me/5545998294881?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16">
        <button
          onClick={() => navigate("/planos")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar aos planos
        </button>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-3">
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  Finalize sua <span className="text-primary glow-text">contratação</span>
                </h1>
                <p className="text-muted-foreground mb-8">
                  Preencha os dados abaixo para ativar seu agente de IA.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Seu nome completo"
                      className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 ${errors.nome ? "border-destructive" : ""}`}
                    />
                    {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail Corporativo</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="voce@empresa.com"
                        className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        placeholder="(00) 00000-0000"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                        className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 ${errors.whatsapp ? "border-destructive" : ""}`}
                      />
                      {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Nome da Empresa</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        placeholder="Nome da sua empresa"
                        className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 ${errors.empresa ? "border-destructive" : ""}`}
                      />
                      {errors.empresa && <p className="text-sm text-destructive">{errors.empresa}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documento">CPF ou CNPJ</Label>
                      <Input
                        id="documento"
                        name="documento"
                        placeholder="000.000.000-00"
                        value={documento}
                        onChange={(e) => setDocumento(formatCpfCnpj(e.target.value))}
                        className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 ${errors.documento ? "border-destructive" : ""}`}
                      />
                      {errors.documento && <p className="text-sm text-destructive">{errors.documento}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 btn-glow mt-4"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      <>
                        Garantir meu Plano e Falar com Consultor
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Dados protegidos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-primary" />
                      Ativação imediata
                    </span>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-2">
                <div className="glass-card rounded-2xl p-6 md:p-8 glow-border sticky top-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <PlanIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plano Selecionado</p>
                      <p className="font-display text-xl font-bold">{selectedPlan.name}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    {selectedPlan.price === "Sob consulta" ? (
                      <p className="font-display text-3xl font-bold">Sob consulta</p>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-muted-foreground">R$</span>
                        <span className="font-display text-4xl font-bold text-primary glow-text">
                          {selectedPlan.price}
                        </span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-border mb-6" />

                  <ul className="space-y-4">
                    {selectedPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-secondary-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="h-px bg-border my-6" />

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ao clicar no botão, você será direcionado ao nosso consultor especializado que finalizará a configuração do seu Agente de IA.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 glow-border-strong">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-3xl md:text-4xl font-bold mb-4"
              >
                Dados recebidos com <span className="text-primary glow-text">sucesso!</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground text-lg mb-10 max-w-md"
              >
                Agora fale com nosso consultor para ativar seu Agente de IA do plano{" "}
                <span className="text-primary font-semibold">{selectedPlan.name}</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleWhatsAppRedirect}
                  className="h-16 px-10 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 btn-glow rounded-2xl"
                >
                  <MessageCircle className="mr-3 w-6 h-6" />
                  Falar com Consultor no WhatsApp AGORA
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
