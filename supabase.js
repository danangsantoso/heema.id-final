import { createClient } from '@supabase/supabase-js'

// Heema.id Supabase Project
const supabaseUrl = 'https://yviftilvvqdaderarntk.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
