
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@shared/supabaseClient.ts";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Malformed JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { email, redirectTo } = body;
  if (!email) {
    return new Response(
      JSON.stringify({ error: "Email is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: redirectTo
      ? { emailRedirectTo: redirectTo }
      : undefined,
  });

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Confirmation email resent" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
