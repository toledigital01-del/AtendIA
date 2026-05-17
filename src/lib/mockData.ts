import { Company, Conversation, FAQ, Lead, Message } from "../types";
import { subDays, subHours, subMinutes } from "date-fns";

export const MOCK_COMPANY: Company = {
  id: "comp-1",
  name: "Clínica Vida Plena",
  segment: "Clínica Médica",
  plan: "pro",
  whatsapp_number: "+5511999999999",
  assistant_config: {
    name: "Sofia",
    tone: "Profissional",
    welcome_message: "Olá! Sou a Sofia, assistente virtual da Clínica Vida Plena. Como posso ajudar você hoje?",
    office_hours: {
      start: "08:00",
      end: "18:00",
      days: [1, 2, 3, 4, 5]
    },
    qualify_leads: true,
    google_calendar: true,
    escalate_on_unknown: true,
    max_messages_before_escalation: 5
  },
  is_active: true,
  created_at: subDays(new Date(), 30).toISOString(),
};

export const MOCK_FAQS: FAQ[] = [
  { id: "faq-1", company_id: "comp-1", question: "Quais especialidades vocês atendem?", answer: "Atendemos cardiologia, pediatria, ginecologia e clínica geral.", order_index: 0 },
  { id: "faq-2", company_id: "comp-1", question: "Vocês aceitam convênios?", answer: "Sim, aceitamos Unimed, SulAmérica, Bradesco e Amil.", order_index: 1 },
  { id: "faq-3", company_id: "comp-1", question: "Qual o horário de funcionamento?", answer: "Funcionamos de segunda a sexta, das 08:00 às 18:00.", order_index: 2 },
  { id: "faq-4", company_id: "comp-1", question: "Onde vocês estão localizados?", answer: "Estamos na Rua das Flores, 123, Centro.", order_index: 3 },
  { id: "faq-5", company_id: "comp-1", question: "Como agendar uma consulta?", answer: "Você pode agendar diretamente por aqui ou pelo nosso site.", order_index: 4 },
];

export const MOCK_CONVERSATIONS: Conversation[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `conv-${i}`,
  company_id: "comp-1",
  contact_phone: `+551198888777${i}`,
  contact_name: ["João Silva", "Maria Oliveira", "Carlos Souza", "Ana Costa", "Beatriz Lima"][i % 5] + (i > 4 ? ` ${i}` : ""),
  status: i % 3 === 0 ? "resolved" : i % 3 === 1 ? "active" : "escalated",
  is_qualified_lead: i % 2 === 0,
  started_at: subHours(new Date(), i * 2).toISOString(),
  updated_at: subMinutes(new Date(), i * 10).toISOString(),
  last_message_preview: i % 2 === 0 ? "Gostaria de agendar para amanhã." : "Obrigado pelas informações!",
}));

export const MOCK_LEADS: Lead[] = MOCK_CONVERSATIONS.filter(c => c.is_qualified_lead).map((c, i) => ({
  id: `lead-${i}`,
  company_id: "comp-1",
  conversation_id: c.id,
  contact_phone: c.contact_phone,
  contact_name: c.contact_name,
  detected_interest: ["Consulta Cardiológica", "Exame de Rotina", "Pediatria", "Ginecologia"][i % 4],
  qualified_at: c.started_at,
}));

export const MOCK_MESSAGES: Message[] = [
  // Conversation 0
  { id: "msg-1", conversation_id: "conv-0", role: "assistant", content: "Olá! Sou a Sofia da Clínica Vida Plena. Como posso ajudar você hoje?", tokens_used: 25, sent_at: subMinutes(new Date(), 45).toISOString() },
  { id: "msg-2", conversation_id: "conv-0", role: "user", content: "Olá Sofia, gostaria de saber quais as especialidades vocês atendem.", tokens_used: 0, sent_at: subMinutes(new Date(), 40).toISOString() },
  { id: "msg-3", conversation_id: "conv-0", role: "assistant", content: "Atendemos cardiologia, pediatria, ginecologia e clínica geral. Alguma dessas te interessa?", tokens_used: 30, sent_at: subMinutes(new Date(), 38).toISOString() },
  { id: "msg-4", conversation_id: "conv-0", role: "user", content: "Sim, cardiologia. Vocês aceitam Unimed?", tokens_used: 0, sent_at: subMinutes(new Date(), 35).toISOString() },
  { id: "msg-5", conversation_id: "conv-0", role: "assistant", content: "Aceitamos sim! Unimed, SulAmérica e Bradesco. Gostaria de agendar uma consulta?", tokens_used: 35, sent_at: subMinutes(new Date(), 30).toISOString() },
  { id: "msg-6", conversation_id: "conv-0", role: "user", content: "Gostaria de agendar para amanhã.", tokens_used: 0, sent_at: subMinutes(new Date(), 25).toISOString() },
  
  // Conversation 1
  { id: "msg-10", conversation_id: "conv-1", role: "assistant", content: "Olá! Em que posso ajudar?", tokens_used: 15, sent_at: subHours(new Date(), 1).toISOString() },
  { id: "msg-11", conversation_id: "conv-1", role: "user", content: "Qual o endereço da clínica?", tokens_used: 0, sent_at: subMinutes(new Date(), 55).toISOString() },
  { id: "msg-12", conversation_id: "conv-1", role: "assistant", content: "Estamos na Rua das Flores, 123, Centro. Precisa de mais alguma informação?", tokens_used: 20, sent_at: subMinutes(new Date(), 50).toISOString() },
  { id: "msg-13", conversation_id: "conv-1", role: "user", content: "Obrigado pelas informações!", tokens_used: 0, sent_at: subMinutes(new Date(), 45).toISOString() },

  // Conversation 2
  { id: "msg-20", conversation_id: "conv-2", role: "assistant", content: "Bem-vindo à Clínica Vida Plena! Como posso ser útil?", tokens_used: 20, sent_at: subHours(new Date(), 2).toISOString() },
  { id: "msg-21", conversation_id: "conv-2", role: "user", content: "Oi, vocês atendem ginecologia?", tokens_used: 0, sent_at: subHours(new Date(), 1).toISOString() },
  { id: "msg-22", conversation_id: "conv-2", role: "assistant", content: "Sim, atendemos! Temos excelentes profissionais nessa área. Gostaria de ver os horários?", tokens_used: 25, sent_at: subMinutes(new Date(), 15).toISOString() },
];
