import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://epfzcjhlqhmdckndgnse.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZnpjamhscWhtZGNrbmRnbnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzQ3OTUsImV4cCI6MjA0Njc1MDc5NX0.uXeKigDlXG_kqqgY9BheHlfuVv_dspDstaZiNLD8708';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
