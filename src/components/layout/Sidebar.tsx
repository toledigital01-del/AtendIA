import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Calendar, 
  Bot, 
  Plug, 
  BarChart3, 
  CreditCard, 
  Settings,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MOCK_COMPANY } from '../../lib/mockData';

interface MenuItemProps {
  item: { label: string; icon: any; href: string };
  isActive: boolean;
  onClick: () => void;
  key?: string;
}

const MenuItem = ({ item, isActive, onClick }: MenuItemProps) => {
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150",
        isActive 
          ? "bg-[#6366F1]/15 text-[#6366F1]" 
          : "text-[#71717A] hover:bg-white/5 hover:text-[#A1A1AA]"
      )}
    >
      <item.icon className={cn(
        "w-5 h-5 transition-transform duration-300",
        isActive ? "text-[#6366F1]" : "text-[#71717A] group-hover:text-[#A1A1AA]"
      )} />
      <span className="text-[14px] font-medium tracking-tight">{item.label}</span>
    </Link>
  );
};

const MENU_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Conversas', icon: MessageSquare, href: '/conversations' },
  { label: 'Leads', icon: Users, href: '/leads' },
  { label: 'Agendamentos', icon: Calendar, href: '/appointments' },
];

const CONFIG_ITEMS = [
  { label: 'Assistente', icon: Bot, href: '/assistant' },
  { label: 'Integrações', icon: Plug, href: '/integrations' },
  { label: 'Relatórios', icon: BarChart3, href: '/reports' },
];

const ACCOUNT_ITEMS = [
  { label: 'Plano', icon: CreditCard, href: '/billing' },
  { label: 'Configurações', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] bg-[#07090F] border-r border-[#27272A] flex flex-col transition-transform duration-300 transform",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "md:relative md:flex"
      )}>
        {/* Close Button Mobile */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white md:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="p-8">
          <div className="flex items-center gap-3 group cursor-pointer overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-[#6366F1] flex items-center justify-center relative">
              <Bot className="w-5 h-5 text-white relative z-10" />
            </div>
            <div>
              <span className="text-xl font-semibold tracking-tight text-white block leading-none">AtendIA</span>
              <span className="text-[10px] text-[#6366F1] font-bold uppercase tracking-[0.2em] mt-1.5 block">by SYNTRO</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
          <nav className="space-y-1">
            {MENU_ITEMS.map(item => <MenuItem key={item.href} item={item} isActive={location.pathname === item.href} onClick={onClose} />)}
          </nav>

          <div className="space-y-4">
            <h3 className="px-4 text-[10px] font-bold text-[#71717A] uppercase tracking-[0.08em]">IA Engine</h3>
            <nav className="space-y-1">
              {CONFIG_ITEMS.map(item => <MenuItem key={item.href} item={item} isActive={location.pathname === item.href} onClick={onClose} />)}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="px-4 text-[10px] font-bold text-[#71717A] uppercase tracking-[0.08em]">Sistema</h3>
            <nav className="space-y-1">
              {ACCOUNT_ITEMS.map(item => <MenuItem key={item.href} item={item} isActive={location.pathname === item.href} onClick={onClose} />)}
            </nav>
          </div>

          {/* AI Status Card */}
          <div className="px-2 mt-auto">
            <div className="bg-[#0F1123] border border-[#27272A] rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Engine Ativa</span>
                <Sparkles className="w-3 h-3 text-[#6366F1] ml-auto animate-bounce" />
              </div>
              <div className="mt-2 space-y-1.5 relative z-10">
                 <div className="flex justify-between items-center text-[9px] font-medium text-[#71717A] uppercase">
                   <span>Resolução</span>
                   <span className="text-white">94%</span>
                 </div>
                 <div className="h-1 w-full bg-[#07090F] rounded-full overflow-hidden">
                   <div className="h-full bg-[#6366F1] w-[94%]" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* User / Plan Info */}
        <div className="p-4 border-t border-[#27272A] bg-[#0F1123]">
          <div className="flex items-center gap-3 relative overflow-hidden group p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
            <Avatar className="w-9 h-9 border border-white/10 shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#6366F1] text-white font-bold text-xs">CV</AvatarFallback>
            </Avatar>
            <div className="min-w-0 pr-2">
              <p className="text-sm font-medium text-white truncate">João Toledo</p>
              <div className="flex items-center gap-1.5">
                <p className="text-[9px] text-[#A1A1AA] font-bold uppercase tracking-wider relative">
                  PRO MEMBER
                  <span className="absolute bottom-[-2px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent animate-shimmer" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
