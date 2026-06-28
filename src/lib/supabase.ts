import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Configure PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY para usar login e comentários.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
