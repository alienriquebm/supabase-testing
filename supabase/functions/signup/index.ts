
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { signUp } from "@shared/auth.ts";

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

  const { email, password } = body;
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Both email and password are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { data, error } = await signUp(email, password);
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ user: data.user }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
});
