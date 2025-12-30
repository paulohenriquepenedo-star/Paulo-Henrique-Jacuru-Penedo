
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  CreditCardIcon, 
  ShieldCheckIcon, 
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 ring-4 ring-emerald-50">
          <UserIcon className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Ricardo Rodrigues</h2>
        <p className="text-slate-500 text-sm">Corretor Senior - CRECI 12345-F</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-emerald-700 text-xs font-bold uppercase tracking-tight">Plano Gratuito</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
        <ProfileMenuItem 
          icon={<CreditCardIcon />} 
          label="Assinatura e Planos" 
          onClick={() => navigate('/plans')}
          badge="Mudar Plano"
        />
        <ProfileMenuItem icon={<BellIcon />} label="Notificações" />
        <ProfileMenuItem icon={<ShieldCheckIcon />} label="Segurança e LGPD" />
        <ProfileMenuItem 
          icon={<ArrowRightOnRectangleIcon className="text-red-500" />} 
          label="Sair da Conta" 
          isLast 
        />
      </div>

      <div className="p-4 bg-emerald-900 rounded-2xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Oferta Limitada</p>
          <h4 className="text-sm font-bold mt-1">Upgrade para o Profissional</h4>
          <p className="text-xs text-emerald-100 mt-1">Desbloqueie IA ilimitada por apenas R$ 79/mês.</p>
          <button 
            onClick={() => navigate('/plans')}
            className="mt-3 bg-white text-emerald-900 text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Aproveitar Agora
          </button>
        </div>
        <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-800 rounded-full blur-2xl opacity-50 -mr-8 -mt-8"></div>
      </div>

      <div className="p-4 bg-slate-100 rounded-xl">
        <p className="text-[10px] text-slate-400 text-center font-medium">
          Corretor360 v1.1.0 - Criado para performance e inteligência.
        </p>
      </div>
    </div>
  );
};

const ProfileMenuItem = ({ icon, label, isLast, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group text-left"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 text-slate-400 group-hover:text-emerald-600 transition-colors">
        {/* Added explicit type casting for icon element to allow className prop injection via cloneElement and avoid TS error */}
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
      </div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">
          {badge}
        </span>
      )}
      <ChevronRightIcon className="w-4 h-4 text-slate-300" />
    </div>
  </button>
);

export default Profile;
