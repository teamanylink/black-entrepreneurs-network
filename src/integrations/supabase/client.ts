// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dtbvhcutoujagvqwfwot.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YnZoY3V0b3VqYWd2cXdmd290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4Mzk2NzQsImV4cCI6MjA1MDQxNTY3NH0.wEtVZw9L_LJU3EXudHcBYjRWfUodCQaBNc335L_sWCg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);