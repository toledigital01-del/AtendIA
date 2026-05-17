import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle2, Zap, Shield, Crown, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    price: '197',
    description: 'Para quem está começando',
    features: ['Até 500 conversas/mês', '1 assistente IA', 'Qualificação de leads', 'Relatórios básicos'],
    icon: Zap,
    current: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '397',
    description: 'Ideal para clínicas e lojas',
    features: ['Até 5.000 conversas/mês', '2 assistentes IA', 'Agendamento Google Calendar', 'Relatórios avançados', 'Suporte prioritário'],
    icon: Crown,
    current: true
  },
  {
    id: 'agency',
    name: 'Agência',
    price: '797',
    description: 'Para grandes demandas',
    features: ['Conversas ilimitadas', 'Assistentes ilimitados', 'Integração Custom API', 'Gerente de conta dedicado', 'White-label'],
    icon: Shield,
    current: false
  }
];

export default function Billing() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloading(id);
    toast.info(`Gerando PDF da fatura ${id}...`, { duration: 2500 });
    
    setTimeout(() => {
      const content = `COMPROVANTE DE PAGAMENTO SYNTRO\n\nFatura: ${id}\nData: ${new Date().toLocaleDateString()}\nStatus: PAGO\nValor: R$ 397,00\n\nObrigado por utilizar AtendIA.`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syntro-invoice-${id}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);

      setDownloading(null);
      toast.success(`Fatura ${id} baixada!`, {
        description: "Seu comprovante foi gerado com sucesso.",
      });
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-10 pb-10"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-[#09090B]">
          <CreditCard className="w-5 h-5 text-[#6366F1]" />
          Plano e Assinatura
        </h2>
        
        <Card className="bg-[#07090F] text-white border-none shadow-none overflow-hidden relative rounded-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-3">
                <Badge className="bg-[#6366F1] text-white border-none px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider h-6">SEU PLANO: PRO</Badge>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">R$ 397</span>
                  <span className="text-[#A1A1AA] font-normal">/mês</span>
                </div>
                <p className="text-sm text-[#71717A] font-medium">Próxima renovação: 17 de Junho, 2026</p>
              </div>
              
              <div className="w-full md:w-64 space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase text-[#71717A] tracking-wider">
                  <span>Volume de conversas</span>
                  <span className="text-white">1.2k / 5k</span>
                </div>
                <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366F1]" style={{ width: '24%' }} />
                </div>
                <p className="text-[10px] text-[#A1A1AA] font-medium text-center">24% do limite mensal utilizado</p>
              </div>

              <Button className="w-full md:w-auto bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 h-10 text-sm rounded-lg shadow-none transition-all">
                Alterar Plano
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <Card key={plan.id} className={cn(
            "flex flex-col relative transition-all duration-200 bg-white border-[#E4E4E7] shadow-none rounded-xl",
            plan.current ? "ring-2 ring-[#6366F1] ring-offset-2 border-transparent" : "hover:border-[#6366F1]/40"
          )}>
            {plan.current && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6366F1] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Seu Plano Atual
              </div>
            )}
            <CardHeader className="text-center pb-2 pt-8">
              <div className="mx-auto w-10 h-10 bg-[#EEF2FF] rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <plan.icon className="w-5 h-5 text-[#6366F1]" />
              </div>
              <CardTitle className="text-lg font-semibold text-[#09090B] tracking-tight">{plan.name}</CardTitle>
              <CardDescription className="text-xs font-medium text-[#71717A]">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 pt-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-[#09090B] tracking-tight">R$ {plan.price}</span>
                <span className="text-[#71717A] text-sm font-medium">/mês</span>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#3F3F46] font-medium leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pb-8 px-6 pt-6">
              <Button 
                variant={plan.current ? "outline" : "default"} 
                className={cn(
                  "w-full h-10 text-xs font-semibold rounded-lg transition-all",
                  !plan.current && "bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-none",
                  plan.current && "border-[#E4E4E7] text-[#71717A] hover:bg-[#F4F4F5] pointer-events-none opacity-50"
                )}
                disabled={plan.current}
              >
                {plan.current ? 'Seu Plano Atual' : 'Fazer Upgrade'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold tracking-tight text-[#09090B]">Histórico de Faturas</h3>
        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-[#F8F9FF] border-b border-[#F4F4F5]">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-[10px] text-[#71717A] uppercase tracking-wider h-11">Fatura</TableHead>
                <TableHead className="font-bold text-[10px] text-[#71717A] uppercase tracking-wider h-11">Status</TableHead>
                <TableHead className="font-bold text-[10px] text-[#71717A] uppercase tracking-wider h-11">Data</TableHead>
                <TableHead className="font-bold text-[10px] text-[#71717A] uppercase tracking-wider h-11">Valor</TableHead>
                <TableHead className="text-right h-11 pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'FT-29402', status: 'pago', date: '17/05/2026', value: 'R$ 397,00' },
                { id: 'FT-28391', status: 'pago', date: '17/04/2026', value: 'R$ 397,00' },
                { id: 'FT-27284', status: 'pago', date: '17/03/2026', value: 'R$ 197,00' },
              ].map((inv) => (
                <TableRow key={inv.id} className="border-b border-[#F4F4F5] hover:bg-[#F8F9FF]/50 transition-colors">
                  <TableCell className="font-medium text-sm text-[#09090B]">{inv.id}</TableCell>
                  <TableCell>
                    <Badge className="bg-[#F0FDF4] text-[#166534] border-none capitalize text-[10px] font-bold px-2 py-0">Pago</Badge>
                  </TableCell>
                  <TableCell className="text-[#71717A] font-medium text-[13px]">{inv.date}</TableCell>
                  <TableCell className="font-semibold text-sm text-[#09090B]">{inv.value}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={downloading === inv.id}
                      onClick={() => handleDownload(inv.id)}
                      className="text-[#6366F1] font-bold text-xs h-8 px-3 rounded hover:bg-[#EEF2FF] flex items-center gap-1.5"
                    >
                      {downloading === inv.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      {downloading === inv.id ? 'GERANDO...' : 'PDF'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </motion.div>
  );
}
