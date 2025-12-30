
import React from 'react';
import { 
  UsersIcon, 
  BuildingOfficeIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Leads Ativos" value="24" icon={<UsersIcon className="w-5 h-5" />} color="bg-blue-500" />
        <StatCard label="Imóveis" value="156" icon={<BuildingOfficeIcon className="w-5 h-5" />} color="bg-emerald-500" />
        <StatCard label="Visitas" value="8" icon={<CalendarDaysIcon className="w-5 h-5" />} color="bg-purple-500" />
        <StatCard label="Vendas/Mês" value="R$ 4.2M" icon={<CurrencyDollarIcon className="w-5 h-5" />} color="bg-amber-500" />
      </div>

      <div className="bg-emerald-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Recomendações com IA</h2>
          <p className="text-emerald-100 mb-4 text-sm max-w-md">
            Identificamos 3 novos matches entre seus leads e a carteira de imóveis recente.
          </p>
          <button className="bg-white text-emerald-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2">
            Ver Matches
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Atividades Recentes</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
          <ActivityItem 
            title="Visita Agendada" 
            subtitle="João Silva no Apto Jardins" 
            time="Hoje, 14:30" 
            type="calendar" 
          />
          <ActivityItem 
            title="Novo Lead" 
            subtitle="Ricardo Santos via WhatsApp" 
            time="Há 2 horas" 
            type="lead" 
          />
          <ActivityItem 
            title="Imóvel Atualizado" 
            subtitle="Cobertura Pinheiros teve preço alterado" 
            time="Há 5 horas" 
            type="update" 
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
    <div className={`${color} text-white w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>
      {icon}
    </div>
    <p className="text-xs text-slate-500 font-medium">{label}</p>
    <p className="text-lg font-bold text-slate-800">{value}</p>
  </div>
);

const ActivityItem = ({ title, subtitle, time, type }: any) => (
  <div className="p-4 flex gap-4 items-center">
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
    <p className="text-[10px] text-slate-400 font-medium italic whitespace-nowrap">{time}</p>
  </div>
);

export default Dashboard;
