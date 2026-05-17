import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { toast } from 'sonner';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-1 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-semibold tracking-tight text-[#07090F]">AtendIA</span>
          <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider relative top-1">by SYNTRO</span>
        </div>
      </div>

      <Card className="w-full max-w-[400px] border-[#E4E4E7] border shadow-none bg-white rounded-xl overflow-hidden">
        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-2xl font-semibold tracking-tight text-[#09090B]">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-sm font-medium text-[#71717A]">Acesse o painel da sua clínica ou empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-[#71717A] uppercase tracking-wider">E-mail</Label>
              <Input id="email" type="email" placeholder="nome@empresa.com" required className="h-10 border-[#E4E4E7] rounded-lg focus:ring-1 focus:ring-[#6366F1]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-bold text-[#71717A] uppercase tracking-wider">Senha</Label>
                <Link to="#" className="text-xs font-semibold text-[#6366F1] hover:text-[#4F46E5]">Esqueceu?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required className="h-10 border-[#E4E4E7] rounded-lg focus:ring-1 focus:ring-[#6366F1]" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-10 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm shadow-none rounded-lg mt-2">
              {loading ? 'Acessando...' : 'Entrar no sistema'}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#F4F4F5]"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-3 text-[#A1A1AA] font-bold tracking-widest">Ou continue com</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-10 border-[#E4E4E7] font-semibold text-sm gap-2 flex items-center justify-center rounded-lg hover:bg-[#F8F9FF]">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale opacity-70" referrerPolicy="no-referrer" />
            Entrar com Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-[#F4F4F5] bg-[#F8F9FF]/50 py-5">
          <p className="text-sm text-[#71717A] font-medium">
            Não tem uma conta? <Link to="/register" className="text-[#6366F1] font-bold hover:text-[#4F46E5] ml-1">Criar conta</Link>
          </p>
        </CardFooter>
      </Card>
      
      <p className="ml-8 mt-12 text-[10px] text-[#A1A1AA] font-bold uppercase tracking-[0.2em] opacity-80">© 2026 ATENDIA · SYNTRO ECOSYSTEM</p>
    </div>
  );
}
