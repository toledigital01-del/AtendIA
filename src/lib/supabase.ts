import { createClient } from '@supabase/supabase-js';

// These would normally be in .env
// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for mock data access since we can't provision real DB here
// In a real app, this would use the supabase client
import * as mock from './mockData';

export const db = {
  getCompany: async () => ({ data: mock.MOCK_COMPANY, error: null }),
  getConversations: async () => ({ data: mock.MOCK_CONVERSATIONS, error: null }),
  getLeads: async () => ({ data: mock.MOCK_LEADS, error: null }),
  getFaqs: async () => ({ data: mock.MOCK_FAQS, error: null }),
  getMessages: async (convId: string) => ({ data: mock.MOCK_MESSAGES.filter(m => m.conversation_id === convId), error: null }),
};
