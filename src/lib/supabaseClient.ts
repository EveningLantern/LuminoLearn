
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dsworgxbhocpfmdgqncj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd29yZ3hiaG9jcGZtZGdxbmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzQ1MzQsImV4cCI6MjA1MzY1MDUzNH0.NCEFXJ9p8Ku4zJDmQAksVYSfKEoZabOea0yHKLZ-I18"

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
