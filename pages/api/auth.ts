import { supabase } from "../../client";

// auth state 바뀔 때
export default function handler(req: any, res: any) {
  supabase.auth.api.setAuthCookie(req, res);
}
