import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Target, 
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Sparkles,
  Bot,
  Download,
  Loader2,
  Settings2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MOCK_COMPANY, MOCK_CONVERSATIONS, MOCK_LEADS } from '../lib/mockData';
import { format, isToday, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast.info("Exportando relatório detalhado...", { duration: 2500 });

    setTimeout(() => {
      setIsExporting(false);
      toast.success("Relatório pronto!", {
        description: "O documento foi baixado automaticamente.",
      });
    }, 2500);
  };
  const metrics = [
    { label: 'Conversas hoje', value: '42', delta: '+12%', isPositive: true, icon: MessageSquare, color: 'primary' },
    { label: 'Leads qualificados', value: '18', delta: '+5%', isPositive: true, icon: Target, color: 'blue' },
    { label: 'Taxa de resolução IA', value: '94.2%', delta: '-2%', isPositive: false, icon: Sparkles, color: 'purple' },
    { label: 'Tempo médio resposta', value: '12s', delta: '-1s', isPositive: true, icon: Timer, color: 'green' },
  ];

  const chartData = useMemo(() => [
    { name: 'Seg', valor: 45, anterior: 38 },
    { name: 'Ter', valor: 52, anterior: 45 },
    { name: 'Qua', valor: 48, anterior: 55 },
    { name: 'Qui', valor: 61, anterior: 48 },
    { name: 'Sex', valor: 55, anterior: 50 },
    { name: 'Sáb', valor: 32, anterior: 38 },
    { name: 'Dom', valor: 28, anterior: 25 },
  ], []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-dark border-none ring-1 ring-white/10 shadow-2xl p-4 rounded-2xl animate-in fade-in zoom-in duration-200">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#71717A] mb-3">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6366F1] ai-glow-orange shrink-0" />
                <span className="text-xs font-bold text-white/90">Atual</span>
              </div>
              <span className="text-sm font-bold text-white">{payload[0].value} msgs</span>
            </div>
            {payload[1] && (
              <div className="flex items-center justify-between gap-6 opacity-40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white shrink-0" />
                  <span className="text-xs font-bold text-white/90">Anterior</span>
                </div>
                <span className="text-sm font-bold text-white">{payload[1].value} ant.</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const recentConversations = MOCK_CONVERSATIONS.slice(0, 5);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-[#09090B]">Olá, Equipe {MOCK_COMPANY.name} 👋</h2>
          <p className="text-[#71717A] mt-1 text-sm font-normal">Sua IA está ativa e cuidando de <span className="font-medium text-[#6366F1]">12 negociações</span> agora.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-[#E4E4E7] h-9 px-4 text-sm rounded-lg" onClick={handleExport}>
            Relatório Completo
          </Button>
          <Button 
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium h-9 px-4 rounded-lg text-sm shadow-none flex items-center gap-2"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isExporting ? 'Exportando...' : 'Exportar Leads'}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <motion.div 
            key={metric.label} 
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="border-[#E4E4E7] bg-white transition-all duration-200 border ring-0 overflow-hidden relative shadow-none rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                    metric.color === 'primary' ? "bg-[#EEF2FF] text-[#6366F1]" :
                    metric.color === 'blue' ? "bg-blue-50 text-blue-600" :
                    metric.color === 'purple' ? "bg-purple-50 text-purple-600" :
                    "bg-[#F0FDF4] text-[#166534]"
                  )}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <div className={cn(
                    "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    metric.isPositive ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-[#FEF2F2] text-[#991B1B]'
                  )}>
                    {metric.delta}
                  </div>
                </div>
                <div className="relative">
                  <p className="text-2xl font-medium text-[#09090B] tracking-tight">{metric.value}</p>
                </div>
                <p className="text-xs font-medium text-[#71717A] uppercase tracking-[0.06em] mt-1">{metric.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Left Column */}
        <motion.div variants={item} className="space-y-8">
          <Card className="bg-white border-[#E4E4E7] shadow-none overflow-hidden relative group/inbox rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[#F4F4F5] px-8 py-6 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
                <CardTitle className="text-[17px] font-bold tracking-tight text-[#09090B] font-display uppercase">Inbox Realtime</CardTitle>
                <div className="flex items-center gap-1.5 ml-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                   <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest">3 Diretos</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[#6366F1] hover:bg-[#EEF2FF] font-bold text-[11px] uppercase tracking-wider h-8 px-4 rounded-full transition-all">
                Painel Completo
              </Button>
            </CardHeader>
            
            <CardContent className="p-0 overflow-hidden">
              <div className="divide-y divide-[#F4F4F5]">
                {recentConversations.map((conv, idx) => (
                  <motion.div 
                    key={conv.id} 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-5 px-8 py-6 hover:bg-[#F8F9FF] transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    {idx < 2 && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6]" />
                    )}

                    <div className="relative shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-[#6366F1] to-[#F97316] rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-sm" />
                      <Avatar className="w-13 h-13 border-2 border-white shadow-xl relative z-10 scale-100 group-hover:scale-105 transition-transform duration-300">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.contact_name}&backgroundColor=F8F9FF`} />
                        <AvatarFallback className="bg-gradient-to-br from-[#EEF2FF] to-white text-[#6366F1] font-bold text-base">
                          {conv.contact_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {conv.status === 'active' && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#22C55E] border-2 border-white rounded-full z-20 shadow-sm">
                          <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-75" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 py-1 space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[15px] font-bold truncate text-[#09090B] group-hover:text-[#6366F1] transition-colors font-display">
                          {conv.contact_name}
                        </p>
                        <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.1em] shrink-0">
                          {idx === 0 ? 'há 1m' : idx === 1 ? 'há 8m' : `há ${idx * 12 + 4}m`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {idx === 0 ? (
                          <div className="flex items-center gap-3 py-0.5">
                            <div className="flex gap-1 items-center">
                              <motion.span animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
                              <motion.span animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
                              <motion.span animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
                            </div>
                            <p className="text-xs font-bold text-[#6366F1] uppercase tracking-widest animate-pulse">Neural Typing...</p>
                          </div>
                        ) : (
                          <p className={cn(
                            "text-[13px] truncate font-medium max-w-[280px]",
                            idx < 2 ? "text-[#3F3F46]" : "text-[#71717A]"
                          )}>
                            {idx === 1 ? "IA: Agendamento confirmado para às 14:30 🚀" : conv.last_message_preview}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge className={cn(
                        "text-[9px] px-2.5 py-1 border-none font-bold uppercase tracking-[0.1em] rounded-full",
                        idx < 2 ? 'bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FDBA74]/30' : 'bg-[#F4F4F5] text-[#71717A]'
                      )}>
                        {idx < 2 ? 'ALTA PRIORIDADE' : 'LEAD N1'}
                      </Badge>
                      {idx === 0 && (
                         <div className="w-5 h-5 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-[10px] font-bold animate-bounce shadow-md">1</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-8 bg-gradient-to-r from-[#F8F9FF] to-white flex items-center justify-between border-t border-[#F4F4F5]">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <Avatar key={i} className="w-9 h-9 border-2 border-white ring-1 ring-black/5 shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=agent${i}`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#09090B] uppercase tracking-wider">Time de Atendimento</span>
                    <span className="text-[10px] font-medium text-[#71717A]">3 Agentes Disponíveis</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#F4F4F5] shadow-sm">
                   <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                   </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">IA Engine Ativa</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#E4E4E7] shadow-none rounded-xl">
            <CardHeader className="px-8 py-5 flex flex-row items-center justify-between border-b border-[#F4F4F5]">
              <div>
                <CardTitle className="text-base font-medium tracking-tight">Fluxo de Demanda</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-[#F0FDF4] text-[#166534] border-none text-[10px] font-bold">+24% vs semana ant.</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 opacity-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Ant.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  <span className="text-[10px] font-bold text-[#6366F1] uppercase tracking-wider">Atual</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[320px] px-4 pb-4 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F4F4F5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 500, fill: '#A1A1AA' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 500, fill: '#A1A1AA' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="anterior" 
                    stroke="#E4E4E7" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    fill="transparent" 
                    animationDuration={1000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="valor" 
                    stroke="#6366F1" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-8">
          <Card className="bg-white border-[#E4E4E7] shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-2xl overflow-hidden group">
            <CardHeader className="pb-4 px-8 pt-8 border-b border-[#F4F4F5]">
              <CardTitle className="text-[10px] font-bold text-[#71717A] uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-ping" />
                Neural Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8 pt-6">
              <div className="flex flex-col items-center py-4 bg-gradient-to-b from-[#F8F9FF] to-white rounded-2xl border border-[#EEF2FF] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />
                <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center relative z-10 border border-[#EEF2FF] group-hover:scale-110 transition-transform duration-500">
                  <Bot className="w-10 h-10 text-[#6366F1] animate-float" />
                  <div className="absolute inset-0 rounded-full bg-[#6366F1]/5 animate-pulse" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[11px] font-bold text-[#6366F1] uppercase tracking-[0.2em] mb-1">Assistente Online</p>
                  <h3 className="text-xl font-bold text-[#09090B] font-display">Sofia AI Engine</h3>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                   <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Nível de Memória</span>
                     <span className="text-[10px] font-bold text-[#6366F1]">84% Otimizada</span>
                   </div>
                   <div className="h-1.5 w-full bg-[#F4F4F5] rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-[#6366F1] to-[#818CF8] w-[84%]" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F8F9FF] border border-[#EEF2FF] space-y-1">
                    <p className="text-[9px] font-bold text-[#71717A] uppercase tracking-wider">Humor Atual</p>
                    <p className="text-sm font-bold text-[#09090B] uppercase">Empático</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] space-y-1">
                    <p className="text-[9px] font-bold text-[#C2410C] uppercase tracking-wider">Confiança</p>
                    <p className="text-sm font-bold text-[#C2410C] uppercase">98.4%</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-2">
                  {[
                    { label: "Qualificar Leads", checked: true, icon: Target },
                    { label: "Agendar Reuniões", checked: true, icon: Timer },
                    { label: "Análise de Sentimento", checked: false, icon: Sparkles }
                  ].map((toggle) => (
                    <div key={toggle.label} className="flex items-center justify-between group/row">
                      <div className="flex items-center gap-2.5">
                        <toggle.icon className="w-3.5 h-3.5 text-[#71717A] group-hover/row:text-[#6366F1] transition-colors" />
                        <span className="text-[13px] font-bold text-[#3F3F46]">{toggle.label}</span>
                      </div>
                      <Switch checked={toggle.checked} className="data-[state=checked]:bg-[#6366F1] scale-90" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#F4F4F5] flex flex-col gap-4">
                <Button className="w-full h-11 bg-[#09090B] hover:bg-[#18181B] text-white font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-2">
                  <Settings2 className="w-4 h-4" /> Configurar Cérebro
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#07090F] text-white border-none shadow-none rounded-xl overflow-hidden relative">
            <CardHeader className="pt-8 px-8">
              <CardTitle className="text-[10px] font-bold text-[#71717A] uppercase tracking-[0.2em]">Faturamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              <div>
                <p className="text-2xl font-semibold capitalize">{MOCK_COMPANY.plan} Plan</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-[#6366F1]">R$ 397</span>
                  <span className="text-sm font-medium text-[#71717A]">/mês</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                  <span>Uso da IA</span>
                  <span className="text-white">1.2k / 5k</span>
                </div>
                <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366F1]" style={{ width: '24%' }} />
                </div>
              </div>
              <Button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium h-10 rounded-lg text-sm transition-all shadow-none">
                Fazer Upgrade
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
