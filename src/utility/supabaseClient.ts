import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://hpzfnbddqxnzhjddbovk.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwemZuYmRkcXhuemhqZGRib3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3NTM1NjAsImV4cCI6MjAwMzMyOTU2MH0.Dqo7bttQTTbV60BaEBs1EJJATCE8AcXUuUUeqZWL7nI";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
