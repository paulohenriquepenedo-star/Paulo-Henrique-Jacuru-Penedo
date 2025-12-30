
import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';

const Plans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Gratuito',
      price: '0',
      description: 'Ideal para quem está começando agora.',
      features: [
        'Até 5 imóveis',
        '10 leads/clientes',
        'Dashboard básico',
        'Suporte por e-mail'
      ],
      cta: 'Plano Atual',
      current: true,
      popular: false
    },
    {
      name: 'Profissional',
      price: isAnnual ? '79' : '99',
      description: 'O melhor custo-benefício para corretores ativos.',
      features: [
        'Até 50 imóveis',
        'Leads ilimitados',
        'Recomendações por IA',
        'Agenda e Propostas',
        'Suporte prioritário'
      ],
      cta: 'Começar Agora',
      current: false,
      popular: true
    },
    {
      name: 'Premium',
      price: isAnnual ? '159' : '199',
      description: 'Poder total para imobiliárias e top performers.',
      features: [
        'Imóveis ilimitados',
        'IA Avançada (V2)',
        'Integração WhatsApp Web',
        'Marca Personalizada',
        'Relatórios de Performance',
        'Gerente de conta'
      ],
      cta: 'Falar com Consultor',
      current: false,
      popular: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Escale seu sucesso imobiliário</h2>
        <p className="text-slate-500 max-w-lg mx-auto">Escolha o plano que melhor se adapta ao tamanho da sua carteira e comece a vender mais com inteligência.</p>
        
        {/* Toggle Mensal/Anual */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Mensal</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-slate-200 rounded-full relative transition-colors duration-300 focus:outline-none"
          >
            <div className={`absolute top-1 left-1 w-5 h-5 bg-emerald-600 rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-7' : ''}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
            Anual <span className="text-emerald-600 font-bold ml-1">(-20%)</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
              plan.popular 
                ? 'bg-white border-emerald-500 shadow-2xl scale-105 z-10' 
                : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                <SparklesIcon className="w-3 h-3" />
                Mais Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">R$ {plan.price}</span>
                <span className="text-slate-400 text-sm">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="mt-0.5 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckIcon className="w-3 h-3 text-emerald-600" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                plan.current 
                  ? 'bg-slate-100 text-slate-400 cursor-default' 
                  : plan.popular
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-1 shadow-md'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="text-xl font-bold">Precisa de um plano para sua equipe?</h4>
          <p className="text-slate-400 text-sm mt-2">Oferecemos condições especiais para imobiliárias com mais de 10 corretores.</p>
        </div>
        <button className="relative z-10 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors whitespace-nowrap">
          Contatar Vendas
        </button>
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20 -mr-20 -mb-20"></div>
      </div>
    </div>
  );
};

export default Plans;
