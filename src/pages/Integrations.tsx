import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plug, 
  Settings2, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  Calendar,
  Zap,
  Globe,
  Database,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const INTEGRATIONS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Meta',
    description: 'API Oficial da Meta para estabilidade total.',
    icon: Phone,
    color: '#25D366',
    status: 'connected',
    category: 'Mensageria'
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    description: 'Sincronize agendamentos automaticamente.',
    icon: Calendar,
    color: '#4285F4',
    status: 'connected',
    category: 'Agenda'
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Receba pagamentos via IA no checkout.',
    icon: Zap,
    color: '#635BFF',
    status: 'disconnected',
    category: 'Finanças'
  },
  {
    id: 'webhook',
    name: 'Webhooks Custom',
    description: 'Envie dados para qualquer URL externa.',
    icon: Globe,
    color: '#09090B',
    status: 'disconnected',
    category: 'Developer'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Sincronize leads com seu CRM oficial.',
    icon: Database,
    color: '#00A1E0',
    status: 'disconnected',
    category: 'CRM'
  }
];

export default function Integrations() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = (id: string, currentStatus: string) => {
    setLoading(id);
    setTimeout(() => {
      setLoading(null);
      toast.success(`${currentStatus === 'connected' ? 'Desconectado' : 'Conectado'} com sucesso!`);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-12 pb-20 pt-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#07090F] to-[#0F1123] flex items-center justify-center relative overflow-hidden group shadow-2xl border border-white/5 ring-1 ring-white/10">
            <div className="absolute inset-0 bg-[#6366F1]/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Plug className="w-7 h-7 text-[#6366F1] relative z-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#09090B] font-display uppercase tracking-tight">Neural Bridges</h2>
            <p className="text-[11px] font-bold text-[#71717A] uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
               Integrações de Fluxo Ativo
            </p>
          </div>
        </div>

        <Button variant="outline" className="h-11 px-5 border-[#E4E4E7] text-[11px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 group transition-all hover:bg-[#F8F9FF] shadow-sm">
          <Settings2 className="w-4 h-4 text-[#6366F1] group-hover:rotate-180 transition-transform duration-700" />
          Configurações API
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INTEGRATIONS.map((app, idx) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="bg-white border-[#E4E4E7] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-[28px] overflow-hidden flex flex-col h-full group border-transparent hover:border-[#6366F1]/20">
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: app.color }}
                  >
                    <app.icon className="w-7 h-7" />
                  </div>
                  <Badge className={cn(
                    "border-none text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 h-6 rounded-full",
                    app.status === 'connected' ? "bg-[#F0FDF4] text-[#166534]" : "bg-[#F4F4F5] text-[#71717A]"
                  )}>
                    {app.status === 'connected' ? 'ESTADO: ATIVO' : 'ESTADO: INATIVO'}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <CardTitle className="text-lg font-bold text-[#09090B] tracking-tight">{app.name}</CardTitle>
                  <p className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.2em]">{app.category}</p>
                </div>
              </CardHeader>
              <CardContent className="px-8 py-4 flex-1">
                <p className="text-[13px] text-[#71717A] font-medium leading-relaxed">{app.description}</p>
              </CardContent>
              <CardFooter className="p-8 pt-4 bg-[#F8F9FF]/50 border-t border-[#F4F4F5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch 
                    checked={app.status === 'connected'} 
                    onCheckedChange={() => handleToggle(app.id, app.status)}
                    disabled={loading === app.id}
                    className="data-[state=checked]:bg-[#6366F1] scale-110"
                  />
                  <span className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest min-w-[30px]">
                    {loading === app.id ? '...' : app.status === 'connected' ? 'ON' : 'OFF'}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-9 px-4 text-[#6366F1] hover:bg-[#EEF2FF] font-black text-[10px] flex items-center gap-2 uppercase tracking-widest transition-all rounded-lg">
                  NODE CONFIG <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        <Card className="bg-[#F8F9FF] border-[#E4E4E7] border-2 border-dashed shadow-none rounded-[28px] flex flex-col items-center justify-center p-10 text-center min-h-[320px] group cursor-pointer hover:bg-[#EEF2FF] hover:border-[#6366F1]/30 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-white border border-[#E4E4E7] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-sm">
             <Plus className="w-7 h-7 text-[#6366F1]" />
          </div>
          <h3 className="text-[15px] font-bold text-[#09090B] uppercase tracking-tight">Solicitar Bridge</h3>
          <p className="text-xs text-[#71717A] font-medium mt-3 max-w-[200px] leading-relaxed">Nossa engenharia neural está pronta para conectar seu stack.</p>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-[#07090F] rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Globe className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <Badge className="bg-[#6366F1] text-white border-none text-[9px] font-bold uppercase tracking-[0.2em]">Developer Toolkit</Badge>
                <span className="text-[10px] text-[#71717A]">•</span>
                <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">AtendIA Enterprise</span>
             </div>
             <h3 className="text-xl font-semibold text-white tracking-tight">Precisa de algo sob medida?</h3>
             <p className="text-sm text-[#A1A1AA] font-medium">Nossa API REST permite que você conecte o AtendIA com qualquer sistema legado ou interno de sua clínica.</p>
          </div>
          <Button className="bg-white text-[#07090F] hover:bg-[#F4F4F5] font-bold h-10 px-6 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap">
             Explorar Documentação <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
