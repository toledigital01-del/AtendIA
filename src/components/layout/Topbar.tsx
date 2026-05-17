import { useLocation, Link } from 'react-router-dom';
import { 
  Menu, 
  Circle, 
  Search, 
  Bell, 
  User, 
  ChevronRight, 
  Zap, 
  MessageCircle,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { cn } from '../../lib/utils';
import { MOCK_COMPANY } from '../../lib/mockData';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  const getPageTitle = () => {
    const path = pathParts[0];
    switch (path) {
      case 'dashboard': return 'Dashboard';
      case 'conversations': return 'Conversas';
      case 'leads': return 'Leads';
      case 'assistant': return 'Configurar Assistente';
      case 'reports': return 'Relatórios';
      case 'billing': return 'Plano';
      case 'settings': return 'Configurações';
      default: return 'AtendIA';
    }
  };

  return (
    <header className="h-16 border-b border-[#27272A] bg-[#07090F] sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shrink-0">
      {/* Left Section: Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#71717A] uppercase tracking-[0.15em] mb-0.5">
              <span className="hover:text-[#6366F1] cursor-pointer transition-colors">SYNTRO</span>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="text-[#6366F1]/80">ATENDIA</span>
            </div>
            <h1 className="text-[17px] font-bold tracking-tight text-white flex items-center gap-2 font-display">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="h-8 w-[1px] bg-white/10 ml-2" />
          
          <div className="flex flex-col ml-2">
            <span className="text-[9px] font-bold text-[#71717A] uppercase tracking-widest">IA STATUS</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[11px] font-semibold text-white/90">Assistente Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section: Global Search */}
      <div className="hidden lg:flex flex-1 max-w-lg mx-12">
        <div className="relative w-full group">
          <div className="absolute inset-0 bg-[#6366F1]/5 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] group-focus-within:text-[#6366F1] transition-colors z-10" />
          <Input 
            placeholder="Buscar por contatos, mensagens ou agendamentos... (⌘K)" 
            className="pl-11 h-11 border-[#27272A] bg-white/[0.03] text-white focus:bg-white/5 transition-all ring-[#6366F1]/20 rounded-xl text-sm placeholder:text-[#52525B] relative z-10 border-white/5 focus:border-[#6366F1]/50 shadow-inner"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 z-10">
            <span className="text-[10px] font-bold text-[#71717A]">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right Section: Real-time Stats & User */}
      <div className="flex items-center gap-5">
        
        {/* Usage Progress */}
        <div className="hidden xl:flex flex-col gap-1.5 w-32 pr-6 border-r border-white/5">
           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
             <span className="text-[#71717A]">IA Usage</span>
             <span className="text-[#6366F1]">642/1k</span>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] w-[64%]" />
           </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-[#71717A] hover:text-white hover:bg-white/5 rounded-xl h-10 w-10">
              <Bell className="w-5 h-5" />
            </Button>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#F97316] rounded-full border-2 border-[#07090F]" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-0.5 h-auto rounded-full ring-1 ring-white/10 hover:ring-[#6366F1]/50 transition-all outline-none">
              <Avatar className="w-9 h-9 border-none">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white font-bold text-xs">JT</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#0F1123] border-[#27272A] text-white p-2 rounded-xl">
              <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-[#71717A] px-3 py-2">Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#27272A] mx-2" />
              <DropdownMenuItem className="p-2 rounded-lg cursor-pointer hover:bg-white/5 group">
                <User className="w-4 h-4 mr-2 text-[#71717A] group-hover:text-[#6366F1]" />
                <span className="text-sm font-medium">Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-lg cursor-pointer hover:bg-white/5 group">
                <Database className="w-4 h-4 mr-2 text-[#71717A] group-hover:text-[#6366F1]" />
                <span className="text-sm font-medium">Uso do Plano</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#27272A] mx-2" />
              <DropdownMenuItem className="p-2 rounded-lg cursor-pointer hover:text-red-500">
                <span className="text-sm font-medium">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
