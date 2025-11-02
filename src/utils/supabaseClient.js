import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqflseisyystddvorsue.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

