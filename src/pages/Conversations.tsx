import { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  Send, 
  Bot, 
  Clock, 
  CheckCheck,
  MoreHorizontal,
  ChevronLeft,
  Sparkles,
  Phone,
  Video,
  Info,
  MessageSquare,
  Hash,
  Brain,
  History,
  Target as TargetIcon
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../lib/mockData';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';

export default function Conversations() {
  const [selectedConv, setSelectedConv] = useState<typeof MOCK_CONVERSATIONS[0] | null>(MOCK_CONVERSATIONS[0]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isTyping, setIsTyping] = useState(true);
  const [showIntelligence, setShowIntelligence] = useState(true);

  // Simulate AI typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv => {
    const matchesSearch = conv.contact_name.toLowerCase().includes(search.toLowerCase()) || 
                         conv.contact_phone.includes(search);
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && conv.status === 'active') ||
                         (filter === 'leads' && conv.is_qualified_lead);
    return matchesSearch && matchesFilter;
  });

  const currentMessages = selectedConv 
    ? MOCK_MESSAGES
        .filter(m => m.conversation_id === selectedConv.id)
        .sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime())
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-140px)] flex gap-0 border-[#E4E4E7] border bg-white rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Sidebar List */}
      <div className={cn(
        "w-full md:w-[400px] flex flex-col border-r border-[#F4F4F5] bg-white transition-all shrink-0 no-scrollbar",
        selectedConv && "hidden md:flex"
      )}>
        <div className="p-6 border-b border-[#F4F4F5]">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-[#09090B] font-display">Conversas</h2>
             <Badge className="bg-[#EEF2FF] text-[#6366F1] border-none text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">IA Ativa</Badge>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-[#6366F1]/5 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] group-focus-within:text-[#6366F1] transition-colors z-10" />
            <Input 
              placeholder="Buscar por nome ou fone..." 
              className="pl-11 h-11 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all rounded-xl text-sm border-white/5 focus:border-[#6366F1]/30 relative z-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar">
            {['all', 'active', 'leads'].map((f) => (
              <Button 
                key={f}
                variant="ghost" 
                size="sm"
                onClick={() => setFilter(f)}
                className={cn(
                  "capitalize h-8 px-4 text-[11px] font-bold transition-all rounded-full tracking-widest",
                  filter === f 
                    ? "bg-[#09090B] text-white shadow-lg shadow-black/10" 
                    : "text-[#71717A] hover:bg-[#F4F4F5]"
                )}
              >
                {f === 'all' ? 'Tudo' : f === 'leads' ? 'Leads VIP' : 'Ativos'}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.map((conv, idx) => (
              <motion.div 
                key={conv.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => setSelectedConv(conv)}
                className={cn(
                  "p-4 flex gap-4 cursor-pointer transition-all rounded-2xl relative group overflow-hidden border border-transparent",
                  selectedConv?.id === conv.id 
                    ? "bg-[#EEF2FF] border-[#6366F1]/10 shadow-[0_4px_12px_rgba(99,102,241,0.06)]" 
                    : "hover:bg-[#F8F9FF]"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-13 h-13 border-2 border-white shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.contact_name}&backgroundColor=F8F9FF`} />
                    <AvatarFallback className="bg-slate-100 text-[#71717A] font-bold text-base">
                      {conv.contact_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {conv.status === 'active' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#22C55E] border-2 border-white rounded-full shadow-sm z-10">
                       <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-75" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={cn(
                      "text-[15px] font-bold truncate font-display",
                      selectedConv?.id === conv.id ? "text-[#6366F1]" : "text-[#09090B]"
                    )}>
                      {conv.contact_name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">
                      {idx === 0 ? 'AGORA' : formatDistanceToNow(new Date(conv.updated_at), { addSuffix: false, locale: ptBR, includeSeconds: true }).replace('cerca de', '')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={cn(
                      "text-[12px] truncate font-medium max-w-[200px]",
                      selectedConv?.id === conv.id ? "text-[#4338CA]/80" : "text-[#71717A]"
                    )}>
                      {idx === 0 && isTyping ? (
                        <span className="flex items-center gap-2">
                           <div className="flex gap-0.5">
                              <span className="w-1 h-1 bg-[#6366F1] rounded-full animate-bounce" />
                              <span className="w-1 h-1 bg-[#6366F1] rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1 h-1 bg-[#6366F1] rounded-full animate-bounce [animation-delay:0.4s]" />
                           </div>
                           <span className="font-bold uppercase tracking-widest text-[9px]">Neural Typing...</span>
                        </span>
                      ) : (
                        conv.last_message_preview
                      )}
                    </p>
                    {idx % 4 === 0 && (
                      <div className="h-5 min-w-[20px] px-1.5 bg-[#6366F1] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-[#6366F1]/20">
                        1
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex bg-[#F8F9FF] relative transition-all overflow-hidden",
        !selectedConv && "hidden md:flex"
      )}>
        <AnimatePresence mode="wait">
          {selectedConv ? (
            <div className="flex-1 flex overflow-hidden">
              <motion.div 
                key={selectedConv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col relative overflow-hidden"
              >
                {/* Chat Header */}
                <div className="p-5 bg-white border-b border-[#F4F4F5] flex items-center justify-between z-10 shadow-sm shrink-0">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedConv(null)}
                      className="md:hidden h-10 w-10 -ml-2 rounded-xl"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="relative">
                      <Avatar className="w-11 h-11 border-2 border-white shadow-md ring-1 ring-black/5">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConv.contact_name}&backgroundColor=F8F9FF`} />
                        <AvatarFallback className="bg-slate-100 text-[#71717A] font-bold text-base">
                          {selectedConv.contact_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full shadow-sm" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#09090B] font-display">{selectedConv.contact_name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                            <span className="text-[10px] text-[#22C55E] font-bold uppercase tracking-wider">Online</span>
                        </div>
                        <span className="text-[10px] text-[#A1A1AA]">•</span>
                        <span className="text-[10px] text-[#71717A] font-bold tracking-tight uppercase">{selectedConv.contact_phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-[#71717A] hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl transition-all">
                      <Phone className="w-4.5 h-4.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-[#71717A] hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl transition-all">
                      <Video className="w-4.5 h-4.5" />
                    </Button>
                    <div className="w-[1px] h-6 bg-[#F4F4F5] mx-1" />
                    <Button 
                      variant={showIntelligence ? "secondary" : "ghost"}
                      size="icon" 
                      onClick={() => setShowIntelligence(!showIntelligence)}
                      className={cn(
                        "h-10 w-10 rounded-xl transition-all",
                        showIntelligence ? "bg-[#EEF2FF] text-[#6366F1]" : "text-[#71717A] hover:text-[#09090B]"
                      )}
                    >
                      <Brain className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 px-8 pt-8">
                  <div className="space-y-10 max-w-4xl mx-auto pb-20">
                    <div className="flex justify-center">
                      <div className="bg-[#F4F4F5] px-4 py-1.5 rounded-full ring-1 ring-black/5">
                        <span className="text-[#A1A1AA] text-[10px] font-bold uppercase tracking-[0.2em]">Sábado, 17 de Maio</span>
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 items-center opacity-40">
                       <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E4E4E7]" />
                       <div className="flex items-center gap-2">
                          <Bot className="w-3 h-3" />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Neural Sequence Initiated</span>
                       </div>
                       <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E4E4E7]" />
                    </div>

                    {currentMessages.length > 0 ? (
                      currentMessages.map((msg, idx) => (
                        <motion.div 
                          key={msg.id} 
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className={cn(
                            "flex gap-4 group",
                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                          )}
                        >
                          <div className="shrink-0 mt-1">
                            <Avatar className="w-9 h-9 border-2 border-white shadow-sm ring-1 ring-black/5">
                              {msg.role === 'assistant' ? (
                                 <AvatarImage src="" />
                              ) : (
                                 <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConv.contact_name}`} />
                              )}
                              <AvatarFallback className={cn(
                                "font-bold text-[10px]",
                                msg.role === 'assistant' ? "bg-[#6366F1] text-white" : "bg-slate-100 text-[#71717A]"
                              )}>
                                {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : selectedConv.contact_name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className={cn(
                            "flex flex-col gap-1.5 max-w-[70%]",
                            msg.role === 'user' ? "items-end" : "items-start"
                          )}>
                            <div className={cn(
                              "px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative",
                              msg.role === 'user' 
                                ? "bg-[#6366F1] text-white rounded-tr-sm" 
                                : "bg-white text-[#09090B] rounded-tl-sm border border-[#F4F4F5]"
                            )}>
                              {msg.content}
                              <div className={cn(
                                "absolute bottom-2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2",
                                msg.role === 'user' ? "right-0" : "left-0"
                              )}>
                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-white border border-[#F4F4F5] shadow-sm text-[#71717A] hover:bg-[#EEF2FF] hover:text-[#6366F1]">
                                    <Sparkles className="w-3 h-3" />
                                 </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 px-2 opacity-60">
                              {msg.role === 'assistant' && (
                                <Badge className="bg-[#EEF2FF] text-[#6366F1] text-[8px] font-black tracking-widest uppercase border-none px-1.5 py-0 h-4">
                                  Auto
                                </Badge>
                              )}
                              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase">
                                {format(new Date(msg.sent_at), 'HH:mm')}
                              </span>
                              {msg.role === 'assistant' && <CheckCheck className="w-3.5 h-3.5 text-[#22C55E]" />}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                         <MessageSquare className="w-12 h-12 text-[#A1A1AA]" />
                         <p className="text-xs font-bold uppercase tracking-widest">Nenhuma mensagem nesta sequência</p>
                      </div>
                    )}

                    {isTyping && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-4"
                      >
                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center shrink-0 shadow-lg shadow-[#6366F1]/30">
                            <Bot className="w-4.5 h-4.5 text-white" />
                         </div>
                         <div className="bg-white border border-[#F4F4F5] px-6 py-4 rounded-3xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                            <motion.span animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-[#6366F1] rounded-full" />
                            <motion.span animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[#6366F1] rounded-full" />
                            <motion.span animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[#6366F1] rounded-full" />
                         </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-8 bg-white border-t border-[#F4F4F5] relative transition-all">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-0.5">
                      {[
                        "Vou agendar para amanhã! 📅",
                        "Temos horário às 14:30. ✅",
                        "Qual o melhor e-mail para contato?",
                        "Obrigado pelo seu tempo! 🙏"
                      ].map((sug, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="whitespace-nowrap px-4 py-2 rounded-xl bg-[#F8F9FF] text-[#6366F1] text-xs font-bold border border-[#6366F1]/10 hover:bg-[#6366F1] hover:text-white transition-all shadow-sm"
                        >
                          {sug}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366F1] to-[#F97316] rounded-2xl opacity-0 group-focus-within:opacity-10 transition-opacity blur" />
                        <Input 
                          placeholder="Digite aqui ou deixe a IA Sofia responder..." 
                          className="h-14 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all rounded-2xl pl-5 pr-24 text-[15px] shadow-none relative z-10 border-white/5 focus:border-[#6366F1]/30 ring-0 h-[60px]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
                          <Button size="icon" variant="ghost" className="h-10 w-10 text-[#71717A] hover:text-[#6366F1] rounded-xl">
                            <Sparkles className="w-5 h-5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-10 w-10 text-[#71717A] hover:text-[#09090B] rounded-xl">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      <Button size="icon" className="h-[60px] w-[60px] bg-[#09090B] hover:bg-[#18181B] text-white rounded-2xl shadow-2xl transition-all active:scale-95 group shrink-0">
                        <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Intelligence Sidebar */}
              <AnimatePresence>
                {showIntelligence && (
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 360, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden lg:flex flex-col bg-white border-l border-[#F4F4F5] shrink-0 overflow-hidden"
                  >
                     <div className="p-8 space-y-10">
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#71717A]">Ficha AtendIA</h3>
                              <Badge className="bg-[#FFF7ED] text-[#C2410C] border-none text-[9px] font-bold uppercase tracking-widest shrink-0">LEAD QUALIFICADO</Badge>
                           </div>
                           
                           <div className="p-5 rounded-2xl bg-gradient-to-br from-[#6366F1]/5 to-[#F97316]/5 border border-[#6366F1]/10 space-y-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-[#6366F1]" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Neural Context</p>
                                    <p className="text-sm font-bold text-[#09090B]">Alta Intenção de Compra</p>
                                 </div>
                              </div>
                              <p className="text-[13px] text-[#3F3F46] leading-relaxed">
                                 O contato demonstrou interesse em <span className="font-bold text-[#6366F1]">Implante Dentário</span> e possui disponibilidade para as <span className="font-bold text-[#F97316]">terças-feiras</span>.
                              </p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#71717A]">Linha do Tempo</h3>
                           <div className="space-y-6 relative ml-2">
                              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#F4F4F5]" />
                              {[
                                 { icon: MessageSquare, text: "Interação inicial detectada", time: "Há 12h", color: "#6366F1" },
                                 { icon: TargetIcon, text: "Respondeu à qualificação IA", time: "Há 8h", color: "#22C55E" },
                                 { icon: History, text: "Retorno após lembrete", time: "Há 1h", color: "#F97316" }
                              ].map((event, i) => (
                                 <div key={i} className="flex gap-4 relative pl-5">
                                    <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center">
                                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: event.color }} />
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-bold text-[#09090B] tracking-tight">{event.text}</p>
                                       <p className="text-[10px] font-bold text-[#A1A1AA] uppercase">{event.time}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="pt-10 border-t border-[#F4F4F5] space-y-4">
                           <Button className="w-full h-12 bg-white border-[#E4E4E7] text-[#09090B] hover:bg-[#F8F9FF] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm">
                              Intervir Manualmente
                           </Button>
                           <Button className="w-full h-12 bg-[#6366F1] text-white hover:bg-[#4F46E5] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#6366F1]/20">
                              Gerar Link de Checkout
                           </Button>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 flex-1">
              <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#EEF2FF] to-white shadow-xl flex items-center justify-center mb-4 relative ring-1 ring-[#6366F1]/5 animate-float">
                <MessageSquare className="w-10 h-10 text-[#6366F1] shadow-2xl" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#6366F1] rounded-full border-4 border-[#F8F9FF] shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-[#09090B] font-display uppercase tracking-tight">Cérebro Neural Ativo</h3>
              <p className="text-sm text-[#71717A] max-w-xs leading-relaxed font-medium">
                Selecione uma conversa para visualizar a inteligência artificial operando em tempo real.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
