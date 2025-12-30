
import React, { useState } from 'react';
import { 
  PlusIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MapPinIcon, 
  ClockIcon,
  UserIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { MOCK_APPOINTMENTS, MOCK_CLIENTS, MOCK_PROPERTIES } from '../constants';
import { Appointment, AppointmentType, AppointmentStatus } from '../types';

const Agenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  const dateStr = selectedDate.toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => a.date === dateStr).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getTypeColor = (type: AppointmentType) => {
    switch (type) {
      case AppointmentType.VISIT: return 'bg-emerald-500';
      case AppointmentType.MEETING: return 'bg-blue-500';
      case AppointmentType.CALL: return 'bg-amber-500';
      case AppointmentType.CONTRACT: return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED: return 'text-emerald-600 bg-emerald-50';
      case AppointmentStatus.SCHEDULED: return 'text-blue-600 bg-blue-50';
      case AppointmentStatus.CANCELLED: return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Calendar Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-slate-400" />
          </button>
          <div className="text-center min-w-[120px]">
            <h3 className="font-bold text-slate-800">
              {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
            </h3>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' })}
            </p>
          </div>
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white p-3 rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* AI Suggestion Bar */}
      <div className="bg-emerald-900 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <SparklesIcon className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Smart Planner</p>
            <p className="text-sm">Você tem 3 horários livres ideais para follow-up.</p>
          </div>
        </div>
        <button className="bg-white text-emerald-900 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors relative z-10">
          Otimizar Dia
        </button>
        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-800 rounded-full blur-3xl opacity-40 -mr-10 -mt-10"></div>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">
        {todaysAppointments.length > 0 ? (
          todaysAppointments.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4 transition-all hover:shadow-md">
              <div className="flex flex-col items-center justify-center border-r border-slate-50 pr-4 min-w-[60px]">
                <span className="text-sm font-bold text-slate-800">{app.startTime}</span>
                <span className="text-[10px] text-slate-400 font-medium">{app.endTime}</span>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${getTypeColor(app.type)}`}></span>
                      <h4 className="text-sm font-bold text-slate-800 leading-none">{app.title}</h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  {app.priority === 'high' && (
                    <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100 font-bold uppercase">Urgente</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <UserIcon className="w-4 h-4 text-slate-300" />
                    {MOCK_CLIENTS.find(c => c.id === app.clientId)?.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPinIcon className="w-4 h-4 text-slate-300" />
                    <span className="line-clamp-1">{app.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-slate-50 text-slate-600 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-100 transition-colors">
                    Detalhes
                  </button>
                  <button className="flex-1 bg-emerald-50 text-emerald-600 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-100 transition-colors">
                    Confirmar via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
            <ClockIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h4 className="text-slate-400 font-medium">Nenhum compromisso para este dia</h4>
            <p className="text-slate-300 text-xs mt-1">Aproveite para prospectar novos leads!</p>
          </div>
        )}
      </div>

      {/* New Event Modal (Simplified for demo) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Novo Compromisso</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full">
                <XMarkIcon className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Título do Evento</label>
                <input type="text" placeholder="Ex: Visita no Apto Jardins" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Data</label>
                  <input type="date" className="w-full p-3 rounded-xl border border-slate-200 outline-none text-sm" defaultValue={dateStr} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Horário</label>
                  <input type="time" className="w-full p-3 rounded-xl border border-slate-200 outline-none text-sm" defaultValue="14:00" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Cliente</label>
                <select className="w-full p-3 rounded-xl border border-slate-200 outline-none text-sm appearance-none bg-white">
                  {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo de Evento</label>
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {Object.values(AppointmentType).map(type => (
                    <button key={type} type="button" className="px-4 py-2 rounded-full border border-slate-200 text-xs whitespace-nowrap hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                  Criar Evento e Notificar Cliente
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-4 px-8">
                  * Ao criar o evento, enviaremos automaticamente um e-mail de confirmação para o cliente vinculado.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
