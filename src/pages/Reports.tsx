import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Download, 
  Calendar as CalendarIcon,
  MessageSquare,
  Users,
  Target,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  ChevronRight,
  Clock,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { cn } from '../lib/utils';

export default function Reports() {
  const [period, setPeriod] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast.info("Processando dados neurais para exportação...", {
      description: "Compilando métricas de performance IA.",
      duration: 3000
    });

    setTimeout(() => {
      // Simulate real download
      const content = "Relatório de Inteligência SYNTRO / AtendIA\n" + 
                     "========================================\n" +
                     "Data: " + new Date().toLocaleString() + "\n" +
                     "Total de Conversas: 842\n" +
                     "Leads Qualificados: 156\n" +
                     "Taxa de Conversão: 18.5%\n" +
                     "Resolução por IA: 84%\n\n" +
                     "Otimização Neural detectada: +12% vs mês anterior.";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syntro-intelligence-${new Date().getTime()}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      toast.success("Dados exportados com sucesso!", {
        description: "O download do pacote de inteligência começou.",
      });
    }, 3000);
  };

  const lineData = useMemo(() => [
    { name: '01/05', conversas: 24, leads: 8, conversas_ant: 20, leads_ant: 6 },
    { name: '05/05', conversas: 36, leads: 12, conversas_ant: 30, leads_ant: 9 },
    { name: '10/05', conversas: 48, leads: 15, conversas_ant: 42, leads_ant: 12 },
    { name: '15/05', conversas: 42, leads: 18, conversas_ant: 45, leads_ant: 14 },
    { name: '20/05', conversas: 55, leads: 22, conversas_ant: 48, leads_ant: 18 },
    { name: '25/05', conversas: 68, leads: 25, conversas_ant: 60, leads_ant: 22 },
    { name: '30/05', conversas: 52, leads: 19, conversas_ant: 58, leads_ant: 16 },
  ], []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border-none ring-1 ring-border/50 shadow-2xl p-5 rounded-2xl animate-in fade-in zoom-in duration-200 min-w-[180px]">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary mb-4 border-b border-border/50 pb-2">{label}</p>
          <div className="space-y-3">
            {payload.map((entry: any, i: number) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs font-bold text-text-primary capitalize">{entry.name.replace('_ant', '')}</span>
                </div>
                <span className="text-sm font-black text-text-primary">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

const pieData = [
    { name: 'Resolvidas IA', value: 450, color: '#6366F1' },
    { name: 'Escaladas Humano', value: 80, color: '#F97316' },
    { name: 'Em andamento', value: 120, color: '#F4F4F5' },
  ];

  const topQuestions = [
    { question: 'Quais os horários disponíveis?', count: 184, impact: 'High' },
    { question: 'Vocês aceitam convênio saúde?', count: 156, impact: 'Medium' },
    { question: 'Qual o valor da consulta?', count: 142, impact: 'High' },
    { question: 'Onde fica a clínica?', count: 98, impact: 'Low' },
  ];

  const stats = [
    { label: 'Total conversas', value: '842', icon: MessageSquare },
    { label: 'Leads gerados', value: '156', icon: Target },
    { label: 'Taxa conversão', value: '18.5%', icon: CheckCircle2 },
    { label: 'Resolvidas por IA', value: '84%', icon: BarChart3 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#07090F] to-[#0F1123] flex items-center justify-center shadow-xl shadow-[#6366F1]/10 border border-white/5 ring-1 ring-white/10 group overflow-hidden relative">
            <div className="absolute inset-0 bg-[#6366F1]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BarChart3 className="w-7 h-7 text-[#6366F1] relative z-10 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#09090B] font-display uppercase tracking-tight">Cérebro Analítico</h2>
            <p className="text-[11px] text-[#71717A] font-bold uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
               Relatórios de Performance IA v4.0
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48 bg-white border-[#E4E4E7] h-10 text-sm font-medium">
              <CalendarIcon className="w-4 h-4 mr-2 text-[#6366F1]" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#E4E4E7] p-1 rounded-lg">
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleExport}
            disabled={isExporting}
            className="h-10 bg-white border-[#E4E4E7] font-medium text-sm gap-2 px-4 hover:bg-[#F4F4F5] transition-all"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#6366F1]" />
            ) : (
              <Download className="w-4 h-4 text-[#6366F1]" />
            )}
            {isExporting ? 'Exportando...' : 'Exportar Dados'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={stat.label} className="bg-white border-[#E4E4E7] border shadow-none rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#6366F1]">
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge className="bg-[#F0FDF4] text-[#166534] border-none text-[10px] font-bold">+12%</Badge>
              </div>
              <p className="text-2xl font-semibold text-[#09090B] tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-[0.06em] mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-base font-semibold tracking-tight">Fluxo de Oportunidades</CardTitle>
            <CardDescription className="text-xs font-medium text-[#71717A]">Conversas vs leads qualificados</CardDescription>
          </CardHeader>
          <CardContent className="h-[360px] px-4 pb-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F4F4F5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#A1A1AA' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#A1A1AA' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle" 
                  wrapperStyle={{ paddingBottom: '30px', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversas_ant" 
                  name="Conversas (Ant.)" 
                  stroke="#E4E4E7" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  fill="transparent" 
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversas" 
                  name="Conversas" 
                  stroke="#6366F1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorConv)" 
                  animationDuration={1000}
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  name="Leads" 
                  stroke="#F97316" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-base font-semibold tracking-tight">Performance da IA</CardTitle>
            <CardDescription className="text-xs font-medium text-[#71717A]">Resolução de demandas</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] pb-8 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={80} 
                  outerRadius={105} 
                  paddingAngle={5} 
                  dataKey="value"
                  animationBegin={200}
                  animationDuration={1200}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle" 
                  wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-[-10px]">
               <p className="text-3xl font-bold text-[#6366F1]">84%</p>
               <p className="text-[9px] font-bold text-[#A1A1AA] uppercase tracking-widest">Resolvido</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
          <CardHeader className="px-8 py-6 border-b border-[#F4F4F5]">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#6366F1]" />
                  Top Perguntas Frequentes
                </CardTitle>
                <CardDescription className="text-xs font-medium text-[#71717A] mt-1">Dúvidas mais comuns detectadas pelo assistente</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#F4F4F5]">
              {topQuestions.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-8 py-5 hover:bg-[#F8F9FF] transition-colors group">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#09090B] group-hover:text-[#6366F1] transition-colors">{item.question}</p>
                    <div className="flex items-center gap-3">
                       <p className="text-[11px] font-medium text-[#71717A]">{item.count} interações este mês</p>
                       <span className="text-[#E4E4E7]">•</span>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-[#22C55E]">
                         <TrendingUp className="w-3 h-3" />
                         <span>+12%</span>
                       </div>
                    </div>
                  </div>
                  <Badge className={cn(
                    "text-[9px] font-bold uppercase tracking-wider py-1 border-none px-2",
                    item.impact === 'High' ? 'bg-[#FEF2F2] text-[#991B1B]' : 
                    item.impact === 'Medium' ? 'bg-[#EEF2FF] text-[#4338CA]' : 
                    'bg-[#F4F4F5] text-[#71717A]'
                  )}>
                    {item.impact} IMPACT
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
          <CardHeader className="px-8 py-6 border-b border-[#F4F4F5]">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#6366F1]" />
              Heatmap de Atendimento
            </CardTitle>
            <CardDescription className="text-xs font-medium text-[#71717A] mt-1">Horários de maior volume de mensagens</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-7 gap-2">
              {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, didx) => (
                <div key={didx} className="flex flex-col gap-2">
                   <span className="text-[10px] font-bold text-[#A1A1AA] text-center mb-1">{day}</span>
                   {Array.from({ length: 6 }).map((_, hidx) => {
                     const intensity = Math.random();
                     return (
                       <div 
                         key={hidx} 
                         className="aspect-square rounded-[4px] transition-all duration-500 hover:scale-110 cursor-pointer" 
                         style={{ 
                           backgroundColor: intensity > 0.8 ? '#4F46E5' : 
                                            intensity > 0.6 ? '#6366F1' :
                                            intensity > 0.4 ? '#818CF8' :
                                            intensity > 0.2 ? '#A5B4FC' : '#EEF2FF'
                         }}
                         title={`${intensity * 100} msgs`}
                       />
                     );
                   })}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[#F4F4F5] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Menos</span>
              <div className="flex gap-1">
                {['#EEF2FF', '#A5B4FC', '#818CF8', '#6366F1', '#4F46E5'].map(color => (
                  <div key={color} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: color }} />
                ))}
              </div>
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Mais</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
