import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  Bot, 
  MessageSquare, 
  Clock, 
  Settings as SettingsIcon,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '../components/ui/dialog';
import { MOCK_COMPANY, MOCK_FAQS } from '../lib/mockData';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export default function Assistant() {
  const [faqs, setFaqs] = useState(MOCK_FAQS);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error('Neural Input Failure: Preencha pergunta e resposta');
      return;
    }
    const addon = { ...newFaq, id: Math.random().toString(), company_id: 'comp-1', order_index: faqs.length };
    setFaqs([...faqs, addon]);
    setNewFaq({ question: '', answer: '' });
    setIsFaqModalOpen(false);
    toast.success('Sequence added: FAQ adicionada com sucesso!');
  };

  const handleRemoveFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
    toast.success('Sequence deleted: FAQ removida');
  };

  const handleSaveAll = () => {
    toast.success('Neural State Saved: Configurações sincronizadas!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-16 pb-40 pt-4"
    >
      {/* Identity Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-13 h-13 rounded-[24px] bg-gradient-to-br from-[#07090F] to-[#0F1123] flex items-center justify-center relative overflow-hidden group shadow-2xl border border-white/5 ring-1 ring-white/10">
              <div className="absolute inset-0 bg-[#6366F1]/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Bot className="w-7 h-7 text-[#6366F1] relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#09090B] flex items-center gap-3 font-display uppercase tracking-tight">
                Cortex de Identidade
                <div className="h-1.5 w-1.5 rounded-full bg-[#6366F1] animate-pulse" />
              </h2>
              <p className="text-[11px] font-bold text-[#71717A] uppercase tracking-[0.2em] mt-1.5">Personalização Neural para a Voz da sua IA</p>
            </div>
          </div>
          <Badge className="bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full">
            ESTADO ACORDADA
          </Badge>
        </div>

        <Card className="bg-white border-[#E4E4E7] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden rounded-[32px]">
          <CardContent className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-[#71717A]">Cognome do assistente</Label>
                <Input id="name" defaultValue={MOCK_COMPANY.assistant_config.name} placeholder="Ex: Sofia" className="h-12 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all font-bold text-sm rounded-xl px-5" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="tone" className="text-[11px] font-black uppercase tracking-widest text-[#71717A]">Frequência de Tom (Voz)</Label>
                <Select defaultValue={MOCK_COMPANY.assistant_config.tone}>
                  <SelectTrigger id="tone" className="h-12 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all font-bold text-sm rounded-xl px-5">
                    <SelectValue placeholder="Selecione o tom" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#E4E4E7] rounded-xl overflow-hidden p-1 shadow-2xl border-none ring-1 ring-black/5">
                    <SelectItem value="Profissional" className="rounded-lg font-bold text-xs py-2.5">EQUILIBRADO / PROFISSIONAL</SelectItem>
                    <SelectItem value="Amigável" className="rounded-lg font-bold text-xs py-2.5">EMPATIA / AMIGÁVEL</SelectItem>
                    <SelectItem value="Neutro" className="rounded-lg font-bold text-xs py-2.5">EFICIENTE / NEUTRO</SelectItem>
                    <SelectItem value="Formal" className="rounded-lg font-bold text-xs py-2.5">DISCIPLINADO / FORMAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="welcome" className="text-[11px] font-black uppercase tracking-widest text-[#71717A]">Vetor de Boas-Vindas</Label>
              <Textarea 
                id="welcome" 
                defaultValue={MOCK_COMPANY.assistant_config.welcome_message}
                placeholder="A primeira sequência gerada..."
                className="min-h-[120px] border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all font-medium text-[15px] leading-relaxed rounded-xl p-5 resize-none"
              />
            </div>
            
            <div className="pt-10 border-t border-[#F4F4F5] space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#6366F1] shadow-inner shadow-[#6366F1]/10">
                   <Clock className="w-5 h-5" />
                </div>
                <Label className="text-[11px] font-black uppercase tracking-widest text-[#09090B]">Slots de Consciência Operacional</Label>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-10">
                <div className="flex items-center gap-4 flex-1">
                  <Input type="time" defaultValue={MOCK_COMPANY.assistant_config.office_hours.start} className="h-12 border-[#E4E4E7] bg-[#F8F9FF] text-center font-black text-sm rounded-xl" />
                  <span className="text-[11px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] px-2">TO</span>
                  <Input type="time" defaultValue={MOCK_COMPANY.assistant_config.office_hours.end} className="h-12 border-[#E4E4E7] bg-[#F8F9FF] text-center font-black text-sm rounded-xl" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                    <Button 
                      key={i} 
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-11 h-11 p-0 rounded-xl text-[11px] font-black transition-all border border-transparent shadow-sm",
                        MOCK_COMPANY.assistant_config.office_hours.days.includes(i) 
                          ? "bg-[#09090B] text-white hover:bg-black hover:text-white shadow-xl shadow-black/10" 
                          : "bg-[#F8F9FF] text-[#A1A1AA] hover:bg-[#F4F4F5] border-[#E4E4E7]/50"
                      )}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Behavior Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#09090B]">Lógica & Comportamento</h2>
            <p className="text-xs text-[#71717A] font-medium">Defina as regras de decisão da IA</p>
          </div>
        </div>
        <Card className="bg-white border-[#E4E4E7] border shadow-none overflow-hidden rounded-xl">
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Qualificar leads automaticamente", desc: "IA identificará interesse e coletará dados de contato.", checked: MOCK_COMPANY.assistant_config.qualify_leads },
                { label: "Agendar no Google Calendar", desc: "IA oferecerá horários e confirmará agendamentos.", checked: MOCK_COMPANY.assistant_config.google_calendar },
                { label: "Escalar para humano", desc: "Notifica sua equipe quando a IA não souber responder.", checked: MOCK_COMPANY.assistant_config.escalate_on_unknown }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-5 rounded-xl border border-[#F4F4F5] bg-white hover:bg-[#F8F9FF] transition-all group">
                  <div className="space-y-0.5">
                    <Label className="text-[13px] font-semibold text-[#09090B] group-hover:text-[#6366F1] transition-colors">{item.label}</Label>
                    <p className="text-xs text-[#71717A] font-normal">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-[#6366F1]" />
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#F4F4F5] space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-[#09090B]">Paciência da IA (Tentativas)</Label>
                <Badge className="bg-[#EEF2FF] text-[#4338CA] border-none text-[10px] font-bold">{MOCK_COMPANY.assistant_config.max_messages_before_escalation} mensagens</Badge>
              </div>
              <div className="px-2">
                <Slider 
                  defaultValue={[MOCK_COMPANY.assistant_config.max_messages_before_escalation]} 
                  max={10} 
                  min={3} 
                  step={1} 
                />
              </div>
              <p className="text-[10px] text-[#71717A] font-bold text-center uppercase tracking-widest bg-[#F8F9FF] py-2.5 rounded-lg border border-[#F4F4F5]">A IA tentará resolver em até {MOCK_COMPANY.assistant_config.max_messages_before_escalation} interações antes de pedir ajuda humana.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#09090B]">Conhecimento Base</h2>
              <p className="text-xs text-[#71717A] font-medium">Treine sua IA com FAQs e dados</p>
            </div>
          </div>
          <Button size="sm" onClick={() => setIsFaqModalOpen(true)} className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium h-10 px-4 rounded-lg shadow-none gap-2">
            <Plus className="w-4 h-4" /> Novo FAQ
          </Button>
        </div>
        <Card className="bg-white border-[#E4E4E7] border shadow-none overflow-hidden rounded-xl">
          <CardContent className="p-0">
            <div className="divide-y divide-[#F4F4F5]">
              {faqs.map((faq) => (
                <div key={faq.id} className="flex items-start gap-4 p-6 group hover:bg-[#F8F9FF] transition-all">
                  <div className="mt-1 cursor-grab opacity-20 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-[#71717A]" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[14px] font-semibold text-[#09090B] group-hover:text-[#6366F1] transition-colors">{faq.question}</p>
                    <p className="text-[13px] text-[#71717A] font-normal leading-relaxed line-clamp-2">{faq.answer}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveFaq(faq.id)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-all h-8 w-8 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-[#F4F4F5] z-30 md:left-[260px]">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button size="lg" onClick={handleSaveAll} className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 h-12 rounded-lg shadow-none transition-all gap-2 text-sm">
            <Save className="w-4 h-4" /> Salvar Alterações
          </Button>
        </div>
      </div>

      <Dialog open={isFaqModalOpen} onOpenChange={setIsFaqModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar nova FAQ</DialogTitle>
            <DialogDescription>
              Cadastre perguntas comuns para treinar sua inteligência artificial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="q">Pergunta</Label>
              <Input 
                id="q" 
                placeholder="Ex: Qual o horário de funcionamento?" 
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="a">Resposta</Label>
              <Textarea 
                id="a" 
                placeholder="Sua resposta detalhada aqui..." 
                className="min-h-[120px]"
                value={newFaq.answer}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFaqModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddFaq}>Adicionar FAQ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
