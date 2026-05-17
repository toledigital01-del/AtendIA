import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, User, ChevronRight, Filter, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export default function Appointments() {
  const appointments = [
    { id: 1, name: 'João Silva', date: 'Hoje, 14:30', service: 'Consulta Cardiológica', status: 'confirmado' },
    { id: 2, name: 'Maria Oliveira', date: 'Hoje, 16:00', service: 'Exame de Sangue', status: 'confirmado' },
    { id: 3, name: 'Carlos Souza', date: 'Amanhã, 09:00', service: 'Retorno Pediatria', status: 'pendente' },
    { id: 4, name: 'Ana Costa', date: 'Amanhã, 11:30', service: 'Ginecologia', status: 'confirmado' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
           <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#07090F] to-[#0F1123] flex items-center justify-center border border-white/5 shadow-xl">
             <Calendar className="w-7 h-7 text-[#6366F1]" />
           </div>
           <div>
             <h2 className="text-2xl font-bold tracking-tight text-[#09090B] font-display uppercase tracking-tight">Grade de Operações</h2>
             <p className="text-[11px] font-bold text-[#71717A] uppercase tracking-widest mt-1">Sincronização Neural de Agenda em Tempo Real</p>
           </div>
        </div>
        <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black text-[11px] uppercase tracking-widest h-11 px-8 rounded-xl shadow-lg shadow-[#6366F1]/20 border-t border-white/10 transition-all active:scale-95">Bloquear Slot Manual</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
        <div className="space-y-6">
          <Card className="bg-white border-[#E4E4E7] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[28px] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[#F4F4F5] px-8 py-6 bg-[#F8F9FF]/30">
              <div className="flex gap-1.5 p-1.5 bg-white border border-[#E4E4E7] rounded-xl shadow-sm">
                {['TODOS', 'HOJE', 'SEMANA'].map((t) => (
                  <Button 
                    key={t}
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "h-9 px-5 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest",
                      t === 'HOJE' ? "bg-[#09090B] text-white shadow-xl shadow-black/10" : "text-[#71717A] hover:bg-[#F4F4F5]"
                    )}
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" className="h-10 gap-2 border-[#E4E4E7] text-[#09090B] font-black text-[10px] px-5 rounded-xl uppercase tracking-widest shadow-sm hover:bg-[#F8F9FF]">
                <Filter className="w-3.5 h-3.5 text-[#6366F1]" /> Filtros Neurais
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#F4F4F5]">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-8 hover:bg-[#F8F9FF] transition-all cursor-pointer group relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1 bg-[#6366F1] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center group-hover:rotate-6 transition-transform">
                        <User className="w-6 h-6 text-[#6366F1]" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-[#09090B] group-hover:text-[#6366F1] transition-colors">{apt.name}</p>
                        <div className="flex items-center gap-5 text-[11px] text-[#71717A] mt-1.5 font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#6366F1]" /> {apt.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#6366F1]" /> Presencial</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[13px] font-black text-[#09090B] group-hover:text-[#6366F1] transition-colors">{apt.service}</p>
                        <Badge className={cn(
                          "text-[9px] mt-2 border-none font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full",
                          apt.status === 'confirmado' ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-[#EEF2FF] text-[#4338CA]'
                        )}>
                          ESTADO: {apt.status}
                        </Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#A1A1AA] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-white border-[#E4E4E7] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[28px] overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-[#71717A]">Sync Google Calendar</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="aspect-square bg-[#F8F9FF] rounded-2xl border border-[#E4E4E7] border-dashed flex items-center justify-center text-[11px] text-[#71717A] text-center p-8 font-bold leading-relaxed uppercase tracking-widest relative group cursor-pointer hover:bg-[#EEF2FF] transition-colors">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#6366F1] group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Agenda integrada via Cloud API
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#07090F] border-none shadow-none text-white rounded-[28px] overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#6366F1]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center shadow-lg shadow-[#6366F1]/30">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest italic">IA ADVISOR</h3>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-medium">
                Detectei <span className="text-white font-bold">3 janelas neurais</span> livres hoje à tarde. Recomendo preencher com leads quentes do CRM para maximizar a conversão diária.
              </p>
              <Button size="lg" className="w-full mt-8 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black h-12 rounded-xl text-[11px] shadow-none uppercase tracking-widest border-t border-white/20 transition-all hover:shadow-xl hover:shadow-[#6366F1]/20">
                Otimizar Agenda Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
