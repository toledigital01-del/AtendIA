import { useState } from 'react';
import { 
  Building2, 
  Bot, 
  PhoneCall, 
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 4) {
      toast.success('Configuração finalizada! Bem-vindo ao AtendIA.');
      navigate('/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 mb-12">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-semibold tracking-tight text-[#07090F]">AtendIA</span>
          <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider relative top-1">Onboarding</span>
        </div>
        <p className="text-[#A1A1AA] text-sm font-medium mt-1">Configure sua plataforma em menos de 5 minutos</p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-2xl mb-12 space-y-6">
        <div className="flex justify-between items-center px-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2 relative z-10">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2",
                step === s ? "bg-[#6366F1] text-white border-[#6366F1] scale-110 shadow-none" : 
                step > s ? "bg-[#22C55E] text-white border-[#22C55E]" : "bg-white border-[#E4E4E7] text-[#A1A1AA]"
              )}>
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                step === s ? "text-[#6366F1]" : "text-[#A1A1AA]"
              )}>
                {s === 1 ? 'Empresa' : s === 2 ? 'IA' : s === 3 ? 'Conexão' : 'Setup'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 w-full bg-[#E4E4E7] rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-[#6366F1] transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps Content */}
      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {step === 1 && (
          <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-2">
                <Building2 className="w-5 h-5 text-[#6366F1]" />
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight text-[#09090B]">Dados da sua empresa</CardTitle>
              <CardDescription className="text-sm font-medium text-[#71717A]">Comece nos contando o básico sobre o seu negócio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-8 pb-8">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Nome fantasia</Label>
                <Input placeholder="Ex: Clínica Vida Plena" className="h-10 border-[#E4E4E7] rounded-lg focus:ring-1 focus:ring-[#6366F1]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Segmento</Label>
                  <Select>
                    <SelectTrigger className="h-10 border-[#E4E4E7] rounded-lg">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E4E4E7]">
                      <SelectItem value="health">Saúde / Clínica</SelectItem>
                      <SelectItem value="retail">Varejo / Loja</SelectItem>
                      <SelectItem value="service">Serviços</SelectItem>
                      <SelectItem value="food">Alimentação</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Telefone comercial</Label>
                  <Input placeholder="+55 (11) 99999-9999" className="h-10 border-[#E4E4E7] rounded-lg focus:ring-1 focus:ring-[#6366F1]" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-2">
                <Bot className="w-5 h-5 text-[#6366F1]" />
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight text-[#09090B]">Personalidade da IA</CardTitle>
              <CardDescription className="text-sm font-medium text-[#71717A]">Como você quer que seu assistente se apresente?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Nome do Assistente</Label>
                  <Input placeholder="Ex: Sofia, Lucas..." className="h-10 border-[#E4E4E7] rounded-lg focus:ring-1 focus:ring-[#6366F1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Tom de voz</Label>
                  <Select>
                    <SelectTrigger className="h-10 border-[#E4E4E7] rounded-lg">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E4E4E7]">
                      <SelectItem value="prof">Profissional / Sério</SelectItem>
                      <SelectItem value="friendly">Amigável / Descontraído</SelectItem>
                      <SelectItem value="neutral">Neutro / Objetivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Objetivo principal</Label>
                <Select>
                  <SelectTrigger className="h-10 border-[#E4E4E7] rounded-lg">
                    <SelectValue placeholder="O que a IA deve priorizar?" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#E4E4E7]">
                    <SelectItem value="sales">Vendas e Orçamentos</SelectItem>
                    <SelectItem value="support">Suporte e Dúvidas</SelectItem>
                    <SelectItem value="booking">Agendamento de Consultas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-2">
                <PhoneCall className="w-5 h-5 text-[#6366F1]" />
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight text-[#09090B]">Conectar WhatsApp</CardTitle>
              <CardDescription className="text-sm font-medium text-[#71717A]">Utilize a Meta Cloud API oficial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              <div className="p-4 bg-[#F8F9FF] rounded-lg border border-[#E4E4E7] flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#6366F1] border border-[#E4E4E7]">1</div>
                <div className="text-xs font-medium text-[#3F3F46]">Obtenha seu <b>Phone Number ID</b> no portal Meta Developers.</div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Phone Number ID</Label>
                  <Input placeholder="Ex: 108239084723908" className="h-10 border-[#E4E4E7] rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Access Token</Label>
                  <Input type="password" placeholder="EAAW..." className="h-10 border-[#E4E4E7] rounded-lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl overflow-hidden">
            <CardHeader className="px-8 pt-8 pb-4">
              <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight text-[#09090B]">Base de Conhecimento</CardTitle>
              <CardDescription className="text-sm font-medium text-[#71717A]">Cadastre as dúvidas mais comuns para começar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-8 pb-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3 p-5 border border-[#F4F4F5] rounded-xl bg-[#F8F9FF]">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-[#71717A] tracking-wider">Pergunta {i}</Label>
                    <Input placeholder="Dúvida comum..." className="h-10 bg-white border-[#E4E4E7] rounded-lg text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-[#71717A] tracking-wider">Resposta da IA</Label>
                    <Input placeholder="Resposta ideal..." className="h-10 bg-white border-[#E4E4E7] rounded-lg text-sm" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
            className="text-[#71717A] h-10 px-6 font-semibold rounded-lg hover:bg-[#F4F4F5]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <Button 
            onClick={handleNext} 
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white h-10 px-8 font-semibold rounded-lg shadow-none flex items-center gap-2"
          >
            {step === 4 ? 'Concluir' : 'Próximo'} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
