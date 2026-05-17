import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MessageSquare, Target, UserPlus, Calendar, ChevronRight, Download, Brain, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MOCK_LEADS } from '../lib/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function Leads() {
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('week');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast.info("Compilando leads qualificados...", { duration: 2500 });
    
    setTimeout(() => {
      const content = "LEADS QUALIFICADOS SYNTRO / AtendIA\n" + 
                     "==================================\n\n" + 
                     MOCK_LEADS.map(l => `NOME: ${l.contact_name}\nFONE: ${l.contact_phone}\nINTERESSE: ${l.detected_interest}\nDATA: ${l.qualified_at}\n-------------------`).join("\n\n");
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syntro-leads-${new Date().getTime()}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      toast.success("Download dos leads iniciado!", {
        description: "Seu arquivo está pronto para uso no CRM.",
      });
    }, 2500);
  };

  const filteredLeads = MOCK_LEADS.filter(lead => 
    lead.contact_name.toLowerCase().includes(search.toLowerCase()) || 
    lead.contact_phone.includes(search)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center shadow-lg shadow-[#6366F1]/20">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#09090B] font-display">Pipeline de Leads</h2>
            <p className="text-[11px] text-[#71717A] font-bold uppercase tracking-widest mt-1">Sua IA qualificou <span className="text-[#6366F1]">{MOCK_LEADS.length} novas oportunidades</span> esta semana</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            className="h-11 bg-white border-[#E4E4E7] font-bold text-[11px] uppercase tracking-widest gap-2 px-5 hover:bg-[#F8F9FF] transition-all rounded-xl"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6366F1]" /> : <Download className="w-3.5 h-3.5 text-[#6366F1]" />}
            Exportar Leads
          </Button>
          <div className="flex gap-1 p-1 bg-white border border-[#E4E4E7] rounded-xl shadow-sm">
            {['today', 'week', 'month'].map((p) => (
              <Button 
                key={p}
                variant="ghost" 
                size="sm"
                onClick={() => setPeriod(p)}
                className={cn(
                  "capitalize h-9 px-4 text-[11px] font-bold transition-all rounded-lg uppercase tracking-wider",
                  period === p ? "bg-[#09090B] text-white shadow-lg shadow-black/10" : "text-[#71717A] hover:bg-[#F4F4F5]"
                )}
              >
                {p === 'today' ? 'Hoje' : p === 'week' ? 'Semana' : 'Mês'}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-64 group">
            <div className="absolute inset-0 bg-[#6366F1]/5 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] group-focus-within:text-[#6366F1] transition-colors z-10" />
            <Input 
              placeholder="Localizar lead..." 
              className="pl-11 h-11 border-[#E4E4E7] bg-white focus:bg-white transition-all ring-[#6366F1]/10 rounded-xl text-sm relative z-10 border-white/5 focus:border-[#6366F1]/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLeads.map((lead, idx) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="bg-white border-[#E4E4E7] border shadow-none group transition-all duration-200 overflow-hidden flex flex-col rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#6366F1] font-bold text-lg">
                  {lead.contact_name[0]}
                </div>
                <div>
                  <CardTitle className="text-[15px] font-medium tracking-tight text-[#09090B] group-hover:text-[#6366F1] transition-colors">{lead.contact_name}</CardTitle>
                  <p className="text-[10px] text-[#71717A] font-medium uppercase tracking-wider mt-0.5">{lead.contact_phone}</p>
                </div>
              </div>
              <Badge className="bg-[#EEF2FF] text-[#4338CA] border-none text-[10px] font-semibold">Novo</Badge>
            </CardHeader>
            <CardContent className="py-2 px-6 space-y-4 flex-1">
              <div className="p-3.5 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5]">
                <p className="text-[9px] text-[#C2410C] font-bold uppercase tracking-wider mb-1.5">Intenção</p>
                <p className="text-sm font-normal text-[#09090B] leading-relaxed line-clamp-2">{lead.detected_interest}</p>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-medium text-[#71717A] uppercase tracking-wider">
                <Calendar className="w-3 h-3 text-[#6366F1]" />
                <span>Registrado em {format(new Date(lead.qualified_at), "dd/MM", { locale: ptBR })}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-[#F8F9FF] p-5 px-6 gap-2 border-t border-[#F4F4F5]">
              <Button variant="outline" className="flex-1 text-xs font-medium h-9 rounded-lg border-[#E4E4E7] bg-white hover:bg-[#F4F4F5] text-[#3F3F46]">
                Conferir
              </Button>
              <Button className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white h-9 text-xs font-medium rounded-lg shadow-none">
                Assumir
              </Button>
            </CardFooter>
          </Card>
          </motion.div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-bold">Nenhum lead encontrado</h3>
          <p className="text-sm text-text-secondary max-w-xs mx-auto">Tente ajustar seus filtros ou busca para encontrar o que procura.</p>
        </div>
      )}
    </motion.div>
  );
}
