import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ohgsrskckjsayfvqrkrg.supabase.co'
const supabaseKey = 'sb_publishable_v4SSQ_fSRPVzqIKGFbmlrQ_ORjuCJJW'

export const supabase = createClient(supabaseUrl, supabaseKey)