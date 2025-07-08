// supabase/functions/login/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { signInWithPassword } from "@shared/auth.ts";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    console.error("JSON parse error:", err);
    return new Response(
      JSON.stringify({ error: "Malformed JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { email, password } = body;
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Both email and password are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { data, error } = await signInWithPassword(email, password);
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ session: data.session }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("signInWithPassword error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected auth error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
