
import React, { useState } from 'react';
import { MOCK_CLIENTS, MOCK_PROPERTIES } from '../constants';
import { Client } from '../types';
import { 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { getAIRecommendations } from '../services/gemini';

const Leads: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Client | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAskAI = async (client: Client) => {
    setLoadingAI(true);
    setIsAIModalOpen(true);
    const response = await getAIRecommendations(client, MOCK_PROPERTIES);
    setAiResponse(response);
    setLoadingAI(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Meus Leads</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-emerald-700">
          + Novo Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_CLIENTS.map(client => (
          <div key={client.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-lg uppercase">
                  {client.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{client.name}</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Potencial comprador</p>
                </div>
              </div>
              <button 
                onClick={() => handleAskAI(client)}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-100 shadow-sm"
                title="Sugerir Imóveis com IA"
              >
                <SparklesIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 py-3 border-y border-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <EnvelopeIcon className="w-4 h-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <PhoneIcon className="w-4 h-4" />
                {client.phone}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-slate-200">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                WhatsApp
              </button>
              <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-slate-200">
                Histórico
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold">Matchmaker IA Inteligente</h3>
              </div>
              <button onClick={() => setIsAIModalOpen(false)} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto no-scrollbar flex-1 bg-slate-50">
              {loadingAI ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 text-sm font-medium animate-pulse">Analisando preferências e cruzando dados...</p>
                </div>
              ) : (
                <div className="prose prose-emerald max-w-none">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">
                    {aiResponse}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors">
                      Copiar para WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
