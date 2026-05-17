export type Plan = 'basic' | 'pro' | 'agency';
export type Role = 'owner' | 'operator' | 'viewer';
export type Tone = 'Profissional' | 'Amigável' | 'Neutro' | 'Formal';
export type ConversationStatus = 'active' | 'resolved' | 'escalated';
export type MessageRole = 'user' | 'assistant' | 'human';

export interface Company {
  id: string;
  name: string;
  segment: string;
  plan: Plan;
  stripe_customer_id?: string;
  whatsapp_number?: string;
  whatsapp_token?: string;
  assistant_config: {
    name: string;
    tone: Tone;
    welcome_message: string;
    office_hours: {
      start: string;
      end: string;
      days: number[]; // 0-6
    };
    qualify_leads: boolean;
    google_calendar: boolean;
    escalate_on_unknown: boolean;
    max_messages_before_escalation: number;
  };
  is_active: boolean;
  created_at: string;
}

export interface User {
  id: string;
  company_id: string;
  role: Role;
  email: string;
}

export interface Conversation {
  id: string;
  company_id: string;
  contact_phone: string;
  contact_name: string;
  status: ConversationStatus;
  is_qualified_lead: boolean;
  started_at: string;
  updated_at: string;
  last_message_preview?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  tokens_used: number;
  sent_at: string;
}

export interface Lead {
  id: string;
  company_id: string;
  conversation_id: string;
  contact_phone: string;
  contact_name: string;
  detected_interest: string;
  qualified_at: string;
}

export interface FAQ {
  id: string;
  company_id: string;
  question: string;
  answer: string;
  order_index: number;
}
