import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Lock, 
  Phone, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle2,
  LogOut,
  Download,
  FileJson,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Configurações atualizadas!');
    }, 1000);
  };

  const handleExportData = () => {
    setIsExporting(true);
    toast.info("Processando seu pacote de dados...", { duration: 3000 });

    setTimeout(() => {
      const content = "BACKUP COMPLETO SYNTRO / AtendIA\n" + 
                     "================================\n\n" + 
                     "Conta: Clínica Vida Plena\n" +
                     "Data: " + new Date().toLocaleString() + "\n\n" +
                     "Este arquivo contém o snapshot neural do seu assistente e histórico de configurações.";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syntro-backup-${new Date().getTime()}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      toast.success("Dados prontos!", {
        description: "O backup da sua conta foi baixado com sucesso.",
      });
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12 pb-20 pt-4"
    >
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#07090F] to-[#0F1123] flex items-center justify-center border border-white/5 shadow-xl">
              <Building2 className="w-5 h-5 text-[#6366F1]" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#09090B] font-display uppercase tracking-tight">DNA Corporativo</h2>
              <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mt-1">Dados fundamentais da sua conta</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportData}
            disabled={isExporting}
            className="text-[11px] font-black text-[#6366F1] uppercase flex items-center gap-2 hover:bg-[#EEF2FF] border-[#E4E4E7] h-10 px-5 rounded-xl shadow-sm"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {isExporting ? 'Processando...' : 'Neural Backup'}
          </Button>
        </div>
        <Card className="bg-white border-[#E4E4E7] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <Label htmlFor="biz-name" className="text-[10px] font-black uppercase tracking-widest text-[#71717A]">Razão Social / Nome</Label>
                <Input id="biz-name" defaultValue="Clínica Vida Plena" className="h-12 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all rounded-xl font-bold text-[13px] px-4" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="biz-cnpj" className="text-[10px] font-black uppercase tracking-widest text-[#71717A]">Documento Fiscal</Label>
                <Input id="biz-cnpj" defaultValue="12.345.678/0001-90" className="h-12 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all rounded-xl font-bold text-[13px] px-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <Label htmlFor="biz-email" className="text-[10px] font-black uppercase tracking-widest text-[#71717A]">Email de Contato</Label>
                <Input id="biz-email" defaultValue="contato@vidaplena.com.br" className="h-12 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all rounded-xl font-bold text-[13px] px-4" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="biz-phone" className="text-[10px] font-black uppercase tracking-widest text-[#71717A]">Canal de Suporte</Label>
                <Input id="biz-phone" defaultValue="+55 (11) 98877-6655" className="h-12 border-[#E4E4E7] bg-[#F8F9FF] focus:bg-white transition-all rounded-xl font-bold text-[13px] px-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#6366F1]" />
          <h2 className="text-lg font-semibold tracking-tight text-[#09090B]">Conexão WhatsApp</h2>
        </div>
        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <Phone className="w-7 h-7 text-[#22C55E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg text-[#09090B]">+55 (11) 99999-9999</p>
                    <Badge className="bg-[#DCFCE7] text-[#166534] border-none text-[10px] font-bold px-2 py-0">Conectado</Badge>
                  </div>
                  <p className="text-xs text-[#71717A] font-medium">Cloud API v19.0</p>
                </div>
              </div>
              <Button variant="ghost" className="text-red-500 hover:bg-red-50 font-semibold text-sm rounded-lg px-4 border border-red-100">
                Desconectar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#6366F1]" />
          <h2 className="text-lg font-semibold tracking-tight text-[#09090B]">Segurança</h2>
        </div>
        <Card className="bg-white border-[#E4E4E7] border shadow-none rounded-xl">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-pass" className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Nova Senha</Label>
              <Input id="new-pass" type="password" placeholder="••••••••" className="h-10 border-[#E4E4E7] focus:ring-1 focus:ring-[#6366F1] rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pass" className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Confirmar Nova Senha</Label>
              <Input id="confirm-pass" type="password" placeholder="••••••••" className="h-10 border-[#E4E4E7] focus:ring-1 focus:ring-[#6366F1] rounded-lg" />
            </div>
            <Button onClick={handleUpdate} disabled={loading} className="w-full bg-[#07090F] hover:bg-[#18181B] text-white font-semibold h-10 rounded-lg text-sm shadow-none">
              Alterar senha
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold tracking-tight text-red-500">Zona de Perigo</h2>
        </div>
        <Card className="border-red-200 bg-red-50/30 shadow-none rounded-xl overflow-hidden">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm text-[#09090B]">Pausar todas as IAs</p>
              <p className="text-xs text-[#71717A] font-medium">Seu assistente deixará de responder imediatamente.</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs font-semibold rounded-lg bg-white h-9 px-4">Pausar agora</Button>
          </CardContent>
          <div className="h-px bg-red-100" />
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm text-red-600">Excluir conta definitivamente</p>
              <p className="text-xs text-[#71717A] font-medium">Todos os dados, conversas e leads serão removidos permanentemente.</p>
            </div>
            <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-xs font-semibold rounded-lg h-9 px-4 shadow-none">Excluir conta</Button>
          </CardContent>
        </Card>
      </section>

      <div className="pt-8 border-t border-[#F4F4F5] flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="ghost" className="text-[#71717A] font-medium text-sm gap-2 hover:bg-[#F4F4F5] h-10 rounded-lg px-4">
          <LogOut className="w-4 h-4" /> Sair da conta
        </Button>
        <Button onClick={handleUpdate} disabled={loading} className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-8 h-10 rounded-lg text-sm shadow-none">
          Salvar todas as alterações
        </Button>
      </div>
    </motion.div>
  );
}
