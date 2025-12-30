
import { GoogleGenAI } from "@google/genai";
import { Property, Client } from "../types";

/**
 * Generates highly tailored and persuasive property recommendations.
 * Uses advanced sales psychology and deep context analysis to provide 
 * both strategic rationale for the realtor and ready-to-use client scripts.
 */
export const getAIRecommendations = async (client: Client, properties: Property[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Enrich interaction summary with better context
  const interactionSummary = client.interactions.length > 0 
    ? client.interactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Most recent first
        .map(i => `[${i.date}] Tipo: ${i.type} | Nota: ${i.notes}${i.propertyId ? ` | Ref Imóvel: ${i.propertyId}` : ''}`)
        .join('\n')
    : "Este é um lead novo, sem interações prévias registradas.";

  const prompt = `
    VOCÊ É: Um Master Coach em Vendas Imobiliárias de Luxo e Estrategista de CRM.
    OBJETIVO: Analisar o DNA do lead "${client.name}" e selecionar os 2 "Perfect Matches" do catálogo que possuem maior probabilidade de conversão.

    --- PERFIL PSICOGRÁFICO DO CLIENTE ---
    - Preferências Declaradas: ${client.preferences.type.join(', ')} na região de ${client.preferences.location}.
    - Range Financeiro: R$ ${client.preferences.minPrice.toLocaleString('pt-BR')} a R$ ${client.preferences.maxPrice.toLocaleString('pt-BR')}.
    - Comportamento de Compra (Histórico):
    ${interactionSummary}

    --- INVENTÁRIO DISPONÍVEL ---
    ${JSON.stringify(properties.map(p => ({
      id: p.id,
      titulo: p.title,
      valor: `R$ ${p.price.toLocaleString('pt-BR')}`,
      area: `${p.area}m²`,
      config: `${p.rooms}Q/${p.bathrooms}B/${p.parkingSpots}V`,
      descricao: p.description,
      endereco: p.address
    })))}

    --- SUA TAREFA EM 3 ETAPAS ---

    1. ANÁLISE ESTRATÉGICA (Para o Corretor):
       - Identifique o "Padrão de Busca": O que este cliente realmente valoriza (ex: status, praticidade, lazer, silêncio)?
       - Justificativa do Match: Por que estes 2 imóveis superam o que ele já viu? Conecte com dores ou desejos expressos no histórico.
       - Gestão de Objeções: Preveja uma possível dúvida do cliente sobre cada imóvel e dê a resposta matadora.

    2. SCRIPTS DE ABORDAGEM (Prontos para WhatsApp):
       - Crie uma mensagem única para cada recomendação.
       - Use o NOME do cliente. 
       - Técnica: "Ponte de Valor" (Característica -> Benefício -> Sentimento).
       - Gatilhos: Curadoria exclusiva, oportunidade de mercado ou "vibe" do imóvel.
       - CTA (Call to Action): Termine com uma pergunta aberta que incentive a resposta.

    3. CHECKLIST DE VISITA:
       - 2 pontos específicos em que o corretor deve dar ênfase durante a visita física para encantar este cliente específico.

    --- FORMATO DA RESPOSTA ---
    Use Markdown elegante. Utilize negrito para enfatizar gatilhos mentais. 
    Divida claramente as seções com títulos como:
    ### 🎯 Inteligência de Vendas: ${client.name}
    ### 📱 Script: [Nome do Imóvel]
    ### 🛡️ Tratamento de Objeções

    Responda estritamente em Português do Brasil com tom persuasivo, profissional e empático.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.75, // Balance between creative sales copy and logical matching
        topP: 0.95,
      }
    });

    return response.text || "Desculpe, não conseguimos processar o perfil do cliente no momento.";
  } catch (error) {
    console.error("Gemini AI Strategy Error:", error);
    return "Erro de conexão com o cérebro da IA. Por favor, tente novamente em alguns segundos.";
  }
};
